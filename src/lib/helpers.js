const bcrypt = require('bcrypt');

const helpers = {}

helpers.encryptPassword = async (password_usuario) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_usuario, salt);
    return hash;
}
helpers.matchPassword = async (password_usuario, savedPassword) => {
    try {
        return await bcrypt.compare(password_usuario, savedPassword);
    } catch (e) {
        console.log(e)
    }
};
module.exports = helpers;
