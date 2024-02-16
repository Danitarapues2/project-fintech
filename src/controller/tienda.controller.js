const tiendaCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

tiendaCtl.mostrar = async(req, res) => {
    const list = await sql.query('select max (id_tienda) as maximo  from tiendas')
    res.render('tienda/agregar',{list,showNavbar: true });
}

//mandar
tiendaCtl.mandarTienda = async (req, res) => {
    const id =req.id_tienda  //ojo
    const { nombre_tienda, ruc_tienda, direccion_matriz, direccion_sucursal, correo_electronico_tienda, telefono_tienda,numero} = req.body
    const nuevoEnvio = {
        nombre_tienda,
        ruc_tienda,
        direccion_matriz,
        direccion_sucursal,
        correo_electronico_tienda,
        telefono_tienda
    }

    const nuevoEnvio1 =  {
        tiendaIdTienda: numero
    }
    
    await orm.tienda.create(nuevoEnvio)
    console.log=(nuevoEnvio1)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/tienda/listar/')
}

tiendaCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from tiendas')
    res.render('tienda/listar', { lista, showNavbar: true  })
}

//traer datos
tiendaCtl.traer = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from tiendas where id_tienda =?', [id])
    res.render('tienda/editar', { lista,showNavbar: true  })
}

//traer datos
tiendaCtl.listarUnaTienda = async (req, res) => {
}

tiendaCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { nombre_tienda, ruc_tienda, direccion_matriz, direccion_sucursal, correo_electronico_tienda, telefono_tienda } = req.body
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


module.exports = tiendaCtl