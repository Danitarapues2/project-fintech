const facturaCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')


facturaCtl.mostrar = async (req, res) => {
    
    //traer fk de id_detalle_total
    const list = await sql.query('SELECT max (id_detalle_total) as maximo FROM detalle_totals');

     //listar cliente segun id
    const ids = req.params.id
    const lista = await sql.query('select * from clientes where id_cliente =?', [ids])
    const fechaActual = new Date().toISOString().slice(0, 10);

    const listaT = await sql.query('select * from tiendas where id_tienda = 1')
    res.render('factura/agregar', { list, showNavbar: true, fechaActual: fechaActual,lista,listaT });

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
facturaCtl.mandar = async (req, res) => {
    const idClienteSeleccionado = req.body.id_cliente;

    try {
        const { impuesto_12, impuesto_0, descuento, valor_subtotal, valor_iva, valor_total, numero } = req.body;
        const nuevoEnvioTotal = {
            impuesto_12,
            impuesto_0,
            descuento,
            valor_subtotal,
            valor_iva,
            valor_total
        }
        await orm.detalle_total.create(nuevoEnvioTotal);

        const { fecha_emision } = req.body;
        const nuevoEnvioFactura = {
            fecha_emision,
            id_cliente: idClienteSeleccionado,
            detalleTotalIdDetalleTotal: numero
        }

        await orm.factura.create(nuevoEnvioFactura);


        const { descripcion, cantidad, precio_unitario, precio_total } = req.body;
        for (let i = 0; i < cantidad.length; i++) {
            const nuevoEnvioDetalle = {
                descripcion: descripcion[i],
                cantidad: cantidad[i],
                precio_unitario: precio_unitario[i],
                precio_total: precio_total[i]
            };
            await orm.detalle_factura.create(nuevoEnvioDetalle);
        }
        // Guardar los datos en la base de datos utilizando ORM

        // Aquí agregar más lógica para guardar los datos en otras tablas relacionadas.

        req.flash('success', 'Datos guardados exitosamente');
        res.redirect('/factura/listar/');
    } catch (error) {
        console.error("Error al guardar los datos:", error);
        req.flash('error', 'Error al guardar los datos');
        res.redirect('/factura/listar/');
    }
};

facturaCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM facturas INNER JOIN detalle_facturas ON facturas.id_factura = detalle_facturas.id_detalle_factura ');
    res.render('factura/listar', { lista, showNavbar: true })
}



module.exports = facturaCtl
