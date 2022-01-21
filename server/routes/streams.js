// AUTEUR : Quentin Savéan
// Récupération des informations d'un flux vidéo d'un utilisateur

const express = require('express'), // Import de la librairie express
    router = express.Router(), // Création d'un routeur
    User = require('../database/Schema').User; // Import du schéma de la base de données

router.get('/info', // Route pour le récupération des informations de l'utilisateur
    require('connect-ensure-login').ensureLoggedIn(), // Vérification de la connexion
    (req, res) => {    // Fonction de réponse
        if(req.query.streams){ // Si le paramètre streams est présent
            let streams = JSON.parse(req.query.streams); // On parse le paramètre streams en objet json
            let query = {$or: []}; // On créé une requête qui va chercher les utilisateurs qui ont au moins un flux vidéo
            for (let stream in streams) { // Pour chaque flux vidéo
                if (!streams.hasOwnProperty(stream)) continue; // Si le flux vidéo n'est pas un propriété de l'objet, on passe à la prochaine itération
                query.$or.push({stream_key : stream}); // On ajoute la requête qui va chercher les utilisateurs qui ont au moins un flux vidéo
            } 

            User.find(query,(err, users) => { // Fonction de callback
                if (err) // Si une erreur est survenue
                    return; // On retourne l'erreur
                if (users) { // Si l'utilisateur existe
                    res.json(users); // On retourne les informations de l'utilisateur dans un objet json
                }
            });
        }
    });
module.exports = router; // Export du routeur
