const routeur = require('express').Router()
// Se rajoute donc à la suite de : /api/utilisateurs

const controleurAuth = require('../controleurs/controleur.auth')
const controleurUtilisateur = require('../controleurs/controleur.utilisateur')

// PARTIE "authentification"
routeur.post('/postCreateUser', controleurAuth.createUser)              // (C)reate
routeur.post('/postLogin', controleurAuth.login)
routeur.post('/postLogout', controleurAuth.logout)

// PARTIE "utilisateur"
routeur.get('/getAll', controleurUtilisateur.getAll)
routeur.get('/getOne/:userID', controleurUtilisateur.getOne)            // (R)ead
routeur.put('/updateOne/:userID', controleurUtilisateur.updateOne)      // (U)pdate
routeur.delete('/deleteOne/:userID', controleurUtilisateur.deleteOne)   // (D)elete
routeur.patch('/addTask/:userID', controleurUtilisateur.addTask)
routeur.patch('/removeTask/:userID', controleurUtilisateur.removeTask)
routeur.patch('/updateTask/:userID', controleurUtilisateur.updateTask)

module.exports = routeur