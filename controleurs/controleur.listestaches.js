const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ModeleListeDeTaches = require('../modeles/modele.listedetaches')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction addNewTaskList dans API
module.exports.addNewTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)


    // Génération du texte "moisAnnee"
    const datetimeActuel = new Date(Date.now())
    const moisActuel = datetimeActuel.getMonth() + 1
    const moisAnnee = moisActuel + '-' + datetimeActuel.getFullYear()

    try {
        // Récupère la liste de tâches préenregistrées, par cet utilisateur
        const utilisateur = ModeleUtilisateur.findById(req.params.userID)
            .then((data) => {

                // Génération du tableau des tâches qu'il y aura à faire (à partir de la liste des tâches possibles, contenue dans le profil utilisateur)
                let tableauDesTachesAFaire = []
                data.tachespossibles.map(tache => {
                    tableauDesTachesAFaire.push({
                        libelleTache: tache[0],
                        descriptionTache: tache[1],
                        bTacheAccomplie: false
                    })
                })

                // Génération du modèle de liste de tâches à faire
                const nouvelleListeDeTachesAfaire = new ModeleListeDeTaches({
                    IDutilisateur: req.params.userID,
                    tachesAfaire: tableauDesTachesAFaire,
                    libelleMoisAnnee: moisAnnee,
                    timestampCloture: null
                })

                // Et enregistrement de ce modèle de nouvelle liste de tâches à faire
                nouvelleListeDeTachesAfaire.save()
                    .then((data2) => {
                        res.status(200).json(data2)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json(err)
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction getAllTaskList dans API
module.exports.getAllTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const listesDeTaches = await ModeleListeDeTaches.find({ IDutilisateur: req.params.userID })
        res.status(200).json(listesDeTaches)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction getOneTaskList dans API
module.exports.getOneTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.listeID))
        return res.status(400).send(`ID [${req.params.listeID}] inconnu …`)

    try {
        const listeDeTaches = await ModeleListeDeTaches.findById(req.params.listeID)
        res.status(200).json(listeDeTaches)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction removeOneTaskList dans API
module.exports.removeOneTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.listeID))
        return res.status(400).send(`ID [${req.params.listeID}] inconnu …`)

    try {
        ModeleListeDeTaches.findByIdAndDelete(req.params.listeID)
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction updateOneTaskList dans API
module.exports.updateOneTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.listeID))
        return res.status(400).send(`ID [${req.params.listeID}] inconnu …`)

    if (req.body.timestampCloture === undefined)
        return res.status(400).send(`Paramètre "timestampCloture" manquant …`)

    try {

        /* const filtre = { _id: req.params.userID }
        const champsAmettreAjour = {}

        if (req.body.pseudo !== undefined)
            champsAmettreAjour['pseudo'] = req.body.pseudo
        if (req.body.estActif !== undefined)
            champsAmettreAjour['estActif'] = req.body.estActif

        await ModeleUtilisateur.findOneAndUpdate(filtre, champsAmettreAjour, { new: true })     // Pour retourner l'élément APRÈS avoir fait l'update
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err })) */

        res.status(200).json('En construction')
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}