const ModeleUtilisateur = require('../modeles/modele.utilisateur')
const jwt = require('jsonwebtoken')

const delaiExpirationCookie = 3 * 24 * 3600 * 1000      // On est en millisecondes ; là, 3 * 24 * 3600 * 1000 équivaut à 3 jours, en fait

// Fonction creerUnTokenDepuis(), pour créer un jeton depuis l'id de l'utilisateur
const creerUnTokenDepuis = (id) => {
    return jwt.sign({ id }, process.env.CLEF_SECRETE, {
        expiresIn: delaiExpirationCookie                // En fait, le token sera égal à un objet, contenant entre autre chose
    })                                                  // un champ "id", avec l'ID de l'utilisateur encodé dedans
}

// Ajout fonction inscription dans API
module.exports.inscription = async (req, res) => {
    try {
        const pseudo = req.body.pseudo
        const email = req.body.email
        const password = req.body.password

        const nouvelUtilisateur = await ModeleUtilisateur.create(
            {
                pseudo: pseudo,
                email: email,
                password: password
            }
        )

        res.status(201).json({ idNouvelUtilisateur: nouvelUtilisateur._id })
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// Ajout fonction login dans API
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const utilisateur = await ModeleUtilisateur.login(email, password)
        const token = creerUnTokenDepuis(utilisateur._id)

        res.cookie('cookieJetonJWT', token, { httpOnly: true, maxAge: delaiExpirationCookie })
        res.status(200).json({ connexion: "reussie", idUtilisateur: utilisateur._id })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ erreur: err })
    }
}

// Ajout fonction logout dans API
module.exports.logout = async (req, res) => {
    try {
        res.cookie('cookieJetonJWT', '', { maxAge: 1 })     // Fin du cookie 1 milliseconde plus tard, donc
        res.status(200).json({ deconnexion: "reussie" })
    }
    catch (err) {
        res.status(400).json(err)
    }
}