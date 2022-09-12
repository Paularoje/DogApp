const { request, response } = require('express');

const Walker = require('../models/Walker'); // Se importa el modelo
const Dog = require('../models/Dog'); // Se importa el modelo
const DogWalk = require('../models/DogWalk'); // Se importa el modelo


// Crear un paseo nuevo
const createDogWalk = async ( req = request, res = response ) => {

    try {
        const wid = req.walker._id;
        
        // Se valida si no hay paseos en ejecución
        const dogwalk = await DogWalk.find( { state: true }, { walker: wid  } ); // Se busca el perro en la base de datos

        if ( dogwalk ) { // Si ya existe el paseo en la base de datos
            return res.status(400).json({
                msg: `Ya existe un paseo en ejecución`
            });
        }

        // Crear un nuevo paseo
        const newDogWalk = new DogWalk( req.body );

        // Buscar el paseador para asignarlo al paseo
        const walker = await Walker.findById( wid );

        // Asignar el paseador al paseo
        newDogWalk.walker = walker;

        // Guardar el paseo
        await newDogWalk.save();

        // Respuesta a la solicitud
        res.status(200).json({
            msg: 'Paseo creado'+dogwalk,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}

const updateDogWalk = async ( req = request, res = response ) => {

    try {
        const wid = req.walker._id;
        const dogId = req.dogs._id;
        
        // Se valida si no hay paseos en ejecución
        const dogwalk = await DogWalk.find( { state:true }, { walker: wid  } ); // Se busca el perro en la base de datos

        if ( dogwalk ) { // Si ya existe el paseo en la base de datos
            return res.status(400).json({
                msg: `Ya existe un paseo en ejecución`
            });
        }

        // Buscar el perro para asignarlo al paseo
        const dog = await Dog.findById( dogId );

        // Asignar el perro dentro del array de paseos
        user.dogs.push( dog );

        // Guardar el paseo con nuevo perro
        await dogwalk.save();

        // Respuesta a la solicitud
        res.status(200).json({
            msg: 'Mascota agregada',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}

// Exportacion de los controladores
module.exports = {
    createDogWalk,
    updateDogWalk
}