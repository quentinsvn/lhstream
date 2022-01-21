//AUTEUR : Quentin Savéan
// Gestion de l'inscription

const express = require('express'), // Import de la librairie express
    router = express.Router(), // Création d'un routeur
    passport = require('passport'); // Import de la librairie passport

router.get('/', // Route pour l'inscription
    require('connect-ensure-login').ensureLoggedOut(), // Vérification de la déconnexion
    (req, res) => { // Fonction de réponse
        res.render('register', { // On affiche la page d'inscription
            user : null, // On initialise l'utilisateur à null
            errors : { // On initialise les erreurs à null
                username : req.flash('username'), // On récupère les erreurs de l'utilisateur
                email : req.flash('email') // On récupère les erreurs de l'email
            }
        });
    });

router.post('/', // Route pour l'inscription
    require('connect-ensure-login').ensureLoggedOut(), // Vérification de la déconnexion
    passport.authenticate('localRegister', { // Authentification de l'utilisateur
        successRedirect : '/', // Redirection vers la page d'accueil
        failureRedirect : '/register', // Redirection vers la page d'inscription
        failureFlash : true // Affichage des erreurs
    })
);


module.exports = router; // Export du routeur