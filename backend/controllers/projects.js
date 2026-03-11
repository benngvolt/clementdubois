// const mongoose = require('mongoose');
// const Project = require('../models/project');
// const { storage, bucket } = require('../config/storage');

// /*------------------------
// ----- HELPERS ------------
// -------------------------*/

// function slugify(value = '') {
//   return value
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-');
// }

// async function findProjectBySlugOrId(slugOrId) {
//   let project = await Project.findOne({ slug: slugOrId });

//   if (!project && mongoose.Types.ObjectId.isValid(slugOrId)) {
//     project = await Project.findById(slugOrId);
//   }

//   return project;
// }

// /*------------------------
// ----- GET ALL PROJECTS ---
// -------------------------*/

// exports.getAllProjects = (req, res) => {
//   Project.find()
//     .then((projects) => res.status(200).json(projects))
//     .catch((error) => res.status(500).json({ error }));
// };

// /*------------------------
// ----- GET ONE PROJECT ----
// -------------------------*/
// exports.getOneProject = async (req, res) => {
//   try {
//     const project = await findProjectBySlugOrId(req.params.slugOrId);

//     if (!project) {
//       return res.status(404).json({ message: 'Projet non trouvé' });
//     }

//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// /*------------------------
// ----- CREATE PROJECT -----
// ------------------------*/

// exports.createProject = async (req, res) => {
//   const projectData = req.body;
//   const images = req.newImagesObjects;
//   const moImages = req.newMoImagesObjects;

//   const artistsList = JSON.parse(req.body.artistsList);
//   const productionList = JSON.parse(req.body.productionList);
//   const pressList = JSON.parse(req.body.press);
//   const linksList = JSON.parse(req.body.links);
//   const diffusionList = JSON.parse(req.body.diffusionList);

//   const aboutShowWithBr = req.body.aboutShow.replace(/(\r\n|\n|\r)/g, "<br>");
//   const aboutScenoWithBr = req.body.aboutSceno.replace(/(\r\n|\n|\r)/g, "<br>");

//   const finalSlug = slugify(req.body.slug || req.body.title);

//   if (!projectData.title || !projectData.projectType) {
//     return res.status(400).json({ error: 'Le champ "title" ou "projectType" est manquant dans la demande.' });
//   }

//   try {
//     const existingProjectWithSlug = await Project.findOne({ slug: finalSlug });

//     if (existingProjectWithSlug) {
//       return res.status(400).json({ error: 'Un projet avec ce slug existe déjà.' });
//     }

//     const project = new Project({
//       ...projectData,
//       slug: finalSlug,
//       artistsList: artistsList,
//       productionList: productionList,
//       press: pressList,
//       links: linksList,
//       diffusionList: diffusionList,
//       projectImages: images,
//       makingOfImages: moImages,
//       aboutShow: aboutShowWithBr,
//       aboutSceno: aboutScenoWithBr
//     });

//     await project.save();
//     res.status(201).json({ message: 'Projet enregistré !' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// };

// /*----------------------------
// ----- DELETE ONE PROJECT -----
// ----------------------------*/

// exports.deleteOneProject = async (req, res, next) => {
//   try {
//     const project = await findProjectBySlugOrId(req.params.slugOrId);

//     if (!project) {
//       return res.status(404).json({ message: 'Projet non trouvé' });
//     }

//     req.projectToDelete = project;

//     await Project.deleteOne({ _id: project._id });

//     res.status(200).json({ message: 'Projet supprimé !' });
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
//   }
// };

// /*--------------------------
// ----- UPDATE ONE PROJECT ----
// --------------------------*/

// exports.updateOneProject = async (req, res, next) => {
//   try {
//     const artistsList = JSON.parse(req.body.artistsList);
//     const productionList = JSON.parse(req.body.productionList);
//     const pressList = JSON.parse(req.body.press);
//     const linksList = JSON.parse(req.body.links);
//     const diffusionList = JSON.parse(req.body.diffusionList);

//     const projectData = req.body;
//     const newImagesObjects = req.newImagesObjects;
//     const newMoImagesObjects = req.newMoImagesObjects;

//     const aboutShowWithBr = req.body.aboutShow.replace(/(\r\n|\n|\r)/g, "<br>");
//     const aboutScenoWithBr = req.body.aboutSceno.replace(/(\r\n|\n|\r)/g, "<br>");
//     const finalSlug = slugify(req.body.slug || req.body.title);

