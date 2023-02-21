const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connexion MongoDB réussie !\n')
    })
    .catch((err) => {
        console.log('\n[ERREUR] Impossible de se connecteur à la base de données\n')
        console.log(err)
    })