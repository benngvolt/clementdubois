const { bucket } = require('../config/storage');
const sharp = require('sharp');
const pLimit = require('p-limit');

const limit = pLimit(3);

function uploadImages(req, res, next) {
  const newImagesObjects = [];
  const newMoImagesObjects = [];

  const fileIndexes = Array.isArray(req.body.fileIndexes)
    ? req.body.fileIndexes
    : req.body.fileIndexes
      ? [req.body.fileIndexes]
      : [];

  const moFileIndexes = Array.isArray(req.body.moFileIndexes)
    ? req.body.moFileIndexes
    : req.body.moFileIndexes
      ? [req.body.moFileIndexes]
      : [];

  const files = req.files?.images || [];
  const moFiles = req.files?.moImages || [];

  if (files.length === 0 && moFiles.length === 0) {
    return next();
  }

  function buildSafeFileName(extension) {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
  }

  function getVideoExtension(mimetype) {
    switch (mimetype) {
      case 'video/mp4':
        return 'mp4';
      case 'video/webm':
        return 'webm';
      case 'video/quicktime':
        return 'mov';
      default:
        return 'bin';
    }
  }

  async function uploadToBucket({ buffer, folderName, safeFileName, contentType }) {
    const blob = bucket.file(`${folderName}/${safeFileName}`);

    await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: true,
        metadata: {
          contentType,
        },
      });

      blobStream.on('error', reject);
      blobStream.on('finish', resolve);
      blobStream.end(buffer);
    });

    return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  }

  async function processAndUploadFile(file, index, indexes, targetArray, folderName) {
    const { buffer, mimetype } = file;
    // console.log('Uploading file:', {
    //   originalname: file.originalname,
    //   mimetype: file.mimetype,
    //   size: file.size,
    // });
    const isImage = mimetype.startsWith('image/');
    const isVideo = mimetype.startsWith('video/');

    let publicUrl = '';
    let fileType = mimetype;

    if (isImage) {
      const safeFileName = buildSafeFileName('webp');

      const resizedImageBuffer = await sharp(buffer)
        .resize({
          width: 1920,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toBuffer();

      publicUrl = await uploadToBucket({
        buffer: resizedImageBuffer,
        folderName,
        safeFileName,
        contentType: 'image/webp',
      });

      fileType = 'image/webp';
    } else if (isVideo) {
      const extension = getVideoExtension(mimetype);
      const safeFileName = buildSafeFileName(extension);

      publicUrl = await uploadToBucket({
        buffer,
        folderName,
        safeFileName,
        contentType: mimetype,
      });
    } else {
      throw new Error(`Type de fichier non géré : ${mimetype}`);
    }

    const imageObject = {
      imageUrl: publicUrl,
      fileType,
      inRandomSelection: false,
    };

    if (indexes && indexes[index] !== undefined) {
      imageObject.index = Number(indexes[index]);
    }

    targetArray.push(imageObject);

    return publicUrl;
  }

  const uploadPromises = files.map((file, index) =>
    limit(() =>
      processAndUploadFile(file, index, fileIndexes, newImagesObjects, 'project_images')
    )
  );

  const moUploadPromises = moFiles.map((file, index) =>
    limit(() =>
      processAndUploadFile(file, index, moFileIndexes, newMoImagesObjects, 'makingOf_images')
    )
  );

  Promise.all([...uploadPromises, ...moUploadPromises])
    .then(() => {
      req.newImagesObjects = newImagesObjects;
      req.newMoImagesObjects = newMoImagesObjects;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors du traitement des médias.' });
    });
}

function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return next();
    }

    const file = req.file;
    const { buffer, mimetype } = file;

    if (!mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Ce champ accepte uniquement une image.' });
    }

    sharp(buffer)
      .resize({
        width: 1500,
        fit: 'cover',
        kernel: 'lanczos3',
      })
      .toFormat('webp')
      .toBuffer()
      .then((resizedImageBuffer) => {
        const safeFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const blob = bucket.file(`project_images/${safeFileName}`);

        const blobStream = blob.createWriteStream({
          resumable: false,
          metadata: {
            contentType: 'image/webp',
          },
        });

        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          req.mainImageUrl = publicUrl;
          next();
        });

        blobStream.on('error', (error) => {
          console.error(error);
          res.status(500).json({ error: `Unable to upload image: ${file.originalname}` });
        });

        blobStream.end(resizedImageBuffer);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: `Unable to process image: ${file.originalname}` });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image." });
  }
}

module.exports = {
  uploadImages,
  uploadImage,
};