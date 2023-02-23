const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const jwt = require('jsonwebtoken')
const delaiExpirationCookie = 3 * 24 * 3600 * 1000      // On est en millisecondes ; là, 3 * 24 * 3600 * 1000 équivaut à 3 jours, en fait

const bcrypt = require('bcrypt')
const { erreurCreationNouvelUtilisateur, erreurDeConnexion } = require('../utils/erreurs.utils')

// Fonction creerUnTokenDepuis(), pour créer un jeton depuis l'id de l'utilisateur
const creerUnTokenDepuis = (id) => {
    return jwt.sign({ id }, process.env.CLEF_SECRETE, {
        expiresIn: delaiExpirationCookie                // En fait, le token sera égal à un objet, contenant entre autre chose
    })                                                  // un champ "id", avec l'ID de l'utilisateur encodé dedans
}

// Ajout fonction createUser dans API
module.exports.createUser = async (req, res) => {
    try {
        // Renseignement d'un modèle utilisateur
        const nouvelUtilisateur = new ModeleUtilisateur({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password
        })

        // Enregistrement en base (et récupération des infos, complétées avec l'id et autre)
        const utilisateurCreeEnBase = await ModeleUtilisateur.create(nouvelUtilisateur)

        res.status(201).json({ idNouvelUtilisateur: utilisateurCreeEnBase._id })
    }
    catch (err) {
        const messagesErreur = erreurCreationNouvelUtilisateur(err)
        res.status(400).json(messagesErreur)
    }
}

// Ajout fonction login dans API
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const utilisateur = await ModeleUtilisateur.findOne({ email: email }).select('password')

        if (utilisateur) {
            const auth = await bcrypt.compare(password, utilisateur.password)

            if (auth) {
                const token = creerUnTokenDepuis(utilisateur._id)
                res.cookie('cookieJetonJWT', token, { httpOnly: true, maxAge: delaiExpirationCookie })
                res.status(200).json({ connexion: "reussie", idUtilisateur: utilisateur._id })
            } else {
                throw new Error("Password incorrect, désolé …")
            }

        } else {
            throw new Error("Email incorrect, désolé …")
        }
    }
    catch (err) {
        const messagesErreur = erreurDeConnexion(err)
        console.log(err);
        res.status(400).json(messagesErreur)
    }
}

// Ajout fonction logout dans API
module.exports.logout = async (req, res) => {
    try {
        res.cookie('cookieJetonJWT', '', { maxAge: 1 })     // Fin du cookie 1 milliseconde plus tard, donc
        res.status(200).json({ deconnexion: "reussie" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// Ajout fonction getUserIdSiCookieJwtConforme dans API
module.exports.getUserIdSiCookieJwtConforme = (req, res) => {
    const token = req.cookies.cookieJetonJWT

    if (token) {
        // Tout d'abord, on vérifie que le cookie qu'on lit ne contient pas, après décodage, un mauvais ID à l'intérieur
        // (pour parer toute éventuelle tentative de hack, en ce sens)
        jwt.verify(token, process.env.CLEF_SECRETE, async (err, data) => {
            if (err) {
                res.status(200).send("0")                   // Si l'ID est incorrect, par rapport à celui attendu, on revoit simplement "0"
            } else {
                res.status(200).send(res.locals.user._id)
            }
        })
    } else {
        res.status(200).send("0")                           // Si le cookie est absent, on revoit "0" là aussi, pour signifier l'absence d'ID trouvé
    }
}