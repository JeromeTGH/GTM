const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction addTask dans API
module.exports.addTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    try {
        const tableau = [req.body.libelle, req.body.description]

        const utilisateurMisAjour = await ModeleUtilisateur.findByIdAndUpdate(
            req.params.userID,
            { $addToSet: { tachespossibles: tableau } },
            { new: true }
        )

        if (!utilisateurMisAjour)
            res.status(400).json({ "erreur": `L'ID=${req.params.userID} ne correspond à aucun utilisateur en base (correspond à autre chose ou à un utilisateur supprimé)` })
        else
            res.status(200).json(utilisateurMisAjour)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction removeTask dans API
module.exports.removeTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })


    try {
        const tableau = [req.body.libelle, req.body.description]

        const utilisateurSupprime = await ModeleUtilisateur.findByIdAndUpdate(
            req.params.userID,
            { $pull: { tachespossibles: tableau } },
            { new: true }
        )

        if (!utilisateurSupprime)
            res.status(400).json({ "erreur": `L'ID=${req.params.userID} ne correspond à aucun utilisateur en base (correspond à autre chose ou à un utilisateur supprimé)` })
        else
            res.status(200).json(utilisateurSupprime)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction updateTask dans API
module.exports.updateTask = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    if (req.body.old_libelle === undefined)
        return res.status(400).json({ "erreur": `Paramètre 'old_libelle' manquant …` })
    if (req.body.old_description === undefined)
        return res.status(400).send({ "erreur": `Paramètre 'old_description' manquant …` })
    if (req.body.new_libelle === undefined)
        return res.status(400).send({ "erreur": `Paramètre 'new_libelle' manquant …` })
    if (req.body.new_description === undefined)
        return res.status(400).send({ "erreur": `Paramètre 'new_description' manquant …` })

    try {
        const tableau1 = [req.body.old_libelle, req.body.old_description]
        const tableau2 = [req.body.new_libelle, req.body.new_description]

        const filtre = { _id: req.params.userID }
        const update = { $set: { "tachespossibles.$[elem]": tableau2 } }
        const options = { arrayFilters: [{ "elem": tableau1 }], new: true }

        const utilisateurMisAjour = await ModeleUtilisateur.findOneAndUpdate(
            filtre,
            update,
            options
        )

        if (!utilisateurMisAjour)
            res.status(400).json({ "erreur": `L'ID=${req.params.userID} ne correspond à aucun utilisateur en base (correspond à autre chose ou à un utilisateur supprimé)` })
        else
            res.status(200).json(utilisateurMisAjour)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}