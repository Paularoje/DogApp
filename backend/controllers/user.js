const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT_user } = require('../helpers/jwt');

const User = require('../models/User'); // Se importa el modelo
const Dog = require('../models/Dog'); // Modelo de mascotas


// Crear un usuario nuevo
const createUser = async ( req = request, res = response ) => {
    const { name, email, password } = req.body; // Se extrae lo que viene del body
    const user = new User({ name, email, password }); // Se crea una nueva instancia del usuario

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // Nivel de encriptacion. 10 por defecto
    user.password = bcryptjs.hashSync( password, salt ); // Se encripta la contraseña

    // Guardar en la BD
    await user.save();

    // Generar el JSON WEB TOKEN
    const token = await generateJWT_user( user.id, user.name ); // Recibe como parametro lo que se quiere guardar en el payload

    return res.status(201).json({
        ok: true,
        msg: 'Usuario creado',
        uid: user.id,
        name,
        email,
        token
    });
}

// Login de usuario
const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body; // Se extrae lo que viene del body

    try {
        // Verificar si el correo existe
        const user = await User.findOne({ email }); // Buscamos si el correo esta registrado
        if ( !user ) { 
            return res.status(400).json({
                msg: 'El correo no es válido'
            });
        }
        // Verificar si el usuario esta activo
        if ( !user.state ) { // Si el estado es falso
            return res.status(400).json({
                msg: 'Usuario inactivo'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) { // Si las contraseñas no hacen match
            return res.status(400).json({
                msg: 'El password no es válido'
            });
        }

        // Generar el JSON WEB TOKEN
        const token = await generateJWT_user( user.id, user.name ); // Recibe como parametro lo que se quiere guardar en el payload

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}

//revalidar token
const revalidateToken_user = async ( req, res = response ) => {
    const { uid, name } = req;

    // Generar el JSON WEB TOKEN
    const token = await generateJWT_user( uid, name ); // Recibe como parametro lo que se quiere guardar en el payload

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token',
        })
    }

    return res.json({
        ok: true,
        msg: 'Renew',
        uid,
        name,
        token
    })
}

// Exportacion de los controladores
module.exports = {
    createUser,
    loginUser,
    revalidateToken_user
}