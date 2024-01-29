const forma_pago=(sequelize,type)=>{
    return sequelize.define('forma_pagos',{
        id_forma_pago:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },

        nombre_forma_pago: type.STRING,

        crearFormaPago:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarFormaPago:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, { timestamps:false,

    }
    
    );
   

}


module.exports = forma_pago

