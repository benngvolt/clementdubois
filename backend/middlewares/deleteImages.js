// const { storage, bucket } = require('../config/storage');
// const Project = require('../models/project')

// async function deleteImageFiles(req) {
//     // Obtenez la liste des URLs des images depuis Google Cloud Storage
    
//     async function getCloudImageUrls() {
//       const [files] = await bucket.getFiles({ prefix: 'project_images/' });
//       return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//     }
      
//     // Obtenez la liste des URLs des images depuis MongoDB
//     async function getDbImageUrls() {
  
//       // Récupérez toutes les séries depuis MongoDB
//       const projects = await Project.find();
//       const imageUrls = projects.flatMap((project) => project.projectImages.map((image) => decodeURIComponent(image.imageUrl.replace(/\+/g, ' '))));
//       return imageUrls;
//     }
        
//         try {
//           const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//           const dbImageUrls = await getDbImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//           const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));
    
//           // Suppression des images non référencées dans le cloud
//           for (const imageUrl of imagesToDelete) {
//             // Divisez l'URL en parties en utilisant "/" comme séparateur
//             const parts = imageUrl.split('/');
//             // Récupérez la dernière partie qui contient le nom du fichier
//             const fileToDeleteName = parts.pop();
//             if (fileToDeleteName) {
//               await bucket.file('project_images/' + fileToDeleteName).delete();
//             }
//           }
  
//         } catch (error) {
//           console.error(error.message);
//         }
//     }
  
// async function deleteMoImageFiles(req) {
//   // Obtenez la liste des URLs des images depuis Google Cloud Storage
//   async function getCloudImageUrls() {
//     const [files] = await bucket.getFiles({ prefix: 'makingOf_images/' });
//     return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
//   }
    
//   // Obtenez la liste des URLs des images depuis MongoDB
//   async function getDbImageUrls() {

//     // Récupérez toutes les séries depuis MongoDB
//     const projects = await Project.find();
//     const imageUrls = projects.flatMap((project) => project.makingOfImages.map((image) => decodeURIComponent(image.imageUrl.replace(/\+/g, ' '))));
//     return imageUrls;
//   }
    
//   try {
//     const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//     const dbImageUrls = await getDbImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
//     const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));

//     // Suppression des images non référencées dans le cloud
//     for (const imageUrl of imagesToDelete) {
//       // Divisez l'URL en parties en utilisant "/" comme séparateur
//       const parts = imageUrl.split('/');
//       // Récupérez la dernière partie qui contient le nom du fichier
//       const fileToDeleteName = parts.pop();
//       if (fileToDeleteName) {
//         await bucket.file('makingOf_images/' + fileToDeleteName).delete();
//       }
//     }

//   } catch (error) {
//     console.error(error.message);
//   }
// }

// function deleteImages(req) {
//     deleteImageFiles();
//     deleteMoImageFiles();
// }

// module.exports = {
//     deleteImages,
//   };

const { bucket } = require('../config/storage')

// Extrait "informations_images/xxx.webp" depuis une URL publique
function extractGcsPathFromUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null

  // URLs attendues : https://storage.googleapis.com/<bucket>/<path>
  const marker = `https://storage.googleapis.com/${bucket.name}/`
  const idx = imageUrl.indexOf(marker)
  if (idx === -1) return null

  const path = imageUrl.slice(marker.length)
  return decodeURIComponent(path.replace(/\+/g, ' '))
}

async function deleteByUrl(imageUrl) {
  const path = extractGcsPathFromUrl(imageUrl)
  if (!path) return

  try {
    await bucket.file(path).delete({ ignoreNotFound: true })
  } catch (e) {
    console.error('Error deleting file:', path, e.message)
  }
}

async function deleteImages(req, res, next) {
  try {
    const urls = Array.isArray(req.imagesToDelete) ? req.imagesToDelete : []

    if (urls.length === 0) {
      return next ? next() : undefined
    }

    await Promise.all(urls.map(deleteByUrl))

    return next ? next() : undefined
  } catch (error) {
    console.error(error)
    return next ? next() : undefined
  }
}

module.exports = { deleteImages }