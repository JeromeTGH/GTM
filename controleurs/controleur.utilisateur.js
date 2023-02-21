const { off } = require('../modeles/modele.utilisateur')
const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction getAll dans API
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

// Ajout fonction getOne dans API
module.exports.getOne = (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    ModeleUtilisateur.findById(req.params.userID, (err, data) => {
        if (!err) res.status(200).json(data)
        if (err) res.status(500).json({ err })
    }).select(['-password', '-email'])
}


// Ajout fonction updateOne dans API
module.exports.updateOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    if (req.body.pseudo === undefined)
        return res.status(400).send(`Paramètre "pseudo" manquant …`)

    try {
        const filtre = { _id: req.params.userID }
        const update = { pseudo: req.body.pseudo }

        await ModeleUtilisateur.findOneAndUpdate(filtre, update, { new: true })     // Pour retourner l'élément APRÈS avoir fait l'update
            .select(['-password', '-email'])
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
            .select(['-password', '-email'])
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
            .select(['-password', '-email'])
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
            .select(['-password', '-email'])
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({ err }))
    }
    catch (err) {
        res.status(500).json({ message2: err })
    }
}