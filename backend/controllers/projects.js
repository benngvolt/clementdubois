const Project = require('../models/project')
const { storage, bucket } = require('../config/storage');

/*------------------------
----- GET ALL PROJECTS ---
-------------------------*/

exports.getAllProjects = (req, res) => {
    Project.find()
      .then (projects =>res.status(200).json(projects))
      .catch (error => res.status (500).json({error}))
  }

/*------------------------
----- GET ONE PROJECT ----
-------------------------*/
exports.getOneProject = (req, res) => {
  Project.findOne({_id: req.params.id})
    .then (project =>res.status(200).json(project))
    .catch (error => res.status (500).json({error}))
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

  if (!projectData.title || !projectData.projectType) {
    return res.status(400).json({ error: 'Le champ "title" ou "state" est manquant dans la demande.' });
  }

  try {
      const project = new Project({
        ... projectData,
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
      res.status(201).json({ message: 'Projet enregistrée !' });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


/*----------------------------
----- DELETE ONE PROJECT -----
----------------------------*/

exports.deleteOneProject = async (req, res, next) => {
    try {
      const deletedProject = await Project.findOneAndDelete({ _id: req.params.id });
      if (!deletedProject) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      
      res.status(200).json({ message: 'Projet supprimé !' });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
    }
  }

/*--------------------------
----- UPDATE ONE SERIE -----
--------------------------*/

exports.updateOneProject = async (req, res, next) => {
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
        inRandomSelection: image.inRandomSelection,
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
    // await deleteImageFiles(req);
    // await deleteMoImageFiles(req);

    console.log('Project updated successfully');
    res.status(200).json({ message: 'Projet modifié' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la série.' });
  }
};
