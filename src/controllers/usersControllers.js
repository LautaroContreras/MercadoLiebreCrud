const {validationResult}=require('express-validator');
const  users = require('../data/users.json')

const usersController = {
	create: (req,res) => {
        return res.render('register')
    },
    register:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //No hay errores, seguimos adelante
        } else{
            //Hay errores, volvemos al formulario con los mensajes
           res.render('register', {errors: errors.mapped(), old: req.body} ) 
        }
    }
 

}

module.exports = usersController;