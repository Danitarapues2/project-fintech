const facturaCtl = {}


const orm = require('../database/dataBase.orm')
const sql = require('../database/dataBase.sql')



facturaCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from facturas')
    res.render('factura/lista', { lista })
}

module.exports = facturaCtl