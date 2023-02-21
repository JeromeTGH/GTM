module.exports.erreurCreationNouvelUtilisateur = (err) => {
    let tableauErreurs = { pseudo: '', email: '', password: '' }

    if (err.code) {
        if (err.code === 11000 && err.message.includes('email')) {
            tableauErreurs.email = `Cet email est déjà pris, désolé. Veuillez en choisir un autre, svp !`
        } else {
            tableauErreurs.pseudo = `Erreur inconnue (code = ${err.code})`
            tableauErreurs.email = `Erreur inconnue (code = ${err.code})`
            tableauErreurs.password = `Erreur inconnue (code = ${err.code})`
        }
    }

    if (err.errors) {
        if (err.errors.pseudo) {
            if (err.errors.pseudo.properties.type === 'minlength')
                tableauErreurs.pseudo = `Le pseudo choisi n'est pas suffisament long (minimum = ${err.errors.pseudo.properties.minlength} caractères)`
            if (err.errors.pseudo.properties.type === 'maxlength')
                tableauErreurs.pseudo = `Le pseudo choisi est trop long (maximum = ${err.errors.pseudo.properties.maxlength} caractères)`
        }
        if (err.errors.password) {
            if (err.errors.password.properties.type === 'minlength')
                tableauErreurs.password = `Le password choisi n'est pas suffisament long (minimum = ${err.errors.password.properties.minlength} caractères)`
            if (err.errors.password.properties.type === 'maxlength')
                tableauErreurs.password = `Le password choisi est trop long (maximum = ${err.errors.password.properties.maxlength} caractères)`
        }
        if (err.errors.email) {
            if (err.errors.email.properties.type === 'maxlength')
                tableauErreurs.email = `L'email choisi est trop long (maximum = ${err.errors.email.properties.maxlength} caractères)`
        }
    }

    return tableauErreurs
}