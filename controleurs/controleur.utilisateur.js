const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction getAll dans API
module.exports.getAll = async (req, res) => {
    try {
        const utilisateurs = await ModeleUtilisateur.find()
        // dans les données retournées, manquents les password et email (données "sensibles") ; celles-ci sont masquées par défaut, par choix, dans le modèle
        res.status(200).json(utilisateurs)
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

// Ajout fonction getOne dans API
module.exports.getOne = (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    ModeleUtilisateur.findById(req.params.userID, (err, data) => {
        if (!err) res.status(200).json(data)
        if (err) res.status(500).json({ err })
    })
}


// Ajout fonction updateOne dans API
module.exports.updateOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    if (req.body.pseudo === undefined && req.body.estActif === undefined)
        return res.status(400).send(`Paramètre "pseudo" et/ou "estActif" manquant …`)

    try {
        const filtre = { _id: req.params.userID }
        const champsAmettreAjour = {}

        if (req.body.pseudo !== undefined)
            champsAmettreAjour['pseudo'] = req.body.pseudo
        if (req.body.estActif !== undefined)
            champsAmettreAjour['estActif'] = req.body.estActif

        await ModeleUtilisateur.findOneAndUpdate(filtre, champsAmettreAjour, { new: true })     // Pour retourner l'élément APRÈS avoir fait l'update
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

// Ajout fonction deleteOne dans API
module.exports.deleteOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const filtre = { _id: req.params.userID }

        await ModeleUtilisateur.deleteOne(filtre)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ err })
    }
}
