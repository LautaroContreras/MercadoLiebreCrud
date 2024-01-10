const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers')

const { check } = require('express-validator');

const validateRegister =[
    check("name").notEmpty().withMessage('Debes completar el nombre').bail().isLength({min : 5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    check("lastName").notEmpty().withMessage('Debes completar el apellido').bail().isLength({min : 5}).withMessage('El apellido debe tener al menos 5 caracteres'),
    check("email").notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes ingresar un email valido'),
    check("password").notEmpty().withMessage('Debes completar la contraseña').bail().isLength({min : 5}).withMessage('La contraseña debe tener al menos 5 caracteres'),
];

/*** CREATE ONE USER***/ 
router.get('/register', usersController.create )
router.post('/register',validateRegister,usersController.register ); 


module.exports = router;