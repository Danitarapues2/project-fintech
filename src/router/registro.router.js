const express = require('express');
const router = express.Router();

const { mostrarRegistro, Registro, mostrarLogin, Login, cierreSesion } = require ("../controller/registro.controller")

router.get("/registro", mostrarRegistro)
router.post("/registro", Registro)
router.get("/login", mostrarLogin)
router.post("/login", Login)
router.get("/CerrarSecion", cierreSesion)


module.exports = router