//     const project = await findProjectBySlugOrId(req.params.slugOrId);

//     if (!project) {
//       return res.status(404).json({ error: 'Projet non trouvé' });
//     }

//     const existingProjectWithSlug = await Project.findOne({ slug: finalSlug });

//     if (
//       existingProjectWithSlug &&
//       existingProjectWithSlug._id.toString() !== project._id.toString()
//     ) {
//       return res.status(400).json({ error: 'Un autre projet utilise déjà ce slug.' });
//     }

//     const existingImages = req.body.existingImages || [];
//     const existingMoImages = req.body.existingMoImages || [];

//     const existingImagesObjects = existingImages.map((imageStr) => JSON.parse(imageStr));
//     const existingMoImagesObjects = existingMoImages.map((imageStr) => JSON.parse(imageStr));

//     async function processAndSortImages(existingImagesObjects, newImagesObjects) {
//       const allImages = existingImagesObjects
//         .map((image, index) => ({
//           imageUrl: image.imageUrl,
//           inRandomSelection: image.inRandomSelection,
//           index,
//         }))
//         .concat(newImagesObjects);

//       allImages.sort((a, b) => a.index - b.index);

//       const updatedImages = allImages.filter((image) => image != null && image !== "empty");
//       return updatedImages;
//     }

//     async function processAndSortMoImages(existingMoImagesObjects, newMoImagesObjects) {
//       const allImages = existingMoImagesObjects
//         .map((image, index) => ({
//           imageUrl: image.imageUrl,
//           index,
//         }))
//         .concat(newMoImagesObjects);

//       allImages.sort((a, b) => a.index - b.index);

//       const updatedMoImages = allImages.filter((image) => image != null && image !== "empty");
//       return updatedMoImages;
//     }

//     async function updateProject(updatedImages, updatedMoImages) {
//       const updatedMainImageIndex = req.body.mainImageIndex || 0;
//       const updatedMainMoImageIndex = req.body.mainMoImageIndex || 0;

//       const projectObject = {
//         ...projectData,
//         slug: finalSlug,
//         aboutShow: aboutShowWithBr,
//         aboutSceno: aboutScenoWithBr,
//         artistsList: artistsList,
//         productionList: productionList,
//         press: pressList,
//         links: linksList,
//         diffusionList: diffusionList,
//         mainImageIndex: updatedMainImageIndex,
//         mainMoImageIndex: updatedMainMoImageIndex,
//         projectImages: updatedImages,
//         makingOfImages: updatedMoImages
//       };

//       await Project.updateOne({ _id: project._id }, projectObject);
//     }

//     const updatedImages = await processAndSortImages(existingImagesObjects, newImagesObjects);
//     const updatedMoImages = await processAndSortMoImages(existingMoImagesObjects, newMoImagesObjects);

//     await updateProject(updatedImages, updatedMoImages);

//     console.log('Project updated successfully');
//     res.status(200).json({ message: 'Projet modifié' });
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Erreur lors de la mise à jour du projet.' });
//   }
// };

const mongoose = require('mongoose');
const Project = require('../models/project');

/*------------------------
----- HELPERS ------------
-------------------------*/

