// AUTEUR : Quentin Savéan
// Gestion des paramètres

const express = require('express'), // Import de la librairie express
    router = express.Router(), // Création d'un routeur
    User = require('../database/Schema').User, // Import du schéma de la base de données
    shortid = require('shortid'); // Import de la librairie shortid

router.get('/stream_key', // Route pour le récupération des informations de l'utilisateur (clé privée)
    require('connect-ensure-login').ensureLoggedIn(), // Vérification de la connexion
    (req, res) => { // Fonction de réponse
        User.findOne({email: req.user.email}, (err, user) => { // On cherche l'utilisateur dans la base de données avec le paramètre username passé en paramètre de la requête
            if (!err) { // Si l'utilisateur existe
                res.json({ // On retourne les informations de l'utilisateur dans un objet json
                    stream_key: user.stream_key // On retourne la clé privée
                })
            }
        });
    });

router.post('/stream_key', // Route pour le récupération des informations de l'utilisateur (clé privée)
    require('connect-ensure-login').ensureLoggedIn(), // Vérification de la connexion
    (req, res) => { // Fonction de réponse

        User.findOneAndUpdate({ // On cherche l'utilisateur dans la base de données avec le paramètre username passé en paramètre de la requête
            email: req.user.email // On cherche l'utilisateur avec le nom d'utilisateur
        }, {
            stream_key: shortid.generate() // On génère une clé privée
        }, {
            upsert: true, // On insère l'utilisateur si il n'existe pas
            new: true, // On retourne l'utilisateur mis à jour
        }, (err, user) => { // Fonction de callback
            if (!err) { // Si l'utilisateur existe
                res.json({ // On retourne les informations de l'utilisateur dans un objet json
                    stream_key: user.stream_key   // On retourne la clé privée
                })
            }
        });
    });


module.exports = router; // Export du routeur