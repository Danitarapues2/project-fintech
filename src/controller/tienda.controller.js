const tiendaCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')

tiendaCtl.mostrar = (req, res) => {
    res.render('tienda/agregar', { showNavbar: true });
}

//mandar
tiendaCtl.mandar = async (req, res) => {
    const id =req.id_tienda  //ojo
    const { nombre_tienda,ruc_tienda,direccion_cliente,direccion_matriz,direccion_sucursal,correo_electronico_tienda,telefono_tienda } = req.body
    const nuevoEnvio = {
        nombre_tienda,
        ruc_tienda,
        direccion_cliente,
        direccion_matriz,
        direccion_sucursal,
        correo_electronico_tienda,
        telefono_tienda
 
    }
    await orm.tienda.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/tienda/listar/')
}

tiendaCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from tiendas')
    res.render('tienda/listar', { lista, showNavbar: true })
}

//traer datos
tiendaCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from tiendas where id_tienda =?', [ids])
    res.render('tienda/editar',{ lista, showNavbar: true })
}

tiendaCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const {nombre_tienda,ruc_tienda,direccion_cliente,direccion_matriz,direccion_sucursal,correo_electronico_tienda,telefono_tienda } = req.body
    const nuevoEnvio = {
        nombre_tienda,
        ruc_tienda,
        direccion_cliente,
        direccion_matriz,
        direccion_sucursal,
        correo_electronico_tienda,
        telefono_tienda
    }
    await orm.tienda.findOne({ where: { id_tienda: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/tienda/listar/');
}
tiendaCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.tienda.destroy({ where: { id_tienda: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/tienda/listar/');
        })
}

module.exports = tiendaCtl