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
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    try {
        const utilisateur = await ModeleUtilisateur.findById(req.params.userID)
        if (!utilisateur)
            res.status(400).json({ "erreur": `L'ID=${req.params.userID} ne correspond à aucun utilisateur en base (correspond à autre chose ou à un utilisateur supprimé)` })
        else
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
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    if (req.body.pseudo === undefined && req.body.estActif === undefined)
        return res.status(400).json({ "erreur": `Paramètre "pseudo" et/ou "estActif" manquant …` })

    const champsAmettreAjour = {}                                   // Structure permettant de rendre optionnel l'un ou l'autre de ces paramètres,
    if (req.body.pseudo !== undefined)                              // sans toutefois écraser les données existantes en base (si champ non ciblé)
        champsAmettreAjour['pseudo'] = req.body.pseudo
    if (req.body.estActif !== undefined)
        champsAmettreAjour['estActif'] = req.body.estActif

    try {
        const utilisateurMisAjour = await ModeleUtilisateur.findByIdAndUpdate(req.params.userID, champsAmettreAjour, { new: true, runValidators: true })
        // {new: true} : pour retourner l'élément APRÈS avoir fait l'update
        if (!utilisateurMisAjour)
            res.status(400).json({ "erreur": `La mise à jour de l'utilisateur a renvoyé une valeur nulle, et n'a donc pu se faire (vérifier si le userID envoyé est bon, par exemple)` })
        else
            res.status(200).json(utilisateurMisAjour)
    }
    catch (err) {
        console.log(err)
        res.status(200).json(err)			// Status 200 aulieu de 500, pour être traité "plus facilement", côté axios
    }
}

// Ajout fonction deleteOne dans API
module.exports.deleteOne = async (req, res) => {
    if (!ObjectID.isValid(req.params.userID))
        return res.status(400).json({ "erreur": `ID=${req.params.userID} non trouvé en base, donc impossible de trouver l'utilisateur correspondant` })

    try {
        const utilisateur = await ModeleUtilisateur.findByIdAndRemove(req.params.userID)
        // Le contenu de l'utilisateur est retourné cette fois encore, mais il est désormais bien supprimé en base
        // (si on réappelle cette fonction API, la valeur null sera alors retournée, prouvant que l'utilisateur a bien été supprimé)
        if (!utilisateur)
            res.status(400).json({ "erreur": `La suppression de l'utilisateur a renvoyé une valeur nulle, et n'a donc pu se faire (vérifier si la suppression n'a pas déjà été faite, et si l'ID est bien celui d'un utilisateur existant)` })
        else
            res.status(200).json(utilisateur)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
