const { storage, bucket } = require('../config/storage');
 // should be your bucket name
const sharp = require('sharp')
const { format } = require('url'); 


function uploadImages(req, res, next) {

  const newImagesObjects = [];
  const newMoImagesObjects = [];

  const fileIndexes = req.body.fileIndexes;
  const moFileIndexes = req.body.moFileIndexes;

  const files = req.files.images;
  console.log(files);
  const moFiles = req.files.moImages;
  
  if (!files && !moFiles) {
    // Aucune image n'a été téléchargée, appeler next() et sortir de la fonction
    return next();
  }


  // Créez un tableau de promesses pour gérer chaque fichier individuellement
  const uploadPromises = files?.map( (file, index) => {
    
    return new Promise(async(resolve, reject) => {
      try {
        const { originalname, buffer } = file;
        // Redimensionnez et convertissez l'image avec Sharp
        const resizedImageBuffer = await sharp(buffer)
          .resize({
            width: 1920,
            fit: 'cover',
            kernel: 'lanczos3',
          })
          .toFormat('webp')
          .toBuffer();
  
        // Créez un blob dans le stockage Google Cloud Storage
        const blob = bucket.file('project_images/' + originalname);
        const blobStream = blob.createWriteStream({
          resumable: false
        });
        blobStream.on('error', (err) => {
          console.error(`Error creating blob for image ${originalname}:`, err);
          reject(`Unable to create blob for image: ${originalname}`);
        });
        
  
        blobStream.on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          console.log('ça marche');
  
          // Pousser les données dans le tableau newImagesObject
          if (fileIndexes) {
            newImagesObjects.push({
              imageUrl: publicUrl,
              index: JSON.parse(fileIndexes[index]),
              inRandomSelection: false,
            });
            console.log()
          } else {
            newImagesObjects.push({
              imageUrl: publicUrl,
              inRandomSelection: false,
            });
          }

          // Continuer avec la prochaine promesse
          resolve(publicUrl);
        }).on('error', () => {
          reject(`Unable to upload image: ${originalname}`);
        }).end(resizedImageBuffer);
      } catch (error) {
        // Gérez les erreurs ici...
        console.error(`Error processing image ${file.originalname}:`, error);
        reject(`Unable to process image: ${file.originalname}`);
      }
    })
  });

   // Créez un tableau de promesses pour gérer chaque fichier individuellement
   const moUploadPromises = moFiles?.map( (file, index) => {
    
    return new Promise(async(resolve, reject) => {
      try {
        const { originalname, buffer } = file;
        
        // Redimensionnez et convertissez l'image avec Sharp
        const resizedImageBuffer = await sharp(buffer)
          .resize({
            width: 1920,
            fit: 'cover',
            kernel: 'lanczos3',
          })
          .toFormat('webp')
          .toBuffer();
  
        // Créez un blob dans le stockage Google Cloud Storage
        const blob = bucket.file('makingOf_images/' + originalname);
        const blobStream = blob.createWriteStream({
          resumable: false
        });
        blobStream.on('error', (err) => {
          console.error(`Error creating blob for image ${originalname}:`, err);
          reject(`Unable to create blob for image: ${originalname}`);
        });
        
  
        blobStream.on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          console.log('ça marche');
  
          // Pousser les données dans le tableau newImagesObject
          if (moFileIndexes) {
            newMoImagesObjects.push({
              imageUrl: publicUrl,
              index: JSON.parse(moFileIndexes[index])
            });
          } else {
            newMoImagesObjects.push({
              imageUrl: publicUrl,
            });
          }
          // Continuer avec la prochaine promesse
          resolve(publicUrl);
        }).on('error', () => {
          reject(`Unable to upload image: ${originalname}`);
        }).end(resizedImageBuffer);
      } catch (error) {
        // Gérez les erreurs ici...
        console.error(`Error processing image ${file.originalname}:`, error);
        reject(`Unable to process image: ${file.originalname}`);
      }
    })
  });

  // Utilisez Promise.all pour attendre que toutes les promesses d'upload se terminent
  Promise.all([
      ...(uploadPromises || []),
      ...(moUploadPromises || [])
    ])
    .then(() => {
      // Stockez newImagesObjects dans l'objet req pour qu'il soit disponible dans le contrôleur
      req.newImagesObjects = newImagesObjects;
      req.newMoImagesObjects = newMoImagesObjects;

      next(); // Passez au middleware suivant ou à la route
    })
    .catch((error) => {
      // Gérez les erreurs ici...
      res.status(500).json({ error: 'Erreur lors du traitement des images.' });
    });
};


  function uploadImage(req, res, next) {
    try {

      if (!req.file) {
        next(); // Pas de fichier, passez directement au contrôleur suivant
      } else if (req.file) {
  
        const file = req.file;
        const { originalname, buffer } = file;
      
        // Redimensionnez et convertissez l'image avec Sharp
        sharp(buffer)
          .resize({
            width: 1500,
            fit: 'cover',
            kernel: 'lanczos3',
          })
          .toFormat('webp')
          .toBuffer()
          .then((resizedImageBuffer) => {
            // Créez un blob dans le stockage Google Cloud Storage
            const blob = bucket.file('project_images/' + originalname);
            const blobStream = blob.createWriteStream({
              resumable: false
            });
    
            blobStream.on('finish', () => {
              const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
              );
    
              // Stockez l'URL de l'image dans req
              req.mainImageUrl = publicUrl;
              next(); // Passez au middleware suivant ou à la route
            }).on('error', (error) => {
              console.error(error);
              res.status(500).json({ error: `Unable to upload image: ${originalname}` });
            }).end(resizedImageBuffer);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: `Unable to process image: ${file.originalname}` });
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors du traitement de l\'image.' });
    }
  }

  module.exports = {
    uploadImages,
    uploadImage,
  };