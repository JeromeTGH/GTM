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
            select: false,
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
        },
        listesDeTachesAfaire: {
            type: [
                {
                    tachesAfaire: {                             // Nota : lors de l'enregistrement, ce booléen est automatiquement transformé en string
                        type: [[String, String, Boolean]]       // (et impossible de trouver un moyen de rectifier cela, après recherches, tests, et essais)
                    },                                          // --> du coup, ce champ booléen aura une valeur de type string (en toute lettre : "true" ou "false")
                    libelleMoisAnnee: {
                        type: String,
                        unique: true
                    },
                    timestampCreation: {
                        type: Number
                    },
                    timestampCloture: {
                        type: Number
                    }
                }
            ]
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
