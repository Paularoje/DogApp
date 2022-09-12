const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT_walker } = require('../helpers/jwt');

const Walker = require('../models/Walker'); // Se importa el modelo

// Crear un paseador nuevo
const createWalker = async ( req = request, res = response ) => {
    const { name, email, password, identification, birth_date, phone, address, experience } = req.body; // Se extrae lo que viene del body
    const walker = new Walker({ name, email, password, identification, birth_date, phone, address, experience }); // Se crea una nueva instancia del usuario

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // Nivel de encriptacion. 10 por defecto
    walker.password = bcryptjs.hashSync( password, salt ); // Se encripta la contraseña

    // Guardar en la BD
    await walker.save();

    // Generar el JSON WEB TOKEN
    const token = await generateJWT_walker( walker.id, walker.name ); // Recibe como parametro lo que se quiere guardar en el payload

    return res.status(201).json({
        ok: true,
        msg: 'Paseador creado',
        wid: walker.id,
        name,
        email,
        identification,
        birth_date,
        phone,
        address,
        experience,
        token
    });
}

// Login de paseador
const loginWalker = async ( req = request, res = response ) => {
    const { email, password } = req.body; // Se extrae lo que viene del body

    try {
        // Verificar si el correo existe
        const walker = await Walker.findOne({ email }); // Buscamos si el correo esta registrado
        if ( !walker ) { 
            return res.status(400).json({
                ok: false,
                msg: 'El correo no es válido'
            });
        }
        // Verificar si el paseador esta activo
        if ( !walker.state ) { // Si el estado es falso
            return res.status(400).json({
                ok: false,
                msg: 'Usuario inactivo'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, walker.password );
        if ( !validPassword ) { // Si las contraseñas no hacen match
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // Generar el JSON WEB TOKEN
        const token = await generateJWT_walker( walker.id, walker.name ); // Recibe como parametro lo que se quiere guardar en el payload

        res.json({
            ok: true,
            wid: walker.id,
            name: walker.name,
            token
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ // Error del servidor
            ok: false,
            msg: 'Algo salio mal'
        })
    }
}

//revalidar token
const revalidateToken_walker = async ( req, res = response ) => {
    const { wid, name } = req;

    // Generar el JSON WEB TOKEN
    const token = await generateJWT_walker( wid, name ); // Recibe como parametro lo que se quiere guardar en el payload

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token',
        })
    }

    return res.json({
        ok: true,
        msg: 'Renew',
        wid,
        name,
        token
    })
}

// Exportacion de los controladores
module.exports = {
    createWalker,
    loginWalker,
    revalidateToken_walker
}