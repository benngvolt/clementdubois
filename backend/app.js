/*-----------------------------------------------------------

CONSTANTES et IMPORTS

-----------------------------------------------------------*/

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

//Nouvelle instance de l'application Express, pour configurer notre serveur et définir les routes et les middlewares.
const app = express();

// Variables d'environnement indispensables : sans elles l'API démarrerait "à moitié" et échouerait plus tard
const REQUIRED_ENV = ['SECRET_MONGODBKEY', 'SECRET_TOKEN', 'GCLOUD_STORAGE_BUCKET'];
const missingEnv = REQUIRED_ENV.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
  console.error(`Variables d'environnement manquantes : ${missingEnv.join(', ')}`);
  process.exit(1);
}

if (process.env.SECRET_TOKEN.length < 32) {
  console.warn('SECRET_TOKEN est trop court : utiliser une chaîne aléatoire d\'au moins 32 caractères.');
}

const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const informationsRoutes = require('./routes/informations');
const sitemapRoutes = require('./routes/sitemap');

// Connexion à mongoose avec l'adresse srv donnée lors de la création du cluster contenant le password.
// Sans base de données l'API est inutilisable : on arrête le process pour que la plateforme le relance.
mongoose.connect(process.env.SECRET_MONGODBKEY)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.error('Connexion à MongoDB échouée !', error);
    process.exit(1);
  });

/*-----------------------------------------------------------

MIDDLEWARES

-----------------------------------------------------------*/

// PREMIER MIDDLEWARE POUR GÉRER LES PROBLEMES DE CORS ORIGIN
// (l'authentification passe par un header Bearer, pas par cookie : '*' reste sûr ici)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

// pour parser les requêtes
app.use(express.json({ limit: '1mb' }));

// on utilise les routers importés
app.use('/', sitemapRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/informations', informationsRoutes);

/*-----------------------------------------------------------

GESTION DES ERREURS

-----------------------------------------------------------*/

// route d'API inconnue : réponse JSON plutôt que la page HTML par défaut d'Express
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route introuvable.' });
});

// erreurs non interceptées (upload multer, JSON invalide, etc.) : toujours une réponse JSON lisible
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    const messages = {
      LIMIT_FILE_SIZE: 'Fichier trop volumineux (30 Mo maximum).',
      LIMIT_FILE_COUNT: 'Trop de fichiers envoyés en une seule fois.',
      LIMIT_UNEXPECTED_FILE: 'Trop de fichiers envoyés pour ce champ.',
      LIMIT_FIELD_COUNT: 'Trop de champs dans le formulaire.',
    };
    return res.status(status).json({ error: messages[error.code] || error.message });
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Corps de requête JSON invalide.' });
  }

  console.error(error);
  res.status(error.status || 500).json({ error: error.expose ? error.message : 'Erreur serveur.' });
});

// Enfin, cette ligne exporte notre instance d'application Express afin qu'elle puisse être utilisée dans d'autres fichiers du projet.
module.exports = app;
