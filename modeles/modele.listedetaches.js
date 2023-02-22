const mongoose = require('mongoose')

const schemaListeDeTaches = new mongoose.Schema(
    {
        IDutilisateur: {
            type: String,
            required: true
        },
        tachesAfaire: {
            type: [
                {
                    libelleTache: {
                        type: String
                    },
                    descriptionTache: {
                        type: String
                    },
                    bTacheAccomplie: {
                        type: Boolean
                    }
                }
            ]
        },
        libelleMoisAnnee: {
            type: String
        },
        timestampCloture: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

// Enregistrement
const ModeleListeDeTaches = mongoose.model('listedetache', schemaListeDeTaches)
module.exports = ModeleListeDeTaches
