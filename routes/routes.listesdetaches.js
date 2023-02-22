const routeur = require('express').Router()
// Se rajoute donc à la suite de : /api/listesdetaches

const controleurListesDeTaches = require('../controleurs/controleur.listestaches')

// PARTIE "taches à faire, pour chaque utilisateur"
routeur.patch('/addNouvelleListeDeTachesAfaire/:userID', controleurListesDeTaches.addNewTaskList)
//routeur.patch('/getListeDeTachesAfaire/:listeID', controleurListesDeTaches.getOneTaskList)
//routeur.patch('/getAllListesDeTachesAfaire/', controleurListesDeTaches.getAllTaskList)
//routeur.patch('/removeListeDeTachesAfaire/:listeID', controleurListesDeTaches.removeOneTaskList)
//routeur.patch('/updateListeDeTachesAfaire/:listeID', controleurListesDeTaches.updateOneTaskList)
//routeur.patch('/postClotureListeDeTachesAfaire/:listeID', controleurListesDeTaches.closeOneTaskList)

// Fin, pour cette partie
module.exports = routeur