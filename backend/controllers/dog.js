const { request, response } = require('express');

const User = require('../models/User'); // Se importa el modelo
const Dog = require('../models/Dog'); // Se importa el modelo

// Crear un perro nuevo
const createDog = async ( req = request, res = response ) => {

    try {

        const name = req.body.name.toUpperCase(); // Se obtiene el nombre que viene del body
        const uid = req.user._id;
        
        // Se valida si el perro ya existe
        const dogDB = await Dog.find( { name }, { user: uid  } ); // Se busca el perro en la base de datos

        if ( dogDB ) { // Si ya existe el perro existe en la base de datos
            return res.status(400).json({
                msg: `El perro ${name} ya existe`
            });
        }

        // Crear un nuevo perro por usuario
        const newDog = new Dog( req.body );

        // Buscar el usuario para asignar al perro
        // const user = await User.findById( req.params );
        const user = await User.findById( uid );

        // Asignar al usuario como dueño del perro
        newDog.user = user;

        // Guardar el perro 
        await newDog.save();

        // Asignar el perro dentro del array de perros del usuario
        user.dogs.push( newDog );

        // Guaradar el usuario con su nuevo perro
        await user.save();

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


// Controlador para obtener los perros por usuario
const dogsUser = async ( req = request, res = response ) => {

    try {
        const uid = req.user._id;

        const user = await User.findById( uid );

        const dogs = user.dogs;

        let dogsUsers = [];

        for (let index = 0; index < dogs.length; index++) {
            dogsUsers[index] = await Dog.findById( dogs[index]   );
        }

        // Respuesta a la solicitud
        res.json({
            dogsUsers
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }

}

const deleteDog = async ( req = request, res = response ) => {
    try {
        const { id } = req.params;
        const uid = req.user._id;
        const user = await User.findById( uid );

        // Eiminar el perro 
        await Dog.remove({ _id: id });

        // Eliminar el perro del array de perros del usuario
        var i = user.dogs.indexOf( id );
        user.dogs.splice( i, 1 );
        await user.save();

        // Respuesta a la solicitud
        res.status(200).json({
            msg: 'Mascota eliminada',
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
    createDog,
    dogsUser,
    deleteDog
}