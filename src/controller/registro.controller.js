const registro = {};

const orm = require("../database/dataBase.orm")
const sql = require("../database/dataBase.sql");
const passport = require('passport');


registro.mostrarRegistro = async(req, res) => {
    const list = await sql.query('SELECT max (id_usuario) as maximo FROM usuarios');
    res.render('login/registro',{list});
};

//registro
registro.Registro = passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/Registro',
    failureFlash: true
});

registro.mostrarLogin = (req, res, next) =>{
    res.render('login/login')
}
//login
registro.Login = passport.authenticate('local.signin', {
    successRedirect: '/principal',
    failureRedirect: '/login',
    failureFlash: true
});

registro.cierreSesion = (req, res, next) => {
    req.logOut();
    res.redirect('/login');
};

module.exports = registro