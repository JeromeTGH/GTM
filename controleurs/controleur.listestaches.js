const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ModeleListeDeTaches = require('../modeles/modele.listedetaches')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction addNewTaskList dans API
module.exports.addNewTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    // Génération du texte "moisAnnee"
    const listeDeMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const datetimeActuel = new Date()
    const moisActuel = listeDeMois[datetimeActuel.getMonth()]
    const moisAnnee = moisActuel + ' ' + datetimeActuel.getFullYear()

    try {
        // Récupère la liste de tâches préenregistrées, par cet utilisateur
        const utilisateur = await ModeleUtilisateur.findById(req.params.userID)

        if (!utilisateur)
            return res.status(400).json({ "erreur": `L'ID=${req.params.userID} ne correspond à aucun utilisateur en base (correspond à autre chose ou à un utilisateur supprimé)` })

        if (!utilisateur.estActif)
            return res.status(400).json({ "erreur": `Cet utilisateur est noté 'inactif' ; on ne peut donc pas lui créer de liste de tâches à faire, actuellement` })

        // Génération du tableau des tâches qu'il y aura à faire (à partir de la liste des tâches possibles, contenue dans le profil utilisateur)
        let tableauDesTachesAFaire = []
        utilisateur.tachespossibles.map(tache => {
            tableauDesTachesAFaire.push({
                libelleTache: tache[0],
                descriptionTache: tache[1],
                bTacheAccomplie: false
            })
        })

        if (tableauDesTachesAFaire.length > 0) {
            // Génération du modèle de liste de tâches à faire
            const chamspNouvelleListeDeTachesAfaire = {
                IDutilisateur: req.params.userID,
                tachesAfaire: tableauDesTachesAFaire,
                libelleMoisAnnee: moisAnnee,
                timestampCloture: null
            }

            // Et enregistrement de ce modèle de nouvelle liste de tâches à faire
            const nouvelleTache = await ModeleListeDeTaches.create(chamspNouvelleListeDeTachesAfaire)
            res.status(201).json(nouvelleTache)
        } else {
            res.status(200).json({ "info": `Aucune liste de tâche n'a pu être créée pour cet utilisateur, car il n'avait aucune tâche possible d'enregistrée dans son profil` })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction getAllTaskList dans API
module.exports.getAllTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

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
        return res.status(400).json({ "erreur": `ID=${req.params.listeID} non trouvé en base, donc impossible de trouver la liste de tâches à faire correspondante` })

    try {
        const listeDeTaches = await ModeleListeDeTaches.findById(req.params.listeID)
        if (!listeDeTaches)
            res.status(400).json({ "erreur": `L'ID=${req.params.listeID} ne correspond à aucune liste de taches en base (correspond à autre chose ou à une liste déjà supprimée)` })
        else
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
        return res.status(400).json({ "erreur": `ID=${req.params.listeID} non trouvé en base, donc impossible de trouver la liste de tâches à faire correspondante` })

    try {
        const listeDeTache = await ModeleListeDeTaches.findByIdAndDelete(req.params.listeID)
        // Même si le contenu de cet enregistrement est effectivement retourné "en sortie", il est désormais bel et bien supprimé en base
        // (d'ailleurs, si on réappelait cette fonction, la valeur null sera alors renvoyée, prouvant bien que cette liste a bien été supprimée)
        if (!listeDeTache)
            res.status(400).json({ "erreur": `L'ID=${req.params.listeID} ne correspond à aucune liste de taches en base (correspond à autre chose ou à une liste déjà supprimée)` })
        else
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
        return res.status(400).json({ "erreur": `ID=${req.params.listeID} non trouvé en base, donc impossible de trouver la liste de tâches à faire correspondante` })

    if (req.body.timestampCloture === undefined)
        return res.status(400).send({ "erreur": `Paramètre "timestampCloture" manquant …` })

    try {
        const listeDeTache = await ModeleListeDeTaches.findByIdAndUpdate(
            req.params.listeID,
            { timestampCloture: req.body.timestampCloture },
            { new: true }
        )
        if (!listeDeTache)
            res.status(400).json({ "erreur": `L'ID=${req.params.listeID} ne correspond à aucune liste de taches en base (correspond à autre chose ou à une liste déjà supprimée)` })
        else
            res.status(200).json(listeDeTache)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction updateOneTaskInTaskList dans API
module.exports.updateOneTaskInTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.listeID))
        return res.status(400).json({ "erreur": `ID=${req.params.listeID} non trouvé en base, donc impossible de trouver la liste de tâches à faire correspondante` })

    if (req.body.tacheID === undefined)
        return res.status(400).send({ "erreur": `Paramètre 'tacheID' manquant …` })

    if (!ObjectID.isValid(req.body.tacheID))
        return res.status(400).json({ "erreur": `ID=${req.body.tacheID} non trouvé en base, donc impossible de trouver la tâche à faire correspondante` })

    if (req.body.bTacheAccomplie === undefined)
        return res.status(400).send({ "erreur": `Paramètre 'bTacheAccomplie' manquant …` })

    try {
        const listeDeTache = await ModeleListeDeTaches.findById(req.params.listeID)
        if (!listeDeTache)
            return res.status(400).json({ "erreur": `L'ID=${req.params.listeID} ne correspond à aucune liste de taches en base (correspond à autre chose ou à une liste déjà supprimée)` })

        const tacheVisee = listeDeTache.tachesAfaire.find(tache => tache._id.equals(req.body.tacheID))
        if (!tacheVisee)
            return res.status(404).json({ "erreur": `Tache ID=${req.body.tacheID} non trouvée, donc pas possible de mettre à jour` })

        tacheVisee.bTacheAccomplie = req.body.bTacheAccomplie

        const listDeTacheMiseAjour = await listeDeTache.save()
        res.status(200).send(listDeTacheMiseAjour)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction genereAllMonthTaskLists dans API
module.exports.genereAllMonthTaskLists = async (req, res) => {
    let nbreDeUtilisateursTotal = 0
    let nbreDeUtilisateursInactifs = 0
    let nbreDeListesGenerees = 0

    // Génération du texte "moisAnnee"
    const listeDeMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const datetimeActuel = new Date()
    const moisActuel = listeDeMois[datetimeActuel.getMonth()]
    const moisAnnee = moisActuel + ' ' + datetimeActuel.getFullYear()

    try {
        // Récupère la liste de tous les utilisateurs
        const utilisateurs = await ModeleUtilisateur.find()
        nbreDeUtilisateursTotal = utilisateurs.length

        for (let i = 0; i < nbreDeUtilisateursTotal; i++) {

            // Récupération des utilisateurs, un par un
            const utilisateur = utilisateurs[i]

            if (utilisateur.estActif) {


                // Génération du tableau des tâches qu'il y aura à faire (à partir de la liste des tâches possibles, contenue dans le profil utilisateur)
                let tableauDesTachesAFaire = []
                utilisateur.tachespossibles.forEach(tache => {
                    tableauDesTachesAFaire.push({
                        libelleTache: tache[0],
                        descriptionTache: tache[1],
                        bTacheAccomplie: false
                    })
                })

                if (tableauDesTachesAFaire.length > 0) {
                    // Génération du modèle de liste de tâches à faire
                    const chamspNouvelleListeDeTachesAfaire = {
                        IDutilisateur: utilisateur._id,
                        tachesAfaire: tableauDesTachesAFaire,
                        libelleMoisAnnee: moisAnnee,
                        timestampCloture: null
                    }

                    // Et enregistrement de ce modèle de nouvelle liste de tâches à faire
                    const nouvelleTache = await ModeleListeDeTaches.create(chamspNouvelleListeDeTachesAfaire)
                    nbreDeListesGenerees++
                }
            } else {
                nbreDeUtilisateursInactifs++
            }
        }
        res.status(201).json({
            'nombreTotalDutilisateurs': nbreDeUtilisateursTotal,
            'nombreDutilisateursIncatifs': nbreDeUtilisateursInactifs,
            'nombreDeListesGénérées': nbreDeListesGenerees
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}