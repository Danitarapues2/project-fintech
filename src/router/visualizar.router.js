const express = require("express");

const router = express.Router();
const {listar} = require("../controller/visualizar.controller");

router.get('/visualizar',listar)


module.exports = router;