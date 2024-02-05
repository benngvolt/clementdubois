const Project = require('../models/project')

/*------------------------
----- GET ALL PROJECTS ---
-------------------------*/

exports.getAllProjects = (req, res) => {
    Project.find()
      .then (projects =>res.status(200).json(projects))
      .catch (error => res.status (400).json({error}))
  }

/*------------------------
----- GET ONE PROJECT ----
-------------------------*/
exports.getOneProject = (req, res) => {
  Project.findOne({_id: req.params.id})
    .then (project =>res.status(200).json(project))
    .catch (error => res.status (400).json({error}))
}

/*------------------------
----- CREATE PROJECT -----
------------------------*/

exports.createProject = async (req, res) => {

  const projectData = req.body;
  const images = req.newImagesObjects;
  const moImages = req.newMoImagesObjects;
  
  const artistsList = JSON.parse(req.body.artistsList);
  const productionList = JSON.parse(req.body.productionList);
  const pressList = JSON.parse(req.body.press);
  const linksList = JSON.parse(req.body.links);
  const diffusionList = JSON.parse(req.body.diffusionList);

  
  const aboutShowWithBr = req.body.aboutShow.replace(/(\r\n|\n|\r)/g, "<br>");
  const aboutScenoWithBr = req.body.aboutSceno.replace(/(\r\n|\n|\r)/g, "<br>");

  // const projectDescriptionWithBr = projectData.description.replace(/(\r\n|\n|\r)/g, "<br>");

  if (!projectData.title || !projectData.projectType) {
    return res.status(400).json({ error: 'Le champ "title" ou "state" est manquant dans la demande.' });
  }

  try {
    // if (serieImages.length === req.newImagesObjects.length) {
      // Si toutes les images ont été traitées, créez une nouvelle instance du modèle Serie
      const project = new Project({
        ... projectData,
        // description: projectDescriptionWithBr,
        artistsList: artistsList,
        productionList: productionList,
        press: pressList,
        links: linksList,
        diffusionList: diffusionList,
        projectImages: images,
        makingOfImages: moImages,
        aboutShow: aboutShowWithBr,
        aboutSceno: aboutScenoWithBr
      });

      await project.save();
      console.log(project);
      res.status(201).json({ message: 'Projet enregistrée !' });
    // }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};


/*----------------------------
----- DELETE ONE PROJECT -----
----------------------------*/

exports.deleteOneProject = async (req, res) => {
    try {
      const deletedProject = await Project.findOneAndDelete({ _id: req.params.id });
      if (!deletedProject) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Appeler la fonction de suppression d'images après avoir supprimé la série
      await deleteImageFiles(req);
      await deleteMoImageFiles(req);
      
      res.status(200).json({ message: 'Projet supprimé !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
    }
  }
    
async function deleteImageFiles(req) {
    // Obtenez la liste des URLs des images depuis Google Cloud Storage
    async function getCloudImageUrls() {
      const [files] = await bucket.getFiles({ prefix: 'projects_images/' });
      return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
    }
      
    // Obtenez la liste des URLs des images depuis MongoDB
    async function getDbImageUrls() {
  
      // Récupérez toutes les séries depuis MongoDB
      const projects = await Project.find();
      const imageUrls = projects.flatMap((project) => project.projectImages.map((image) => image.imageUrl));
      return imageUrls;
    }
      
        try {
          const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
          const dbImageUrls = await getDbImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
          const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));
    
          // Suppression des images non référencées dans le cloud
          for (const imageUrl of imagesToDelete) {
            // Divisez l'URL en parties en utilisant "/" comme séparateur
            const parts = imageUrl.split('/');
            // Récupérez la dernière partie qui contient le nom du fichier
            const fileToDeleteName = parts.pop();
            if (fileToDeleteName) {
              await bucket.file('projects_images/' + fileToDeleteName).delete();
            }
          }
  
        } catch (error) {
          console.error(error.message);
        }
    }
  
    async function deleteMoImageFiles(req) {
      // Obtenez la liste des URLs des images depuis Google Cloud Storage
      async function getCloudImageUrls() {
        const [files] = await bucket.getFiles({ prefix: 'makingOf_images/' });
        return files.map((file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
      }
        
      // Obtenez la liste des URLs des images depuis MongoDB
      async function getDbImageUrls() {
    
        // Récupérez toutes les séries depuis MongoDB
        const projects = await Project.find();
        const imageUrls = projects.flatMap((project) => project.makingOfImages.map((image) => image.imageUrl));
        return imageUrls;
      }
        
          try {
            const cloudImageUrls = await getCloudImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
            const dbImageUrls = await getDbImageUrls(); // Utilisez "await" pour attendre la résolution de la promesse
            const imagesToDelete = cloudImageUrls.filter((url) => !dbImageUrls.includes(url));
      
            // Suppression des images non référencées dans le cloud
            for (const imageUrl of imagesToDelete) {
              // Divisez l'URL en parties en utilisant "/" comme séparateur
              const parts = imageUrl.split('/');
              // Récupérez la dernière partie qui contient le nom du fichier
              const fileToDeleteName = parts.pop();
              if (fileToDeleteName) {
                await bucket.file('makingOf_images/' + fileToDeleteName).delete();
              }
            }
    
          } catch (error) {
            console.error(error.message);
          }
      }

/*--------------------------
----- UPDATE ONE SERIE -----
--------------------------*/

exports.updateOneProject = async (req, res) => {
  try {
    const artistsList = JSON.parse(req.body.artistsList);
    const productionList = JSON.parse(req.body.productionList);
    const pressList = JSON.parse(req.body.press);
    const linksList = JSON.parse(req.body.links);
    const diffusionList = JSON.parse(req.body.diffusionList);
    const projectData = req.body;
    const newImagesObjects = req.newImagesObjects;
    const newMoImagesObjects = req.newMoImagesObjects;

    const aboutShowWithBr = req.body.aboutShow.replace(/(\r\n|\n|\r)/g, "<br>");
    const aboutScenoWithBr = req.body.aboutSceno.replace(/(\r\n|\n|\r)/g, "<br>");

    // RÉCUPÉRATION DU PROJET CONCERNÉ VIA SON ID STOCKÉ EN PARAMÈTRES D'URL
    const project = await Project.findOne({ _id: req.params.id });

    // SI LA SÉRIE N'EXISTE PAS, ON RETOURNE UNE ERREUR 404
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    // RÉCUPÉRATION DES IMAGES EXISTANTES DEPUIS LE FRONTEND, PARSE DES DONNÉES
    const existingImages = req.body.existingImages || [];
    const existingMoImages = req.body.existingMoImages || [];
    const existingImagesObjects = existingImages.map((imageStr) => JSON.parse(imageStr));
    const existingMoImagesObjects = existingMoImages.map((imageStr) => JSON.parse(imageStr));

    // TRI DES IMAGES PAR ORDRE D'INDEX ET MISE À JOUR DE MAINIMAGEINDEX ET CONSTRUCTION DU TABLEAU IMAGES AVEC LES NOUVELLES IMAGES ET LES EXISTANTES
    async function processAndSortImages(existingImagesObjects, newImagesObjects) {
      const allImages = existingImagesObjects.map((image, index) => ({
        imageUrl: image.imageUrl,
        index,
      })).concat(newImagesObjects);
      allImages.sort((a, b) => a.index - b.index);
      const updatedImages = allImages.filter((image) => image != null && image !== "empty");
      return updatedImages;
    }

    async function processAndSortMoImages(existingMoImagesObjects, newMoImagesObjects) {
      const allImages = existingMoImagesObjects.map((image, index) => ({
        imageUrl: image.imageUrl,
        index,
      })).concat(newMoImagesObjects);
      allImages.sort((a, b) => a.index - b.index);
      const updatedMoImages = allImages.filter((image) => image != null && image !== "empty");
      return updatedMoImages;
    }

    // MISE À JOUR DE LA SÉRIE DANS LA BASE DE DONNÉES
    async function updateProject(updatedImages, updatedMoImages) {
      const updatedMainImageIndex = req.body.mainImageIndex || 0;
      const updatedMainMoImageIndex = req.body.mainMoImageIndex || 0;
      const projectObject = {
        ...projectData,
        aboutShow: aboutShowWithBr,
        aboutSceno: aboutScenoWithBr,
        artistsList: artistsList,
        productionList: productionList,
        press: pressList,
        links: linksList,
        diffusionList: diffusionList,
        mainImageIndex: updatedMainImageIndex,
        mainMoImageIndex: updatedMainMoImageIndex,
        projectImages: updatedImages,
        makingOfImages: updatedMoImages
      };

      await Project.updateOne({ _id: req.params.id }, projectObject);
    }

    // Appel de la fonction de tri des images et de mise à jour
    const updatedImages = await processAndSortImages(existingImagesObjects, newImagesObjects);
    const updatedMoImages = await processAndSortMoImages(existingMoImagesObjects, newMoImagesObjects);

    // Appel de la fonction de mise à jour du projet
    await updateProject(updatedImages, updatedMoImages);

    console.log('Project updated successfully');
    res.status(200).json({ message: 'Projet modifié' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la série.' });
  }
};
