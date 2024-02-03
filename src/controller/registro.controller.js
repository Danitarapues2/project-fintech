const registro = {};

const passport = require('passport');

registro.mostrarRegistro = async(req, res) => {
    res.render('login/registro');
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