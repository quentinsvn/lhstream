// Fichier permettant le lancement de l'application incluant la gestion des routes, des sessions et de la connexion à la base de données noSQL.

// Importation des modules node
const express = require('express'), // Module permettant de gérer les routes
    path = require('path'), // Module permettant de gérer les chemins
    session = require('express-session'), // Module permettant de gérer les sessions
    bodyParse = require('body-parser'), // Module permettant de gérer les données envoyées en POST
    passport = require('./auth/passport'), // Module permettant de gérer l'authentification
    mongoose = require('mongoose'), // Module permettant de gérer la connexion à la base de données noSQL MongoDB
    middleware = require('connect-ensure-login'), // Module permettant de gérer les sessions
    MongoStore = require('connect-mongo'); // Module permettant de gérer la connexion à la base de données noSQL MongoDB
    config = require('./config/default'), // Module permettant de gérer les paramètres de l'application
    flash = require('connect-flash'), // Module permettant de gérer les messages flash
    port = process.env.PORT || 3333, // Port utilisé pour le lancement de l'application
    app = express(), // Instance de l'application
    node_media_server = require('./media_server'), // Instance du serveur de média
    thumbnail_generator = require('./cron/thumbnails'); // Instance du générateur de vignettes


mongoose.connect('URL DU SERVEUR MONGODB' , { useNewUrlParser: true }); // Connexion à la base de données

app.set('view engine', 'ejs'); // Définition du moteur de template
app.set('views', path.join(__dirname, './views')); // Définition du dossier contenant les vues
app.use(express.static('public')); // Définition du dossier contenant les fichiers statiques
app.use('/thumbnails', express.static('server/thumbnails')); // Définition du dossier contenant les miniatures
app.use(flash()); // Définition du module flash

app.use(require('cookie-parser')()); // Définition du module cookie-parser (stockage des cookies)
app.use(bodyParse.urlencoded({extended: true})); // Définition du module body-parser (encodage des données dans les requêtes)
app.use(bodyParse.json({extended: true})); // Définition du module body-parser (stockage des données dans les requêtes) en format json

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'URL DU SERVEUR MONGODB',
        ttl: 14 * 24 * 60 * 60 // Stockage des sessions dans la base de données pendant 14 jours
    }), // Définition du module session-mongoose (stockage des sessions dans la base de données)
    secret: config.server.secret,  // Définition du secret
    maxAge : Date().now + (60 * 1000 * 30), // Définition de la durée de vie des sessions
    resave : true, // Définition de la mise à jour des sessions
    saveUninitialized : false, // Définition de la création des sessions
}));

app.use(passport.initialize()); // Définition du module passport (pour l'authentification)
app.use(passport.session()); // Initialisation de la session

// Définition des routes
app.use('/login', require('./routes/login')); // Définition des routes de connexion
app.use('/register', require('./routes/register')); // Définition des routes d'inscription
app.use('/settings', require('./routes/settings')); // Définition des routes de paramètres
app.use('/streams', require('./routes/streams')); // Définition des routes de flux
app.use('/user', require('./routes/user')); // Définition des routes de profil

app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
}); // Définition des routes de déconnexion

app.get('*', middleware.ensureLoggedIn(), (req, res) => {
    res.render('index');
}); // Définition des routes de page d'accueil

app.listen(port, () => console.log(`Application active sur le port ${port}!`)); // Démarrage du serveur sur le port défini
node_media_server.run(); // Démarrage du serveur de flux
thumbnail_generator.start(); // Démarrage du cron de génération des miniatures