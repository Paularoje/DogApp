const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const { validateJWT_user } = require('../middlewares/validateJWT');

const { createDog, dogsUser, deleteDog } = require('../controllers/dog');

const router = Router();

// Crear un nuevo perro
router.post('/register', [
    validateJWT_user,
    check('name','El nombre es obligatorio').notEmpty(),
    check('age','La edad es obligatoria').notEmpty(),
    check('breed','La raza es obligatoria').notEmpty(),
    validateFields
], createDog);

router.delete("/delete/:id", validateJWT_user, deleteDog);

// Obtener perros
router.get('/list', validateJWT_user, dogsUser);


// Exportacion de las rutas
module.exports = router;