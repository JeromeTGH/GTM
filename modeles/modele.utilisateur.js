const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const schemaUtilisateur = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 64,
            trim: true              // Permet d'enlever les éventuels espaces avant et/ou après le contenu
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
            maxlength: 256,
            //select: false,	==> si on souhaite ne pas intégrer ce champ dans les réponses
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,           // 6 caractères minimum pour le mot de passe, avant encodage dans la BDD
            maxlength: 64,
            select: false,
            trim: true
        },
        estActif: {
            type: Boolean,
            required: true,
            default: true
        },
        tachespossibles: {
            type: [[String, String]]
        }
    },
    {
        timestamps: true
    }
)

// Pour cryter le mot de passe, avant qu'il soit enregistré (d'où le "pre" - "save") => après la table / avant le passage en "model"
schemaUtilisateur.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Enregistrement
const ModeleUtilisateur = mongoose.model('utilisateur', schemaUtilisateur)
module.exports = ModeleUtilisateur
