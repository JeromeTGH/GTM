const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ModeleListeDeTaches = require('../modeles/modele.listedetaches')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.addNewTaskList = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    return res.status(200).json('En construction')

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
