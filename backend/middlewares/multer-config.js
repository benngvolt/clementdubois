
// const Multer = require('multer');

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   // limits: {
//   //   fileSize: 5 * 1024 * 1024, 
//   // },
// });

// module.exports = multer;

const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8 Mo par fichier
    files: 12,                 // max total de fichiers par requête
    fields: 50,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/heic',
      'image/heif',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error(`Type de fichier non autorisé : ${file.mimetype}`));
    }

    cb(null, true);
  },
});

module.exports = upload;