const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024, // 50 Mo par fichier
    files: 12,
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
      'video/mp4',
      'video/quicktime',
      'video/webm',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error(`Type de fichier non autorisé : ${file.mimetype}`));
    }

    cb(null, true);
  },
});

module.exports = upload;