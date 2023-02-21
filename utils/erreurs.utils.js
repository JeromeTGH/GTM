module.exports.erreurCreationNouvelUtilisateur = (err) => {
    let tableauErreurs = { pseudo: '', email: '', password: '' }

    if (err.code) {
        if (err.code === 11000 && err.keyValue.email) {
            tableauErreurs.email = `Cet email est déjà pris, désolé. Veuillez en choisir un autre, merci !`
        } else {
            tableauErreurs.pseudo = `Erreur inconnue (code = ${err.code})`
            tableauErreurs.email = `Erreur inconnue (code = ${err.code})`
            tableauErreurs.password = `Erreur inconnue (code = ${err.code})`
        }
    } else if (err.errors) {
        if (err.errors.pseudo) {
            if (err.errors.pseudo.properties.type === 'minlength')
                tableauErreurs.pseudo = `Le pseudo choisi n'est pas suffisament long (minimum = ${err.errors.pseudo.properties.minlength} caractères)`
            if (err.errors.pseudo.properties.type === 'maxlength')
                tableauErreurs.pseudo = `Le pseudo choisi est trop long (maximum = ${err.errors.pseudo.properties.maxlength} caractères)`
        } else if (err.errors.password) {
            if (err.errors.password.properties.type === 'minlength')
                tableauErreurs.password = `Le password choisi n'est pas suffisament long (minimum = ${err.errors.password.properties.minlength} caractères)`
            if (err.errors.password.properties.type === 'maxlength')
                tableauErreurs.password = `Le password choisi est trop long (maximum = ${err.errors.password.properties.maxlength} caractères)`
        } else if (err.errors.email) {
            if (err.errors.email.properties.type === 'maxlength')
                tableauErreurs.email = `L'email choisi est trop long (maximum = ${err.errors.email.properties.maxlength} caractères)`
        } else {
            tableauErreurs.pseudo = `Autre erreur (postCreateUser)`
            tableauErreurs.email = `Autre erreur (postCreateUser)`
            tableauErreurs.password = `Autre erreur (postCreateUser)`
        }
    } else {
        tableauErreurs.pseudo = `Autre erreur (postCreateUser)`
        tableauErreurs.email = `Autre erreur (postCreateUser)`
        tableauErreurs.password = `Autre erreur (postCreateUser)`
    }

    return tableauErreurs
}


module.exports.erreurDeConnexion = (err) => {
    let tableauErreurs = { email: 'Autre erreur (postLogin)', password: 'Autre erreur (postLogin)' }

    if (err.message.toLowerCase().includes('email')) {
        tableauErreurs.email = 'Email inconnu'
        tableauErreurs.password = ''
    }

    if (err.message.toLowerCase().includes('password')) {
        tableauErreurs.email = ''
        tableauErreurs.password = 'Mot de passe invalide'
    }

    return tableauErreurs
}