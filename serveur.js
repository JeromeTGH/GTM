//process.env.NODE_ENV = 'production';

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routesRacine = require('./routes/routes.racine')
const routesUtilisateur = require('./routes/routes.utilisateur')
const routesListesDeTaches = require('./routes/routes.listesdetaches')
require('dotenv').config({ path: './config/.env' })
require('./utils/bdd.util.js')
const { recupInfosUtilisateurSiConnecte } = require('./middlewares/middleware.auth')
const cors = require('cors');

// Message d'invite
console.log("");
console.log("==========================");
console.log("Démarrage de l'application");
console.log("==========================");
console.log("");

// Création du serveur
const app = express()

// Déverrouillage du CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use('*', recupInfosUtilisateurSiConnecte)

// Routes
app.use('/', routesRacine)
app.use('/api/utilisateurs', routesUtilisateur)
app.use('/api/listesdetaches', routesListesDeTaches)

// Serveur
app.listen(process.env.PORT, () => {
    console.log(`Serveur NodeJS démarré (port ${process.env.PORT})`)
})