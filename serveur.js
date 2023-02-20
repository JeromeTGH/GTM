//process.env.NODE_ENV = 'production';

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routesUtilisateur = require('./routes/routes.utilisateur')
require('dotenv').config({ path: './config/.env' })
require('./utils/bdd.js')
const { recupInfosUserSiBienConnecte } = require('./midllewares/middleware.auth')

// Message d'invite
console.log("");
console.log("==========================");
console.log("Démarrage de l'application");
console.log("==========================");
console.log("");

// Création du serveur
const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
app.use('*', recupInfosUserSiBienConnecte)
app.use('/api/utilisateurs', routesUtilisateur)

// Serveur
app.listen(process.env.PORT, () => {
    console.log(`Serveur NodeJS démarré (port ${process.env.PORT})`)
})