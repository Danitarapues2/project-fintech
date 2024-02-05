const tiendaCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')

tiendaCtl.mostrar = (req, res) => {
    res.render('tienda/agregar', { showNavbar: true });
}

//mandar una sola vez 
let tiendaRegistrada = false;

tiendaCtl.mandar = async (req, res) => {
    if (!tiendaRegistrada) {
        const id = req.id_tienda;  // Asumiendo que id_tienda está definido en req
        const { nombre_tienda, ruc_tienda, direccion_matriz, direccion_sucursal, correo_electronico_tienda, telefono_tienda } = req.body;

        const nuevaTienda = {
            nombre_tienda,
            ruc_tienda,
            direccion_matriz,
            direccion_sucursal,
            correo_electronico_tienda,
            telefono_tienda
        };

        try {
            await orm.tienda.create(nuevaTienda);
            req.flash('success', 'Guardado exitosamente');
            tiendaRegistrada = true; // Marcar como registrada
            res.redirect('/tienda/listar/');
        } catch (error) {
            console.error("Error al intentar registrar la tienda:", error);
            req.flash('error', 'Error al intentar registrar la tienda');
            res.redirect('/tienda/listar/');
        }
    } else {
        console.log("La tienda ya ha sido registrada anteriormente.");
        req.flash('info', 'La tienda ya ha sido registrada anteriormente.');
        res.redirect('/tienda/listar/');
    }
};

tiendaCtl.listar = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from tiendas where id_tienda =1' , [ids])
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
    const {nombre_tienda,ruc_tienda,direccion_matriz,direccion_sucursal,correo_electronico_tienda,telefono_tienda } = req.body
    const nuevoEnvio = {
        nombre_tienda,
        ruc_tienda,
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