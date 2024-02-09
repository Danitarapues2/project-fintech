const forma_pagoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

forma_pagoCtl.mostrar = async(req, res) => {
    const list = await sql.query('select max (id_forma_pago) as maximo  from forma_pagos')
    res.render('forma_pago/agregar',{list});
}

//mandar
forma_pagoCtl.mandar = async (req, res) => {
    const id =req.id_forma_pago  //ojo
    const { nombre_forma_pago,estado,numero} = req.body
    const nuevoEnvio = {
        nombre_forma_pago,
        estado 
    }
    const nuevoEnvio1 =  {
        formaPagoIdFormaPago: numero
    }
    
    await orm.forma_pago.create(nuevoEnvio)
    await orm.factura.create(nuevoEnvio1)
    console.log=(nuevoEnvio1)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/forma_pago/listar/')
}

forma_pagoCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from forma_pagos')
    res.render('forma_pago/listar', { lista })
}

//traer datos
forma_pagoCtl.traer = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from forma_pagos where id_forma_pago =?', [id])
    res.render('forma_pago/editar', { lista })
}

forma_pagoCtl.actualizar = async (req, res) => {
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
    await orm.forma_pago.findOne({ where: { id_forma_pago: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/forma_pago/listar/');
}


module.exports = forma_pagoCtl