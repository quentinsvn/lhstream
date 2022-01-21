# LHStream

Dans le cadre de ma présentation sur le protocole RTP pour la matière "Services Réseaux", il m'est venu de créer ce mini-projet web réalisé essentiellement en Node.js, et qui consiste en la création d'une plateforme de vidéos en direct à l'aide d'un serveur RTMP.

# Prérequis

Avant de vous lancer dans la mise en route du projet, veuillez vous assurer que vous détenez les éléments suivants :

1. [Node.js](https://nodejs.org/en/)
2. [NPM](https://www.npmjs.com/) (Node package manager)
3. [FFMPEG](https://www.ffmpeg.org/) (pour la conversion vidéo)
4. Une base de données noSQL [MongoDB](https://www.mongodb.com/)

# Mise en route

## Etape 1 : Installation des modules npm

Afin de faire fonctionner l'ensemble de l'application, il sera nécessaire d'installer les différentes dépendances node du projet en tapant la commande suivante depuis votre terminal via le répertoire courant du repo :

``npm i``

## Etape 2 : Modifier les informations de connexions de la base de données

Via le fichier **server > app.js**, modifier les informations de connexions de votre base MongoDB en majuscules.

```js
mongoose.connect('URL DE VOTRE SERVEUR MONGODB' , { useNewUrlParser: true }); 
```

```js
store: MongoStore.create({
        mongoUrl: 'URL DE VOTRE SERVEUR MONGODB',
        ...
    }),
```

## Etape 3 : Compacter vos fichiers JS (build)

À l'aide de WebPack, tapez la commande suivante afin de compiler l'ensemble de vos fichiers ReactJS pour qu'ils soient par la suite interpréter par votre navigateur.

``npm run watch``

## Etape 3 : Lancer le programme

Une fois les étapes précédentes effectuées, vous pouvez désormais lancer votre projet via la commande suivante :

``npm start``
