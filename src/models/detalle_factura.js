const detalle_factura=(sequelize,type)=>{
    return sequelize.define('detalle_facturas',{
        id_detalle_factura:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        descripcion: type.STRING,
        cantidad: type.INTEGER,
        precio_unitario: type.STRING,
        precio_total: type.STRING,


        crearDetalleFactura:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarDetalleFactura:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps:false,
    });
}
module.exports = detalle_factura