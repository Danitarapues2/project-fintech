const passport = require('passport');

const Auth={}

Auth.signin = async (req, res, next) => {

    passport.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
    }; 
  
  
  Auth.signup = async (req, res, next) => {
       passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  });
}

module.exports=Auth