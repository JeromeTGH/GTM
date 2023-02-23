const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ModeleListeDeTaches = require('../modeles/modele.listedetaches')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction addNewTaskList dans API
module.exports.addNewTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)


    // Génération du texte "moisAnnee"
    const datetimeActuel = new Date()
    const moisActuel = datetimeActuel.getMonth() + 1
    const moisAnnee = moisActuel + '-' + datetimeActuel.getFullYear()

    try {
        // Récupère la liste de tâches préenregistrées, par cet utilisateur
        const utilisateur = await ModeleUtilisateur.findById(req.params.userID)

        // Génération du tableau des tâches qu'il y aura à faire (à partir de la liste des tâches possibles, contenue dans le profil utilisateur)
        let tableauDesTachesAFaire = []
        utilisateur.tachespossibles.map(tache => {
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
        const nouvelleTache = await nouvelleListeDeTachesAfaire.save()
        res.status(200).json(nouvelleTache)

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
        const listeDeTache = await ModeleListeDeTaches.findByIdAndDelete(req.params.listeID)
        // Même si le contenu de cet enregistrement est effectivement retourné "en sortie", il est désormais bel et bien supprimé en base
        // (d'ailleurs, si on réappelait cette fonction, la valeur null sera alors renvoyée, prouvant bien que cette liste a bien été supprimée)
        res.status(200).json(listeDeTache)
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
        const listeDeTache = await ModeleListeDeTaches.findByIdAndUpdate(
            req.params.listeID,
            { timestampCloture: req.body.timestampCloture },
            { new: true }
        )
        res.status(200).json(listeDeTache)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}