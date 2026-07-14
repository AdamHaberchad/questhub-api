// path: ./router/authRoutes.js;

const express = require('express');
const router = express.Router();

const pool = require('../data/databasepg');

//registration resources
const validateRegistration = require('../middleware/validateRegistration');
const registrationController = require('../controllers/registrationController');

//login resources
const validatelogin = require('../middleware/validateLogin');
const loginController = require('../controllers/loginController');


//==============GET==============

//TBD

//===============================




//==============POST==============
//register
router.post('/register', validateRegistration, async (req, res)=>{
    const result = await registrationController(req.body);
    if(result.error){
        res.status(500).send(`Error in registration: ${result.error.message}`);
        console.log(`Error in registration: ${result.error.message}`);
    }else{
        res.json({
            message: "Registration was successfull!!",
            user: result.row
        });
    }
});

//login
router.post('/login', validatelogin, loginController,  async (req, res)=>{
})
//===============================





module.exports = router;