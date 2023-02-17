const routeur = require('express').Router()
// Se rajoute donc à la suite de : /api/utilisateurs

const controleurAuth = require('../controleurs/controleur.auth')
const controleurUtilisateur = require('../controleurs/controleur.utilisateur')


// PARTIE "authentification"
routeur.post('/postInscription', controleurAuth.inscription)

// PARTIE "utilisateur"
routeur.get('/getTousLesUtilisateurs', controleurUtilisateur.getTousLesUtilisateurs)


module.exports = routeur