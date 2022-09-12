const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const { validateJWT_walker } = require('../middlewares/validateJwt');

const { createDogWalk, updateDogWalk } = require('../controllers/dog_walk');

const router = Router();

// Crear un nuevo paseo
router.post('/create', [
    validateJWT_walker,
    check('origin','El lugar de origen es obligatorio').notEmpty(),
    check('destination','El lugar de destino es obligatoria').notEmpty(),
    check('price','El precio es obligatoria').notEmpty(),
    validateFields
], createDogWalk);

router.put('/update', validateJWT_walker, updateDogWalk);

// Exportacion de las rutas
module.exports = router;