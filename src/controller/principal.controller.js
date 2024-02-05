const principal = {}

principal.mostrar = async(req, res) => {
    res.render('principal/principal');
}
principal.Mostrar = async(req, res) => {
    res.render('tienda/agregar');
}

//Aqui agregar una funcion que me permita registrar una soloa vez la tienda 
//Ademas dirrecionarle a la pagina del listado de la tienda

module.exports = principal