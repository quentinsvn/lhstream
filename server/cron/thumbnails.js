// AUTEUR : Quentin Savéan
// Cronjob pour la génération des miniatures 

const CronJob = require('cron').CronJob, // Import de la librairie cronjob
    axios = require('axios'), // Import de la librairie axios
    helpers = require('../helpers/helpers'), // Import de la librairie helpers
    config = require('../config/default'), // Import de la configuration du serveur
    port = config.rtmp_server.http.port; // Port du serveur

const job = new CronJob('*/5 * * * * *', function () { // Création du cronjob
    axios.get('http://[IP DE VOTRE SERVEUR]:' + port + '/api/streams') // Requête HTTP
        .then(response => { // Si la requête s'est bien passée
            let streams = response.data; // On récupère les flux
            if (typeof (streams['live'] !== undefined)) { // Si le flux live existe
                let live_streams = streams['live']; // On récupère les flux live
                for (let stream in live_streams) { // Pour chaque flux
                    if (!live_streams.hasOwnProperty(stream)) continue; // Si le flux n'est pas un propriétaire
                    helpers.generateStreamThumbnail(stream); // On génère la miniature
                }
            }
        })
        .catch(error => { // Si la requête a échoué
            console.log(error); // On affiche l'erreur
        });
}, null, true); // Démarrage du cronjob

module.exports = job; // Export du cronjob
