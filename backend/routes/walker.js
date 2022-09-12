const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { createWalker, loginWalker, revalidateToken_walker } = require('../controllers/walker');

const { existsEmail_walker } = require('../helpers/dbValidator');
const { validateJWT_walker } = require('../middlewares/validateJwt');

const router = Router();

// Crear un nuevo paseador
router.post('/register', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','No es un email valido').isEmail(),
    check('email','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength( {min: 6} ),
    check('email').custom(existsEmail_walker), // Se valida si el correo ya está registrado en la DB
    check('identification','El número de identificación es obligatorio').not().isEmpty(),
    check('birth_date','La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('phone','El número de teléfono es obligatorio').not().isEmpty(),
    check('phone','No es un número de teléfono valido').isLength( {min: 6}, {max:10} ),
    check('address','La dirección es obligatoria').not().isEmpty(),
    validateFields
], createWalker);

// Login de usuario
router.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','No es un email valido').isEmail(),
    check('email','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength( {min: 6} ),
    validateFields
], loginWalker);

// Validar y revalidar token
router.get('/renew', [validateJWT_walker], revalidateToken_walker);

// Exportacion de las rutas
module.exports = router;