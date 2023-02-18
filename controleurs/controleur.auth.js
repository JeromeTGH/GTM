const ModeleUtilisateur = require('../modeles/modele.utilisateur')

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
        res.status(200).json({ err })
    }
}