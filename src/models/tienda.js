const tienda=(sequelize,type)=>{
    return sequelize.define('tiendas',{
        id_tienda:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        nombre_tienda: type.STRING,
        ruc_tienda: type.STRING,
        dirección_matriz: type.STRING,
        direccion_sucursal: type.STRING,
        correo_electronico_tienda: type.STRING,
        telefono_tienda: type.STRING,

        crearTienda:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarTienda:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, { timestamps:false,

    });

}
module.exports = tienda