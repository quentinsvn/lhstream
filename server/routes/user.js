// AUTEUR : Quentin Savéan
// Route pour le récupération des informations de l'utilisateur

const express = require('express'), // Import de la librairie express
    router = express.Router(), // Création d'un routeur
    User = require('../database/Schema').User; // Import du schéma de la base de données

router.get('/', // Route pour le récupération des informations de l'utilisateur
    require('connect-ensure-login').ensureLoggedIn(), // Vérification de la connexion
    (req, res) => { // Fonction de réponse

        if(req.query.username){ // Si le paramètre username est présent
            User.findOne({ // On cherche l'utilisateur dans la base de données avec le paramètre username passé en paramètre de la requête
                username : req.query.username // On cherche l'utilisateur avec le nom d'utilisateur
            },(err, user) => { // Fonction de callback
                if (err) // Si une erreur est survenue
                    return; // On retourne l'erreur
                if (user) { // Si l'utilisateur existe
                    res.json({  // On retourne les informations de l'utilisateur dans un objet json
                        stream_key : user.stream_key // On retourne la clé privée
                    });
                }
            });
        }else{
            res.json({}); // Si le paramètre username n'est pas présent, on retourne un objet vide (pour éviter les erreurs) au format json
        }
    });

module.exports = router; // Export du routeur
