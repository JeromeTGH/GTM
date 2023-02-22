const routeur = require('express').Router()
// Se rajoute donc à la suite de : /api/utilisateurs

const controleurAuth = require('../controleurs/controleur.auth')
const controleurUtilisateur = require('../controleurs/controleur.utilisateur')
const controleurTaches = require('../controleurs/controleur.taches')
const controleurListesDeTaches = require('../controleurs/controleur.listestaches')

// PARTIE "authentification"
routeur.post('/postCreateUser', controleurAuth.createUser)              // (C)reate
routeur.post('/postLogin', controleurAuth.login)
routeur.post('/postLogout', controleurAuth.logout)

// PARTIE "utilisateur"
routeur.get('/getAll', controleurUtilisateur.getAll)
routeur.get('/getOne/:userID', controleurUtilisateur.getOne)            // (R)ead
routeur.put('/updateOne/:userID', controleurUtilisateur.updateOne)      // (U)pdate
routeur.delete('/deleteOne/:userID', controleurUtilisateur.deleteOne)   // (D)elete

// PARTIE "taches possibles, pour chaque utilisateur"
routeur.patch('/addTask/:userID', controleurTaches.addTask)
routeur.patch('/removeTask/:userID', controleurTaches.removeTask)
routeur.patch('/updateTask/:userID', controleurTaches.updateTask)

// PARTIE "taches à faire, pour chaque utilisateur"
routeur.patch('/addNouvelleListeDeTachesAfaire/:userID', controleurListesDeTaches.addNewTaskList)
//routeur.patch('/getListeDeTachesAfaire/:listeID', controleurListesDeTaches.getOneTaskList)
//routeur.patch('/getAllListesDeTachesAfaire/', controleurListesDeTaches.getAllTaskList)
//routeur.patch('/removeListeDeTachesAfaire/:listeID', controleurListesDeTaches.removeOneTaskList)
//routeur.patch('/updateListeDeTachesAfaire/:listeID', controleurListesDeTaches.updateOneTaskList)
//routeur.patch('/postClotureListeDeTachesAfaire/:listeID', controleurListesDeTaches.closeOneTaskList)


module.exports = routeur