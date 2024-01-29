const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

// Obtener la clave secreta desde las variables de entorno
const claveSecreta = process.env.CLAVE_SECRETA || 'una_clave_secreta_fuerte_y_unica';

// Función para cifrar datos
function cifrarDatos(datos) {
    try {
        const cifrado = CryptoJS.AES.encrypt(JSON.stringify(datos), claveSecreta).toString();
        return cifrado;
    } catch (error) {
        console.error('Error al cifrar datos:', error.message);
        throw error;
    }
}

// Función para descifrar datos
function descifrarDatos(cifrado) {
    try {
        const bytes = CryptoJS.AES.decrypt(cifrado, claveSecreta);
        const datos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return datos;
    } catch (error) {
        console.error('Error al descifrar datos:', error.message);
        throw error;
    }
}

module.exports = {
    cifrarDatos,
    descifrarDatos
}