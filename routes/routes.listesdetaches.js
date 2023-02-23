const routeur = require('express').Router()
// Se rajoute donc à la suite de : /api/listesdetaches

const controleurListesDeTaches = require('../controleurs/controleur.listestaches')

// PARTIE "taches à faire, pour chaque utilisateur"
routeur.post('/genereNouvelleListeDeTachesAfaire/:userID', controleurListesDeTaches.addNewTaskList)
routeur.get('/getAllListesDeTachesAfaire/:userID', controleurListesDeTaches.getAllTaskList)
routeur.get('/getListeDeTachesAfaire/:listeID', controleurListesDeTaches.getOneTaskList)
routeur.delete('/removeListeDeTachesAfaire/:listeID', controleurListesDeTaches.removeOneTaskList)
routeur.put('/updateListeDeTachesAfaire/:listeID', controleurListesDeTaches.updateOneTaskList)
routeur.patch('/updateUneTacheDansListeDeTachesAfaire/:listeID', controleurListesDeTaches.updateOneTaskinTaskList)

// Fin, pour cette partie
module.exports = routeur