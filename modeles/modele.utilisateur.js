const mongoose = require('mongoose')
const { isEmail } = require('validator')

const schemaUtilisateur = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 64,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
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

const ModeleUtilisateur = mongoose.model('utilisateur', schemaUtilisateur)
module.exports = ModeleUtilisateur
