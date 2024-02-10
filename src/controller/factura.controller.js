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
    try {
        const lista = await sql.query(`
            SELECT  
                id_tienda AS id, 
                nombre_tienda AS nombre, 
                ruc_tienda AS ruc, 
                direccion_matriz AS direccion, 
                correo_electronico_tienda AS correo, 
                telefono_tienda AS telefono, 
                '' AS descripcion, 
                NULL AS cantidad, 
                NULL AS precio_unitario, 
                NULL AS nombre_cliente, 
                NULL AS apellido_cliente, 
                NULL AS direccion_cliente, 
                NULL AS correo_cliente, 
                NULL AS celular_cliente, 
                NULL AS cedula_cliente, 
                NULL AS impuesto_12, 
                NULL AS impuesto_0, 
                NULL AS descuento, 
                NULL AS valor_subtotal, 
                NULL AS valor_iva, 
                NULL AS valor_total, 
                NULL AS fecha_emision 
            FROM  
                tiendas 
            
            UNION 
            
            SELECT  
                NULL AS id, 
                '' AS nombre, 
                '' AS ruc, 
                '' AS direccion, 
                '' AS correo, 
                '' AS telefono, 
                descripcion, 
                cantidad, 
                precio_unitario, 
                NULL AS nombre_cliente, 
                NULL AS apellido_cliente, 
                NULL AS direccion_cliente, 
                NULL AS correo_cliente, 
                NULL AS celular_cliente, 
                NULL AS cedula_cliente, 
                NULL AS impuesto_12, 
                NULL AS impuesto_0, 
                NULL AS descuento, 
                NULL AS valor_subtotal, 
                NULL AS valor_iva, 
                NULL AS valor_total, 
                NULL AS fecha_emision 
            FROM  
                detalle_facturas 
            
            UNION 
            
            SELECT  
                NULL AS id, 
                '' AS nombre, 
                '' AS ruc, 
                '' AS direccion, 
                '' AS correo, 
                '' AS telefono, 
                NULL AS descripcion, 
                NULL AS cantidad, 
                NULL AS precio_unitario, 
                nombre_cliente, 
                apellido_cliente, 
                direccion_cliente, 
                correo_cliente, 
                celular_cliente, 
                cedula_cliente, 
                NULL AS impuesto_12, 
                NULL AS impuesto_0, 
                NULL AS descuento, 
                NULL AS valor_subtotal, 
                NULL AS valor_iva, 
                NULL AS valor_total, 
                NULL AS fecha_emision 
            FROM  
                clientes 
            
            UNION 
            
            SELECT  
                NULL AS id, 
                '' AS nombre, 
                '' AS ruc, 
                '' AS direccion, 
                '' AS correo, 
                '' AS telefono, 
                NULL AS descripcion, 
                NULL AS cantidad, 
                NULL AS precio_unitario, 
                NULL AS nombre_cliente, 
                NULL AS apellido_cliente, 
                NULL AS direccion_cliente, 
                NULL AS correo_cliente, 
                NULL AS celular_cliente, 
                NULL AS cedula_cliente, 
                impuesto_12, 
                impuesto_0, 
                descuento, 
                valor_subtotal, 
                valor_iva, 
                valor_total, 
                NULL AS fecha_emision 
            FROM  
                detalle_totals 
            
            UNION 
            
            SELECT  
                NULL AS id, 
                '' AS nombre, 
                '' AS ruc, 
                '' AS direccion, 
                '' AS correo, 
                '' AS telefono, 
                NULL AS descripcion, 
                NULL AS cantidad, 
                NULL AS precio_unitario, 
                NULL AS nombre_cliente, 
                NULL AS apellido_cliente, 
                NULL AS direccion_cliente, 
                NULL AS correo_cliente, 
                NULL AS celular_cliente, 
                NULL AS cedula_cliente, 
                NULL AS impuesto_12, 
                NULL AS impuesto_0, 
                NULL AS descuento, 
                NULL AS valor_subtotal, 
                NULL AS valor_iva, 
                NULL AS valor_total, 
                fecha_emision 
            FROM  
                facturas
        `);
        res.render('factura/listar', { lista, showNavbar: true });
    } catch (error) {
        console.error("Error al obtener la lista de facturas :", error);
        // Manejo del error aquí
    }
}




module.exports = facturaCtl
