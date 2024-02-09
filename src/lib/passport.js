const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const path = require("path");
// const CryptoJS = require("crypto-js");
const orm = require("../database/dataBase.orm")
// const request = require('request');
// const fs = require('fs');
const sql = require("../database/dataBase.sql");
const helpers = require("./helpers");

//INICIO DE SESION
passport.use(
    "local.signin",
    new LocalStrategy(
        {
            usernameField: "correo_electronico_usuario",
            passwordField: "password_usuario",
            passReqToCallback: true,
        },
        async (req, correo_electronico_usuario, password_usuario, done) => {
            const rows = await orm.usuario.findOne({ where: { correo_electronico_usuario: correo_electronico_usuario } });
            if (rows) {
                const user = rows;
                const validPassword = await helpers.matchPassword(
                    password_usuario,
                    user.password_usuario
                )
                if (validPassword) {
                    done(
                        null,
                        user,
                        req.flash(
                            "message",
                            "Bienvenido a Fintech" + " " + user.correo_electronico_usuario
                        )
                    );
                } else {
                    done(null, false, req.flash("message", "Datos incorrectos"));
                }
            } else {
                return done(
                    null,
                    false,
                    req.flash("message", "El nombre de usuario no existe.")
                );
            }
        }
    )
);
//REGISTRO
passport.use(
    "local.signup",
    new LocalStrategy(
        {
            usernameField: "correo_electronico_usuario",
            passwordField: "password_usuario",
            passReqToCallback: true,
        },
        async (req, correo_electronico_usuario, password_usuario, done) => {
            const { nombres_usuario, apellidos_usuario, cedula_usuario, celular_usuario } = req.body;
            const celularRegex = /^[0-9]{10}$/;
            const cedulaRegex = /^[0-9]{10}$/;

            if (!celularRegex.test(celular_usuario)) {
                return done(null, false, req.flash("message", "El número de celular debe tener exactamente 10 caracteres y contener solo números."));
            }
            if (!cedulaRegex.test(cedula_usuario)) {
                return done(null, false, req.flash("message", "La cédula debe tener exactamente 10 caracteres y contener solo números."));
            }

            const usuarios = await orm.usuario.findOne({ where: { correo_electronico_usuario: correo_electronico_usuario } });
            if (usuarios === null) {
                const nuevoUsuario = {
                    nombres_usuario,
                    apellidos_usuario,
                    cedula_usuario,
                    celular_usuario,
                    correo_electronico_usuario,
                    password_usuario
                };
                nuevoUsuario.password_usuario = await helpers.encryptPassword(password_usuario);
                const resultado = await orm.usuario.create(nuevoUsuario);
                nuevoUsuario.id = resultado.insertId;
                return done(null, nuevoUsuario);
            } else {
                if (usuarios) {
                    const usuario = usuarios;
                    if (nombres_usuario === usuario.nombres_usuarios) {
                        return done(null, false, req.flash("message", "El nombre de usuario ya existe."));
                    } else {
                        const nuevoUsuario = {
                            correo_electronico_usuario,
                            password_usuario
                        };
                        nuevoUsuario.password_usuario = await helpers.encryptPassword(password_usuario);
                        const resultado = await orm.usuario.create(nuevoUsuario);
                        nuevoUsuario.id = resultado.insertId;
                        return done(null, nuevoUsuario);
                    }
                }
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
