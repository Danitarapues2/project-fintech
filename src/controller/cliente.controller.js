const clienteCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')
const cliente = require('../models/cliente')

clienteCtl.mostrar = async (req, res) => {
    const list = await sql.query('select max (id_cliente) as maximo  from clientes')
    res.render('cliente/agregar', { list, showNavbar: true });
}

//mandar
clienteCtl.mandar = async (req, res) => {
    const id = req.id_cliente  //ojo
    const { nombre_cliente, apellido_cliente, direccion_cliente, correo_cliente, celular_cliente, cedula_cliente, numb } = req.body
    const nuevoEnvio = {
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        correo_cliente,
        celular_cliente,
        cedula_cliente

    }
    const nuevoEnvio1 = {
        clienteIdCliente: numb
    }
    await orm.cliente.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/cliente/listar/')
}

clienteCtl.listarUnCliente = async (req, res) => {
}


clienteCtl.listarCliente = async (req, res) => {
    const lista = await sql.query('select * from clientes')
    res.render('cliente/listar', { lista, showNavbar: true })
}


//traer datos
clienteCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from clientes where id_cliente =?', [ids])
    res.render('cliente/editar', { lista, showNavbar: true })
}

clienteCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { nombre_cliente, apellido_cliente, direccion_cliente, correo_cliente, celular_cliente, cedula_cliente } = req.body
    const nuevoEnvio = {
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        correo_cliente,
        celular_cliente,
        cedula_cliente
    }
    await orm.cliente.findOne({ where: { id_cliente: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/cliente/listar/');
}
clienteCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.cliente.destroy({ where: { id_cliente: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/cliente/listar/');
        })
}


module.exports = clienteCtl