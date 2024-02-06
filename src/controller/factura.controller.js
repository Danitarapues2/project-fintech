const facturaCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')

facturaCtl.mostrar = (req, res) => {
    res.render('factura/agregar', { showNavbar: true });
}
facturaCtl.mostrarhistorial = (req, res) => {
    res.render('factura/historial', { showNavbar: true });
}
 ////
 facturaCtl.mandar = async (req, res) => {
    try {
        // Obtener la lista de clientes desde la base de datos
        const clientes = await orm.cliente.findAll();

        // Renderizar la vista con la lista de clientes
        res.render('/cliente/listar/', { clientes });
    } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
        req.flash('error', 'Error al obtener la lista de clientes');
        res.redirect('/factura/listar/');
    }
};

// En la vista 'formularioFactura', puedes mostrar la lista de clientes en un formulario y permitir que el usuario elija uno.

// Después de que el usuario haya seleccionado un cliente en el formulario, puedes manejar la creación de la factura con el cliente seleccionado.
facturaCtl.crearFactura = async (req, res) => {
    const idClienteSeleccionado = req.body.id_cliente; // asumiendo que el formulario tiene un campo llamado 'id_cliente'

    const { fecha_emision, descripcion, cantidad, precio_unitario, precio_total, impuesto_12, impuesto_0, descuento, valor_subtotal, valor_iva, valor_total } = req.body;

    const nuevoEnvio = {
        fecha_emision,
        descripcion,
        cantidad,
        precio_unitario,
        precio_total,
        impuesto_12,
        impuesto_0,
        descuento,
        valor_subtotal,
        valor_iva,
        valor_total,
        id_cliente: idClienteSeleccionado
    };

    try {
        await orm.factura.create(nuevoEnvio);
        await orm.detalle_factura.create(nuevoEnvio);
        await orm.detalle_total.create(nuevoEnvio);

        req.flash('success', 'Factura creada exitosamente');
        res.redirect('/factura/listar/');
    } catch (error) {
        console.error("Error al crear la factura:", error);
        req.flash('error', 'Error al crear la factura');
        res.redirect('/factura/listar/');
    }
};



//mandar
facturaCtl.mandar = async (req, res) => {
    const id =req.id_cliente  //ojo
    const { fecha_emision,descripcion,cantidad,precio_unitario,precio_total,impuesto_12,impuesto_0, descuento,valor_subtotal, valor_iva, valor_total } = req.body
    const nuevoEnvio = {
        fecha_emision,
        descripcion,
        cantidad,
        precio_unitario,
        precio_total,
        impuesto_12,
        impuesto_0,
        descuento,
        valor_subtotal,
        valor_iva,
        valor_total
    }
    await orm.factura.create(nuevoEnvio)
    await orm.detalle_factura.create(nuevoEnvio)
    await orm.detalle_total.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/factura/listar/')
}

facturaCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM facturas INNER JOIN detalle_facturas ON facturas.id_factura = detalle_facturas.id_detalle_factura ');
    res.render('factura/listar', { lista ,showNavbar: true })
}



module.exports = facturaCtl