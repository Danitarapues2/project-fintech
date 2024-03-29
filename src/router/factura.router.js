const express = require("express");

const router = express.Router();
const { mostrar, mandar, listar, mostrarhistorial} = require("../controller/factura.controller");
const { listarUnCliente } = require('../controller/cliente.controller.js')
const {listarUnaTienda} = require("../controller/visualizar.controller");

router.get('/agregar/:id', mostrar, listarUnCliente, listarUnaTienda);

router.get('/visualizar',listar)

router.post('/agregar/:id', mandar);

router.get('/listar/', listar); 

router.get('/historial', mostrarhistorial);


module.exports = router
