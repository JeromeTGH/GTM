const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAll = async (req, res) => {
    try {
        const utilisateurs = await ModeleUtilisateur.find().select(['-password', '-email'])
        // sur les données retournées, on enlève le password et l'email (données "sensibles")
        res.status(200).json(utilisateurs)
    }
    catch (err) {
        res.status(200).json({ err })
    }
}

module.exports.getOne = (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    ModeleUtilisateur.findById(req.params.userID, (err, data) => {
        if (!err) res.status(200).json(data)
        if (err) res.status(200).json({ err })
    }).select(['-password', '-email'])
}