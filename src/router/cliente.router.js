const express = require("express");
const router = express.Router();
const {mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/cliente.controller");


router.get('/agregar/:id', mostrar);
router.post('/agregar/:id', mandar)
router.get('/listar/:id', listar)
router.get('/editar/:id', traer)
router.post('/editar/:id', actualizar)
router.get('/eliminar/:id', eliminar)
module.exports = router;