const express = require('express');
const rutas = express.Router()

const { lista } = require ('../controller/factura.controller')
const { isLoggedIn } = require('../lib/auth')

// rutas.get('/factura/agregar/:id', isLoggedIn, mostrar)

rutas.get('/facturas/:tiendaIdTienda',isLoggedIn, lista)

module.exports = rutas 


