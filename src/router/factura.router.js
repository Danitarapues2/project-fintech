const express = require("express");

const router = express.Router();
const { mostrar, mandar, listar, mostrarhistorial} = require("../controller/factura.controller");


router.get('/agregar',mostrar);
router.post('/agregar',mandar)
router.get('/listar',listar)
router.get('/listar',listar)
router.get('/historial',mostrarhistorial)


module.exports = router
