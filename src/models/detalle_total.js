const detalle_total=(sequelize,type)=>{
    return sequelize.define('detalle_totals',{
        id_detalle_total:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        
        base_imponible_12: type.STRING,
        base_imponible_0: type.STRING,
        descuento: type.STRING,
        valor_subtotal: type.STRING,
        valor_iva: type.STRING,
        valor_total: type.STRING,


        crearDetalleTotal:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarDetalleTotal:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps:false,
    });
}
module.exports = detalle_total