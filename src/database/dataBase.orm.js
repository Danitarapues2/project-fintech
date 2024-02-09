const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
	sequelize = new Sequelize(MYSQL_URI);
} else {
	// Configuración para parámetros individuales
	sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
		host: MYSQLHOST,
		port: MYSQLPORT,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 1,
			acquire: 30000,
			idle: 10000
		}
	});
}

// Autenticar y sincronizar
sequelize.authenticate()
	.then(() => {
		console.log("Conexión establecida con la base de datos");
	})
	.catch((err) => {
		console.error("No se pudo conectar a la base de datos:", err.message);
	});

sequelize.sync({ force: false })
	.then(() => {
		console.log("Tablas sincronizadas");
	})
	.catch((err) => {
		console.error("Error al sincronizar las tablas:", err.message);
	});


const usuarioModel = require('../models/usuario');
const tiendaModel = require('../models/tienda');
const clienteModel = require('../models/cliente');
const facturaModel = require('../models/factura');
const formaPagoModel = require('../models/forma_pago');
const detalleFacturaModel = require("../models/detalle_factura");
const detalleTotalModel = require("../models/detalle_total");

//sincronia

const usuario = usuarioModel(sequelize, Sequelize)
const tienda = tiendaModel(sequelize, Sequelize)
const cliente = clienteModel(sequelize, Sequelize)
const factura = facturaModel(sequelize, Sequelize)
const forma_pago = formaPagoModel(sequelize, Sequelize)
const detalle_factura = detalleFacturaModel(sequelize, Sequelize)
const detalle_total = detalleTotalModel(sequelize, Sequelize)


//relacion tienda-dueño
usuario.hasMany(tienda)
tienda.belongsTo(usuario)

//relacion tienda-factura
tienda.hasMany(factura)
factura.belongsTo(tienda)

//relacion factura-cliente
cliente.hasMany(factura)
factura.belongsTo(cliente)

//relacion factura-forma_pago
forma_pago.hasMany(factura)
factura.belongsTo(forma_pago)

//relacion detalle_factura-factura
factura.hasMany(detalle_factura)
detalle_factura.belongsTo(factura)

//relacion factura-detalle_total
detalle_total.hasMany(factura)
factura.belongsTo(detalle_total)



module.exports = {
	usuario,
	tienda,
	factura,
	forma_pago,
	cliente,
	detalle_factura,
	detalle_total,
};



