const express = require("express");
const router = express.Router()

const { mostrar, Mostrar} = require('../controller/principal.controller')

router.get('/principal', mostrar)
router.get('/agregar', Mostrar)

module.exports = router
