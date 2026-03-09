const Information = require('../models/information')

// Helpers
function safeJsonParse(value, fallback) {
  if (value == null) return fallback
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch (e) {
    return fallback
  }
}

function withBr(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/(\r\n|\n|\r)/g, '<br>')
}

console.log('Mongoose collection:', Information.collection.name)

/*------------------------
----- GET INFORMATIONS ---
-------------------------*/
exports.getInformations = async (req, res) => {
  try {
    // Singleton : on récupère le premier doc
    let info = await Information.findOne()

    // Option : si inexistant, on le crée pour éviter d’avoir à gérer "null" côté front
    if (!info) {
      info = await Information.create({})
    }

    res.status(200).json(info)
  } catch (error) {
    res.status(500).json({ error })
  }
}

/*--------------------------
----- UPDATE INFORMATIONS ---
---------------------------*/
exports.updateInformations = async (req, res, next) => {
  try {
    // Singleton
    let info = await Information.findOne()
    if (!info) {
      info = await Information.create({})
    }

    // Uploads (venant du middleware)
    const uploads = req.informationsUploads || { collabUploads: [] }
    const { firstPictureUrl: upFirst, secondPictureUrl: upSecond, thirdPictureUrl: upThird } = uploads
    const collabUploads = Array.isArray(uploads.collabUploads) ? uploads.collabUploads : []

    // Body
    const bodyFirst = req.body.firstPictureUrl || ''
    const bodySecond = req.body.secondPictureUrl || ''
    const bodyThird = req.body.thirdPictureUrl || ''

    const bioParagraph = withBr(req.body.bioParagraph || '')

    const manifesto = safeJsonParse(req.body.manifesto, [])
      .filter(Boolean)
      .map((m) => ({ sentence: (m?.sentence ?? '').toString() }))

    const collaborations = safeJsonParse(req.body.collaborations, [])
      .filter(Boolean)
      .map((c) => ({
        collabName: (c?.collabName ?? '').toString(),
        collabUrl: (c?.collabUrl ?? '').toString(),
        collabImgUrl: (c?.collabImgUrl ?? '').toString(), // sera éventuellement remplacé par upload
      }))

    // Appliquer les uploads collabs par index
    for (const item of collabUploads) {
      const index = Number(item?.index)
      const url = item?.url

      if (Number.isInteger(index) && index >= 0 && index < collaborations.length && typeof url === 'string') {
        collaborations[index].collabImgUrl = url
      }
    }

    // Déterminer les nouvelles URLs principales
    const nextFirst = upFirst || bodyFirst || info.firstPictureUrl || ''
    const nextSecond = upSecond || bodySecond || info.secondPictureUrl || ''
    const nextThird = upThird || bodyThird || info.thirdPictureUrl || ''

    // Préparer la suppression d’anciennes images (si ton deleteImages lit req.imagesToDelete)
    const imagesToDelete = []

    // 3 images principales remplacées
    if (upFirst && info.firstPictureUrl && info.firstPictureUrl !== upFirst) imagesToDelete.push(info.firstPictureUrl)
    if (upSecond && info.secondPictureUrl && info.secondPictureUrl !== upSecond) imagesToDelete.push(info.secondPictureUrl)
    if (upThird && info.thirdPictureUrl && info.thirdPictureUrl !== upThird) imagesToDelete.push(info.thirdPictureUrl)

    // Logos collabs remplacés : si même index existe dans l’ancien doc
    if (Array.isArray(info.collaborations) && info.collaborations.length > 0) {
      for (const item of collabUploads) {
        const index = Number(item?.index)
        const url = item?.url
        const oldUrl = info.collaborations?.[index]?.collabImgUrl

        if (Number.isInteger(index) && typeof url === 'string' && oldUrl && oldUrl !== url) {
          imagesToDelete.push(oldUrl)
        }
      }
    }

    // Logos collabs supprimés (si une collab disparaît)
    // On supprime les anciens collabImgUrl qui ne sont plus présents dans la nouvelle liste
    const nextCollabUrls = new Set((collaborations || []).map((c) => c.collabImgUrl).filter(Boolean))
    const oldCollabUrls = (info.collaborations || []).map((c) => c?.collabImgUrl).filter(Boolean)

    for (const oldUrl of oldCollabUrls) {
      if (!nextCollabUrls.has(oldUrl)) imagesToDelete.push(oldUrl)
    }

    // Dé-dupe
    req.imagesToDelete = Array.from(new Set(imagesToDelete))

    // Update doc
    info.firstPictureUrl = nextFirst
    info.secondPictureUrl = nextSecond
    info.thirdPictureUrl = nextThird
    info.bioParagraph = bioParagraph
    info.manifesto = manifesto
    info.collaborations = collaborations

    await info.save()

    res.status(200).json({ message: 'Informations modifiées', informations: info })
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erreur lors de la mise à jour des informations." })
  }
}