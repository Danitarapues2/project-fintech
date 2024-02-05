const principal = {}

//Aqui agregar una funcion que me permita registrar una soloa vez la tienda 
//Ademas dirrecionarle a la pagina del listado de la tienda
let principalVisualizada = false;

principal.mostrar = async (req, res) => {
    if (!principalVisualizada) {
        res.render('principal/principal');
        principalVisualizada = true;
    } else {
        res.redirect('/tienda/listar/');
    }
};

principal.Mostrar = async (req, res) => {
    res.render('tienda/agregar');
};

module.exports = principal