// path: ./middleware/ validateRegistration.js
const Joi = require('joi');
const pool = require('../data/databasepg');

//referance: 
// username VARCHAR(30) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password_hash VARCHAR(255) NOT NULL,


const schema = Joi.object({
        username: Joi.string().min(6).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });




function validateRegInput(user){
    const { error } = Joi.validate(user, schema);
    if(!error){
        console.log("---->validateRegInpute: Valid Input!!");
        return {
            isValid: true,
            error: null
        };
    }else{
        console.log(`---->validateRegInpute: NOT VALID because: ${error.details[0].message}`);
        return {
            isValid: false,
            error: error
        };
    }
}

async function isAlreadyRegistered(user){
    const query = "SELECT * FROM users WHERE email ILIKE $1";
    const values = [user.email];

    try{
        const find = await pool.query(query, values);
        if(find.rows.length === 0){
        console.log("---->isAlreadyRegistered: new email !!");
        return {
            isFound: false,
            error: null
        }; 
        }else{
            console.log("---->isAlreadyRegistered: email is already registered!");
            return {
                isFound: true,
                error: null
            };
        }
    }catch(err){
        return {
            isFound: null, //dosen't mean not found but something went wrong
            error: err
        }
    }
    
}

async function validateRegistration(req, res, next){
    const user = req.body;
    const validator = validateRegInput(user);
    const finder = await isAlreadyRegistered(user);

    if(finder.error){
        return res.status(400).send(finder.error.message);
    }else{
    if(!validator.isValid){
        return res.status(400).send(`INPUT NOT VALID because: ${validator.error.details[0].message}`)
    }else if(finder.isFound){
        return res.status(400).send(`this email: ${user.email} is already registered`);
    }else{
        console.log("registration validation done successfully!!");
        next();
    }}
}


module.exports = validateRegistration;
