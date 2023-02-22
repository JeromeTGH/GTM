const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ModeleListeDeTaches = require('../modeles/modele.listedetaches')
const ObjectID = require('mongoose').Types.ObjectId

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

/* module.exports.addNewTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    const datetimeActuel = new Date(Date.now())
    const timestampActuel = datetimeActuel.getTime()
    const moisActuel = datetimeActuel.getMonth() + 1
    const moisAnnee = moisActuel + '-' + datetimeActuel.getFullYear()

    try {
        // Récupère la liste de tâches préenregistrées, par cet utilisateur
        const utilisateur = ModeleUtilisateur.findById(req.params.userID)
            .then((data) => {

                let tachesAFaire = []
                data.tachespossibles.map(tache => {
                    let tacheAfaire = []
                    tacheAfaire.push(tache[0])
                    tacheAfaire.push(tache[1])
                    tacheAfaire.push(false)             // Ajout d'un champ booléen, égal à 'false', aux taches possibles (pour dire que ce sera à faire ensuite)
                    tachesAFaire.push(tacheAfaire)      // et enregistrement de cela dans le tableau des tâches à faire
                })

                // Créé la nouvelle liste de tâche, à date
                ModeleUtilisateur.findByIdAndUpdate(
                    req.params.userID,
                    {
                        $push: {
                            listesDeTachesAfaire: {
                                tachesAfaire: tachesAFaire,
                                libelleMoisAnnee: moisAnnee,
                                timestampCreation: timestampActuel,
                                timestampCloture: null
                            }
                        }
                    },
                    { new: true }
                )
                    .then((data) => res.status(200).json(data))
                    .catch((err) => res.status(500).json(err))
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
} */
