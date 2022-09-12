const { Schema, model } = require('mongoose');

// Modelo de usuario
const WalkerSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // No permite correos duplicados
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    photo: {
        type: String,
        default: null
    },
    state: {
        type: Boolean,
        default: true
    },
    identification: {
        type: String,
        required: [true, 'El número de identificación es obligatorio'],
        unique: true // No permite correos duplicados
    },
    birth_date: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    phone: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio'],
        unique: true // No permite correos duplicados
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    experience: {
        type: String,
        default: null
    }
});

// Exportacion del modelo
module.exports = model('Walker', WalkerSchema);