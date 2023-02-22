const mongoose = require('mongoose')

const schemaListeDeTaches = new mongoose.Schema(
    {
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
            type: String,
            unique: true
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


/*,
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
       } */
