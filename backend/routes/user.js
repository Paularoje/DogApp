const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { createUser, loginUser, revalidateToken_user} = require('../controllers/user');

const { existsEmail } = require('../helpers/dbValidator');
const { validateJWT_user } = require('../middlewares/validateJwt');

const router = Router();

// Crear un nuevo usuario
router.post('/register', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','No es un email valido').isEmail(),
    check('email','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength( {min: 6} ),
    check('email').custom(existsEmail), // Se valida si el correo ya está registrado en la DB
    validateFields
], createUser);

// Login de usuario
router.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','No es un email valido').isEmail(),
    check('email','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength( {min: 6} ),
    validateFields
], loginUser);

// Validar y revalidar token
router.get('/renew', [validateJWT_user], revalidateToken_user);

// Exportacion de las rutas
module.exports = router;