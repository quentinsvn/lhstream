//AUTEUR : Quentin Savéan
// Gestion de la connexion

const express = require('express'), // Import de la librairie express
    router = express.Router(), // Création d'un routeur
    passport = require('passport'); // Import de la librairie passport

router.get('/', // Route pour la connexion
    require('connect-ensure-login').ensureLoggedOut(), // Vérification de la déconnexion
    (req, res) => { // Fonction de réponse
        res.render('login', { // On affiche la page de connexion
            user : null, // On initialise l'utilisateur à null
            errors : { // On initialise les erreurs à null
                email : req.flash('email'), // On récupère les erreurs de l'email
                password : req.flash('password') // On récupère les erreurs du mot de passe
            }
        });
    });

router.post('/', passport.authenticate('localLogin', { // Authentification de l'utilisateur
    successRedirect : '/', // Redirection vers la page d'accueil
    failureRedirect : '/login', // Redirection vers la page de connexion
    failureFlash : true // Affichage des erreurs
}));

module.exports = router; // Export du routeur