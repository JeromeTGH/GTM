const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const ObjectID = require('mongoose').Types.ObjectId

// Ajout fonction getAll dans API
module.exports.getAll = async (req, res) => {
    try {
        const utilisateurs = await ModeleUtilisateur.find()
        // dans les données retournées manquent les password et email (données "sensibles") ; celles-ci sont masquées par défaut, par choix, dans le modèle
        res.status(200).json(utilisateurs)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction getOne dans API
module.exports.getOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const utilisateur = await ModeleUtilisateur.findById(req.params.userID)
        res.status(200).json(utilisateur)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


// Ajout fonction updateOne dans API
module.exports.updateOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "err": `ID [${req.params.userID}] inconnu …` })

    if (req.body.pseudo === undefined && req.body.estActif === undefined)
        return res.status(400).json({ "err": `Paramètre "pseudo" et/ou "estActif" manquant …` })

    const champsAmettreAjour = {}
    if (req.body.pseudo !== undefined)
        champsAmettreAjour['pseudo'] = req.body.pseudo
    if (req.body.estActif !== undefined)
        champsAmettreAjour['estActif'] = req.body.estActif

    try {
        const utilisateurMisAjour = await ModeleUtilisateur.findByIdAndUpdate(req.params.userID, champsAmettreAjour, { new: true })
        // {new: true} : pour retourner l'élément APRÈS avoir fait l'update
        res.status(200).json(utilisateurMisAjour)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// Ajout fonction deleteOne dans API
module.exports.deleteOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).send(`ID [${req.params.userID}] inconnu …`)

    try {
        const utilisateur = await ModeleUtilisateur.findByIdAndRemove(req.params.userID)
        // Le contenu de l'utilisateur est retourné cette fois encore, mais il est désormais bien supprimé en base
        // (si on réappelle cette fonction API, la valeur null sera alors retournée, prouvant que l'utilisateur a bien été supprimé)
        res.status(200).json(utilisateur)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
