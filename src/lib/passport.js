const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const orm = require('../database/dataBase.orm');
const sql = require('../database/dataBase.sql');
const helpers = require('./helpers');
const { cifrarDatos } = require('./encrypDates');

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const user = await orm.client.findOne({ where: { usernameClient: username, stateClient: 'activado' } });

                if (user) {
                    const validPassword = await helpers.comparePassword(password, user.passwordClient);

                    if (validPassword) {
                        return done(null, user, req.flash('message', `Bienvenido ${user.usernameClient}`));
                    } else {
                        return done(null, false, req.flash('message', 'Datos incorrectos'));
                    }
                } else {
                    return done(null, false, req.flash('message', 'El nombre de usuario no existe.'));
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const existingUser = await orm.client.findOne({ where: { usernameClient: username } });

                if (existingUser) {
                    return done(null, false, req.flash('message', 'El nombre de usuario ya existe.'));
                }

                const hashedPassword = await helpers.hashPassword(password);

                const {
                    idUsuarios,
                    nameClient,
                    lastNameClient,
                    typeIdentificationClient,
                    identificationCardClient,
                    emailClient,
                    phoneClient,
                    nameTypePerson,
                    nameGener,
                } = req.body;

                let newClient = {
                    idClient: idUsuarios,
                    nameClient: cifrarDatos(nameClient),
                    lastNameClient: cifrarDatos(lastNameClient),
                    typeIdentificationClient: cifrarDatos(typeIdentificationClient),
                    identificationCardClient: cifrarDatos(identificationCardClient),
                    emailClient: cifrarDatos(emailClient),
                    phoneClient: cifrarDatos(phoneClient),
                    usernameClient: username,
                    passwordClient: hashedPassword,
                    stateClient: 'activado',
                };

                if (nameClient !== 'seleccion' && nameTypePerson !== 'seleccion') {
                    let newDetail = {
                        clientIdClient: idUsuarios,
                        generIdGener: nameGener,
                        typePersonIdTypePerson: nameTypePerson,
                    };

                    const resultado = await orm.client.create(newClient);
                    await orm.clientDetail.create(newDetail);

                    newClient.id = resultado.insertId;
                } else {
                    req.flash('message', 'Llene todos los campos por favor.');
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;