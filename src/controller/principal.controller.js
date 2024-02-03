const principal = {}

principal.mostrar = async(req, res) => {
    res.render('principal/principal');
}
principal.Mostrar = async(req, res) => {
    res.render('tienda/agregar');
}

module.exports = principal