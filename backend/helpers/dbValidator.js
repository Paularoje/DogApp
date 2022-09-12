const User = require('../models/User'); // Modelo "usuario"
const Walker = require('../models/Walker'); // Modelo "paseador"

// Funcion para verificar si el correo existe en la base de datos
const existsEmail = async( email = '') => {
    const exEmail = await User.findOne({ email }); // Devuelve falso o verdadero
    if ( exEmail ) { // Si el correo ya existe
        throw new Error( `El correo ${ email } ya está registrado en la DB` ) // Error personalizado
    }
}

// Funcion para verificar si el correo existe en la base de datos - PASEADOR
const existsEmail_walker = async( email = '') => {
    const exEmail = await Walker.findOne({ email }); // Devuelve falso o verdadero
    if ( exEmail ) { // Si el correo ya existe
        throw new Error( `El correo ${ email } ya está registrado en la DB` ) // Error personalizado
    }
}

// Se exporta la funcion de validacion
module.exports = {
    existsEmail,
    existsEmail_walker
}