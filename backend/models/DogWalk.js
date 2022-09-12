const { Schema, model } = require('mongoose');

// Modelo de paseo
const DogWalkSchema = Schema({
    origin: {
        type: String,
        required: [true, 'El lugar de origen es obligatorio']
    },
    destination: {
        type: String,
        required: [true, 'El lugar de destino es obligatorio']
    },
    price: {
        type: String,
        required: [true, 'El lugar de destino es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },
    walker: {
        type: Schema.Types.ObjectId,
        ref: 'Walker'
    },
    dogs : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dog'
        }
    ]
});

// Exportacion del modelo
module.exports = model('DogWalk', DogWalkSchema);