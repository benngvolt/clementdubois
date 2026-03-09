const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/sitemap.xml', async (req, res) => {
  try {

    const projects = await Project.find({}, 'slug');

    const baseUrl = "https://clement-dubois.com";

    let urls = `
<url>
  <loc>${baseUrl}</loc>
</url>
<url>
  <loc>${baseUrl}/projets</loc>
</url>
<url>
  <loc>${baseUrl}/infos</loc>
</url>
`;

    projects.forEach(project => {

      if (project.slug) {

        urls += `
<url>
  <loc>${baseUrl}/projets/${project.slug}</loc>
</url>
`;

      }

    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);

  } catch (error) {

    res.status(500).send('Erreur sitemap');

  }
});

module.exports = router;