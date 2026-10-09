// Point d'entrée unique pour construire l'URL d'un média : les fichiers sont servis
// directement depuis le bucket Google Cloud Storage. Si l'hébergement des médias
// change un jour, c'est ici qu'il faudra réécrire les URLs.
export const getMediaUrl = (url) => url
