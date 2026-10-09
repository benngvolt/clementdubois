const { bucket } = require('../config/storage')
const sharp = require('sharp')
const { format } = require('url')
const { randomUUID } = require('crypto')
const { deleteUploadedUrls } = require('./deleteImages')

function toPublicUrl(blob) {
  return format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
}

async function processToWebp(buffer, width = 1920) {
  return sharp(buffer)
    .resize({
      width,
      fit: 'cover',
      kernel: 'lanczos3',
    })
    .toFormat('webp')
    .toBuffer()
}

function uploadBufferToGCS({ buffer, destinationPath }) {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(destinationPath)
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000, immutable',
      },
    })

    blobStream.on('error', (err) => {
      console.error('GCS upload error:', err)
      reject(err)
    })

    blobStream.on('finish', () => {
      resolve(toPublicUrl(blob))
    })

    blobStream.end(buffer)
  })
}

async function uploadOneImage(file) {
  const webpBuffer = await processToWebp(file.buffer, 1920)
  const filename = `informations_images/${randomUUID()}.webp`
  return uploadBufferToGCS({ buffer: webpBuffer, destinationPath: filename })
}

async function uploadInformationsImages(req, res, next) {
  try {
    const files = req.files || {}

    const first = files.firstPicture?.[0]
    const second = files.secondPicture?.[0]
    const third = files.thirdPicture?.[0]
    const collabFiles = files.collabImages || []

    if (!first && !second && !third && collabFiles.length === 0) {
      req.informationsUploads = { collabUploads: [] }
      return next()
    }

    const rawIndexes = req.body.collabFileIndexes

    const collabIndexes =
      rawIndexes == null
        ? []
        : Array.isArray(rawIndexes)
        ? rawIndexes.map((v) => Number(v))
        : [Number(rawIndexes)]

    const uploads = {
      firstPictureUrl: undefined,
      secondPictureUrl: undefined,
      thirdPictureUrl: undefined,
      collabUploads: [],
    }

    const tasks = []

    // 3 images principales
    if (first) {
      tasks.push(
        uploadOneImage(first).then((url) => {
          uploads.firstPictureUrl = url
        })
      )
    }

    if (second) {
      tasks.push(
        uploadOneImage(second).then((url) => {
          uploads.secondPictureUrl = url
        })
      )
    }

    if (third) {
      tasks.push(
        uploadOneImage(third).then((url) => {
          uploads.thirdPictureUrl = url
        })
      )
    }

    // Logos collaborations
    collabFiles.forEach((file, i) => {
      tasks.push(
        uploadOneImage(file).then((url) => {
          const index = collabIndexes[i]
          uploads.collabUploads.push({
            index,
            url,
          })
        })
      )
    })

    // on attend la fin de tous les envois pour pouvoir nettoyer en cas d'échec partiel
    const results = await Promise.allSettled(tasks)
    const failure = results.find((result) => result.status === 'rejected')

    if (failure) {
      await deleteUploadedUrls([
        uploads.firstPictureUrl,
        uploads.secondPictureUrl,
        uploads.thirdPictureUrl,
        ...uploads.collabUploads.map((item) => item.url),
      ])
      throw failure.reason
    }

    req.informationsUploads = uploads

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Erreur lors du traitement des images informations.',
    })
  }
}

module.exports = { uploadInformationsImages }