function slugify(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function findProjectBySlugOrId(slugOrId) {
  let project = await Project.findOne({ slug: slugOrId });

  if (!project && mongoose.Types.ObjectId.isValid(slugOrId)) {
    project = await Project.findById(slugOrId);
  }

  return project;
}

function parseJSONSafely(value, fallback = []) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getMediaUrl(item) {
  return item?.imageUrl || null;
}

/**
 * Gère plusieurs formes possibles de req.body :
 * - existingImages[0]: "{...}"
 * - existingImages: { 0: "{...}", 1: "{...}" }
 * - existingImages: [ "{...}", "{...}" ]
 */
function extractExistingIndexedObjects(body, prefix) {
  const extractedMap = new Map();

  if (!body || typeof body !== 'object') {
    return [];
  }

  // Cas 1 : clés plates "existingImages[0]"
  Object.keys(body).forEach((key) => {
    const match = key.match(new RegExp(`^${prefix}\\[(\\d+)\\]$`));
    if (!match) return;

    const index = Number(match[1]);

    try {
      const rawValue = body[key];
      const parsedObject =
        typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;

      if (parsedObject && typeof parsedObject === 'object') {
        extractedMap.set(index, {
          ...parsedObject,
          index,
        });
      }
    } catch (error) {
      console.error(`Impossible de parser ${key}`, error);
    }
  });

  // Cas 2 : body[prefix] = { 0: "...", 1: "..." }
  const nestedValue = body[prefix];

  if (nestedValue && typeof nestedValue === 'object' && !Array.isArray(nestedValue)) {
    Object.entries(nestedValue).forEach(([key, value]) => {
      const index = Number(key);
      if (Number.isNaN(index)) return;

      try {
        const parsedObject =
          typeof value === 'string' ? JSON.parse(value) : value;

        if (parsedObject && typeof parsedObject === 'object') {
          extractedMap.set(index, {
            ...parsedObject,
            index,
          });
        }
      } catch (error) {
        console.error(`Impossible de parser ${prefix}[${key}]`, error);
      }
    });
  }

  // Cas 3 : body[prefix] = [ "...", "..." ]
  if (Array.isArray(nestedValue)) {
    nestedValue.forEach((value, index) => {
      try {
        const parsedObject =
          typeof value === 'string' ? JSON.parse(value) : value;

        if (parsedObject && typeof parsedObject === 'object') {
          extractedMap.set(index, {
            ...parsedObject,
            index,
          });
        }
      } catch (error) {
        console.error(`Impossible de parser ${prefix}[${index}]`, error);
      }
    });
  }

  return Array.from(extractedMap.values()).sort((a, b) => a.index - b.index);
}

function normalizeNewUploadedObjects(newObjects = []) {
  return (newObjects || [])
    .filter(Boolean)
    .map((item) => ({
      ...item,
      index: Number(item.index ?? 0),
    }));
}

function mergeAndSortImages(existingImagesObjects = [], newImagesObjects = []) {
  const allImages = [
    ...existingImagesObjects,
    ...normalizeNewUploadedObjects(newImagesObjects),
  ];

  return allImages
    .filter((image) => image != null && image !== 'empty')
    .sort((a, b) => Number(a.index) - Number(b.index))
    .map(({ index, ...image }) => image);
}

function normalizeMainIndex(index, imagesArray = []) {
  const normalizedIndex = Number(index || 0);

  if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
    return 0;
  }

  if (Number.isNaN(normalizedIndex) || normalizedIndex < 0) {
    return 0;
  }

  if (normalizedIndex > imagesArray.length - 1) {
    return 0;
  }

  return normalizedIndex;
}

function getUrlsToDelete(previousItems = [], nextItems = []) {
  const previousUrls = (previousItems || [])
    .map(getMediaUrl)
    .filter(Boolean);

  const nextUrls = new Set(
    (nextItems || [])
      .map(getMediaUrl)
      .filter(Boolean)
  );

  return previousUrls.filter((url) => !nextUrls.has(url));
}

/*------------------------
----- GET ALL PROJECTS ---
-------------------------*/

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

/*------------------------
----- GET ONE PROJECT ----
-------------------------*/

