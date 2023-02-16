const routeur = require('express').Router()
const controleurAuth = require('../controleurs/controleur.auth')

// Se rajoute à la suite de : /api/utilisateurs
routeur.post('/inscription', controleurAuth.inscription)

module.exports = routeur