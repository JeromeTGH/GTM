const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAll = async (req, res) => {
    try {
        const utilisateurs = await ModeleUtilisateur.find().select(['-password', '-email'])
        // sur les données retournées, on enlève le password et l'email (données "sensibles")
        res.status(200).json(utilisateurs)
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

module.exports.getOne = (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    ModeleUtilisateur.findById(req.params.userID, (err, data) => {
        if (!err) res.status(200).json(data)
        if (err) res.status(500).json({ err })
    }).select(['-password', '-email'])
}

module.exports.updateOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    if (req.body.nomprenom === undefined)
        return res.status(400).send(`Paramètre "nomprenom" manquant …`)

    try {
        const filtre = { _id: req.params.userID }
        const update = { nomprenom: req.body.nomprenom }

        await ModeleUtilisateur.findOneAndUpdate(filtre, update, { new: true })     // Pour retourner l'élément APRÈS avoir fait l'update
            .select(['-password', '-email'])
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ err })
    }
}