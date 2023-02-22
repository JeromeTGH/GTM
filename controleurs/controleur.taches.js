const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction addTask dans API
module.exports.addTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const tableau = [req.body.libelle, req.body.description]

        await ModeleUtilisateur.findByIdAndUpdate(
            req.params.userID,
            { $addToSet: { tachespossibles: tableau } },
            { new: true }
        )
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

// Ajout fonction removeTask dans API
module.exports.removeTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const tableau = [req.body.libelle, req.body.description]

        await ModeleUtilisateur.findByIdAndUpdate(
            req.params.userID,
            { $pull: { tachespossibles: tableau } },
            { new: true }
        )
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ err })
    }
}

// Ajout fonction updateTask dans API
module.exports.updateTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    if (req.body.old_libelle === undefined)
        return res.status(400).send(`Paramètre "old_libelle" manquant …`)
    if (req.body.old_description === undefined)
        return res.status(400).send(`Paramètre "old_description" manquant …`)
    if (req.body.new_libelle === undefined)
        return res.status(400).send(`Paramètre "new_libelle" manquant …`)
    if (req.body.new_description === undefined)
        return res.status(400).send(`Paramètre "new_description" manquant …`)

    try {
        const tableau1 = [req.body.old_libelle, req.body.old_description]
        const tableau2 = [req.body.new_libelle, req.body.new_description]

        const filtre = { _id: req.params.userID }
        const update = { $set: { "tachespossibles.$[elem]": tableau2 } }
        const options = { arrayFilters: [{ "elem": tableau1 }], new: true }

        await ModeleUtilisateur.findOneAndUpdate(
            filtre,
            update,
            options
        )
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ message2: err })
    }
}