exports.getOneProject = async (req, res) => {
  try {
    const project = await findProjectBySlugOrId(req.params.slugOrId);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

/*------------------------
----- CREATE PROJECT -----
-------------------------*/

exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;

    const images = req.newImagesObjects || [];
    const moImages = req.newMoImagesObjects || [];

    const artistsList = parseJSONSafely(req.body.artistsList, []);
    const productionList = parseJSONSafely(req.body.productionList, []);
    const pressList = parseJSONSafely(req.body.press, []);
    const linksList = parseJSONSafely(req.body.links, []);
    const diffusionList = parseJSONSafely(req.body.diffusionList, []);

    const aboutShowWithBr = (req.body.aboutShow || '').replace(/(\r\n|\n|\r)/g, '<br>');
    const aboutScenoWithBr = (req.body.aboutSceno || '').replace(/(\r\n|\n|\r)/g, '<br>');
    const summaryWithBr = (req.body.summary || '').replace(/(\r\n|\n|\r)/g, '<br>');

    const finalSlug = slugify(req.body.slug || req.body.title);

    if (!projectData.title || !projectData.projectType) {
      return res.status(400).json({
        error: 'Le champ "title" ou "projectType" est manquant dans la demande.',
      });
    }

    const existingProjectWithSlug = await Project.findOne({ slug: finalSlug });

    if (existingProjectWithSlug) {
      return res.status(400).json({ error: 'Un projet avec ce slug existe déjà.' });
    }

    const sortedImages = mergeAndSortImages([], images);
    const sortedMoImages = mergeAndSortImages([], moImages);

    const mainImageIndex = normalizeMainIndex(req.body.mainImageIndex, sortedImages);
    const mainMoImageIndex = normalizeMainIndex(req.body.mainMoImageIndex, sortedMoImages);

    const project = new Project({
      ...projectData,
      slug: finalSlug,
      artistsList,
      productionList,
      press: pressList,
      links: linksList,
      diffusionList,
      projectImages: sortedImages,
      makingOfImages: sortedMoImages,
      mainImageIndex,
      mainMoImageIndex,
      aboutShow: aboutShowWithBr,
      aboutSceno: aboutScenoWithBr,
      summary: summaryWithBr,
    });

    await project.save();

    res.status(201).json({ message: 'Projet enregistré !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

/*----------------------------
----- DELETE ONE PROJECT -----
-----------------------------*/

exports.deleteOneProject = async (req, res, next) => {
  try {
    const project = await findProjectBySlugOrId(req.params.slugOrId);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    req.projectToDelete = project;

    const projectImagesUrls = (project.projectImages || [])
      .map(getMediaUrl)
      .filter(Boolean);

    const makingOfImagesUrls = (project.makingOfImages || [])
      .map(getMediaUrl)
      .filter(Boolean);

    req.imagesToDelete = [...projectImagesUrls, ...makingOfImagesUrls];

    await Project.deleteOne({ _id: project._id });

    res.status(200).json({ message: 'Projet supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
  }
};

/*--------------------------
----- UPDATE ONE PROJECT ---
---------------------------*/

exports.updateOneProject = async (req, res, next) => {
  try {
    const projectData = req.body;

    const artistsList = parseJSONSafely(req.body.artistsList, []);
    const productionList = parseJSONSafely(req.body.productionList, []);
    const pressList = parseJSONSafely(req.body.press, []);
    const linksList = parseJSONSafely(req.body.links, []);
    const diffusionList = parseJSONSafely(req.body.diffusionList, []);

    const newImagesObjects = req.newImagesObjects || [];
    const newMoImagesObjects = req.newMoImagesObjects || [];

    const aboutShowWithBr = (req.body.aboutShow || '').replace(/(\r\n|\n|\r)/g, '<br>');
    const aboutScenoWithBr = (req.body.aboutSceno || '').replace(/(\r\n|\n|\r)/g, '<br>');
    const summaryWithBr = (req.body.summary || '').replace(/(\r\n|\n|\r)/g, '<br>');

    const finalSlug = slugify(req.body.slug || req.body.title);

    const project = await findProjectBySlugOrId(req.params.slugOrId);

    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    const existingProjectWithSlug = await Project.findOne({ slug: finalSlug });

    if (
      existingProjectWithSlug &&
      existingProjectWithSlug._id.toString() !== project._id.toString()
    ) {
      return res.status(400).json({ error: 'Un autre projet utilise déjà ce slug.' });
    }

    const existingImagesObjects = extractExistingIndexedObjects(req.body, 'existingImages');
    const existingMoImagesObjects = extractExistingIndexedObjects(req.body, 'existingMoImages');

    const updatedImages = mergeAndSortImages(existingImagesObjects, newImagesObjects);
    const updatedMoImages = mergeAndSortImages(existingMoImagesObjects, newMoImagesObjects);

    const updatedMainImageIndex = normalizeMainIndex(req.body.mainImageIndex, updatedImages);
    const updatedMainMoImageIndex = normalizeMainIndex(req.body.mainMoImageIndex, updatedMoImages);

    // Images supprimées réellement par rapport à l'ancien projet
    const imagesToDelete = getUrlsToDelete(project.projectImages || [], updatedImages);
    const moImagesToDelete = getUrlsToDelete(project.makingOfImages || [], updatedMoImages);

    req.imagesToDelete = [...imagesToDelete, ...moImagesToDelete];

    const projectObject = {
      ...projectData,
      slug: finalSlug,
      aboutShow: aboutShowWithBr,
      aboutSceno: aboutScenoWithBr,
      summary: summaryWithBr,
      artistsList,
      productionList,
      press: pressList,
      links: linksList,
      diffusionList,
      mainImageIndex: updatedMainImageIndex,
      mainMoImageIndex: updatedMainMoImageIndex,
      projectImages: updatedImages,
      makingOfImages: updatedMoImages,
    };

    await Project.updateOne({ _id: project._id }, projectObject);

    res.status(200).json({ message: 'Projet modifié' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du projet.' });
  }
};