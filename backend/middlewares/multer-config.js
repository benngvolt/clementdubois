const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 Mo par fichier
    files: 12, // les fichiers sont gardés en mémoire : on limite le nombre par requête
    // chaque image déjà en ligne est renvoyée comme un champ (existingImages[i]) :
    // une limite basse empêchait d'enregistrer les projets avec beaucoup d'images
    fields: 500,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/heic',
      'image/heif',
      'video/mp4',
      'video/quicktime',
      'video/webm',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error(`Type de fichier non autorisé : ${file.mimetype}`);
      error.status = 415;
      error.expose = true;
      return cb(error);
    }

    cb(null, true);
  },
});

module.exports = upload;