const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const schemaUtilisateur = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 64
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            max: 256
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
