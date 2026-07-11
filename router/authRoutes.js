// path: ./router/authRoutes.js;

const express = require('express');
const router = express.Router();

const pool = require('../data/databasepg');
const validateRegistration = require('../middleware/validateRegistration');
const registrationController = require('../controllers/registrationController');



//==============GET==============

//TBD

//===============================




//==============POST==============
router.post('/', validateRegistration, async (req, res)=>{
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
//===============================





module.exports = router;