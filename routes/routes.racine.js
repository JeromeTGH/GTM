const routeur = require('express').Router()
const controleurAuth = require('../controleurs/controleur.auth')

routeur.get('/getUserIdSiCookieJwtConforme', controleurAuth.getUserIdSiCookieJwtConforme)

module.exports = routeur