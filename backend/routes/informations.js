const express = require('express')
const router = express.Router()

const informationsCtrl = require('../controllers/informations')
const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth')

const { uploadInformationsImages } = require('../middlewares/uploadInformationsImages')
const { deleteImages } = require('../middlewares/deleteImages')

const informationsUploadFields = multer.fields([
  { name: 'firstPicture', maxCount: 1 },
  { name: 'secondPicture', maxCount: 1 },
  { name: 'thirdPicture', maxCount: 1 },
  { name: 'collabImages', maxCount: 50 },
])

router.get('/', informationsCtrl.getInformations)

router.put(
  '/',
  auth,
  informationsUploadFields,
  uploadInformationsImages,
  informationsCtrl.updateInformations,
  deleteImages
)

module.exports = router