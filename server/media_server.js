// AUTEUR : Quentin Savéan
// Fichier servant à gérer les requêtes HTTP des clients pour les flux

const User = require('./database/Schema').User; // On recupère les informations du schema de la base de données pour les utilisateurs
const NodeMediaServer = require('node-media-server'), // Import de la librairie node-media-server
    config = require('./config/default').rtmp_server; // Import de la configuration du serveur
 
nms = new NodeMediaServer(config); // Création du serveur
 
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath); // Récupération de la clé privée 
    console.log('[Evenement]', `id=${id} chemin=${StreamPath} args=${JSON.stringify(args)}`); // Affichage de l'événement

    User.findOne({stream_key: stream_key}, (err, user) => { 
        if (!err) {
            if (!user) {
                let session = nms.getSession(id); // Récupération de la session
                session.reject(); // Rejet de la session
            } else {
                // On vérifie que l'utilisateur est bien connecté
            }
        }
    });
});
 
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/'); // On sépare le chemin en fonction du /
    return parts[parts.length - 1]; // On récupère la dernière partie du chemin
};
 
module.exports = nms; // Export du serveur