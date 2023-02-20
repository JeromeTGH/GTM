const jwt = require('jsonwebtoken')
const ModeleUtilisateur = require('../modeles/modele.utilisateur')

module.exports.recupInfosUserSiBienConnecte = (req, res, next) => {
    const token = req.cookies.cookieJetonJWT

    if (token) {
        // Tout d'abord, on vérifie que le cookie qu'on lit ne contient pas un "faux" token (c'est à dire : le bon cookie, mais avec un mauvais ID encodé dedans)
        jwt.verify(token, process.env.CLEF_SECRETE, async (err, data) => {
            if (err) {
                res.locals.user = null
                res.cookie('cookieJetonJWT', '', { maxAge: 1 })     // Effacement de ce cookie "corrompu", car le contenu intérieur n'est pas le bon
                next()
            } else {
                const utilisateur = await ModeleUtilisateur.findById(data.id)       // Ici, data vaudra la valeur du token , qui est en fait un objet contenant
                if (utilisateur) {                                                  // un champ "id", avec l'ID de l'utilisateur à présent décodé dedans
                    res.locals.user = utilisateur
                } else {
                    res.locals.user = null
                }
                console.log(res.locals.user)
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports.requiertUneAuthentificationPourContinuer = (req, res, next) => {
    const token = req.cookies.cookieJetonJWT

    if (token) {
        // Tout d'abord, on vérifie que le cookie qu'on lit ne contient pas un "faux" token (c'est à dire : le bon cookie, mais avec un mauvais ID encodé dedans)
        jwt.verify(token, process.env.CLEF_SECRETE, async (err, data) => {
            if (err) {
                console.log(err);
                // Nota : aucun NEXT ici (car si le cookie est corrompu, c'est qu'il ne faut pas aller plus loin)
                res.locals.user = null
                res.cookie('cookieJetonJWT', '', { maxAge: 1 })     // Effacement de ce cookie "corrompu", car le contenu intérieur n'est pas le bon
                next()
            } else {
                const utilisateur = await ModeleUtilisateur.findById(data.id)       // Ici, data vaudra la valeur du token , qui est en fait un objet contenant
                if (utilisateur) {                                                  // un champ "id", avec l'ID de l'utilisateur à présent décodé dedans
                    res.locals.user = utilisateur
                } else {
                    res.locals.user = null
                }
                console.log(res.locals.user)
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}