const bcrypt = require('bcrypt');

const helpers = {};

helpers.hashPassword = async (password) => {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al cifrar la contraseña');
    }
};

helpers.comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
};

module.exports = helpers;
