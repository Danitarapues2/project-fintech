const visualizarCtl = {}
const sql = require('../database/dataBase.sql')
const orm = require('../database/dataBase.orm')


visualizarCtl.listar = async (req, res) => {
    const lista = await sql.query('SELECT * FROM usuarios INNER JOIN tiendas ON usuarios.id_usuario = tiendas.id_tienda');
    res.render('tienda/visualizar', { lista, showNavbar: true })
}


module.exports = visualizarCtl