const express = require("express");

const router = express.Router();
const { mostrar, mandar, listarCliente, actualizar, eliminar, traer} = require("../controller/cliente.controller");


router.get('/agregar/:id_tienda',mostrar);
router.post('/agregar/:id_tienda',mandar)
router.get('/listar',listarCliente)
router.get('/editar/:id',traer)
router.post('/editar/:id',actualizar)
router.get('/eliminar/:id',eliminar)

module.exports = router;