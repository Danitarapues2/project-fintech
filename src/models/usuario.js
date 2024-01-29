const usuario = (sequelize,type)=>{
    return sequelize.define('usuarios',{
        id_usuario:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },

        cedula_usuario:type.STRING,
        nombres_usuario:type.STRING,
        apellidos_usuario:type.STRING,
        celular_usuario:type.STRING,
        correo_electronico_usuario:type.STRING,
        password_usuario: type.STRING,

        crearUsuario:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarUsuario:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps:false,
    });

}

module.exports = usuario