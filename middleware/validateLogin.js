// path: ./middleware/ valdiateLogin.js
const Joi = require('joi');
const pool = require('../data/databasepg');
const bcrypt = require('bcrypt');



const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });




function validateLoginInput(user){
    const { error } = Joi.validate(user, schema);
    if(!error){
        console.log("---->validateLoginInput: Valid Input!!");
        return {
            isValid: true,
            error: null
        };
    }else{
        console.log(`---->validateLoginInput: NOT VALID because: ${error.details[0].message}`);
        return {
            isValid: false,
            error: error
        };
    }
}

async function findUserByEmail(user){
    const query = "SELECT * FROM users WHERE email ILIKE $1";
    const values = [user.email];

    try{
        const find = await pool.query(query, values);
        if(find.rows.length === 0){
        console.log("---->findUserByEmail: Email is not registered!");
        return {
            user: null,
            error: null
        }; 
        }else{
            console.log("---->findUserByEmail: Email was found!");
            return {
                user: find.rows[0],
                error: null
            };
        }
    }catch(err){
        return {
            user: null, //dosen't mean not found but something went wrong
            error: err
        }
    }
    
}

async function validatePassword(inputPassword, hashedPassword){
    try{
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        if(isMatch){
            console.log("---->validatePassword:Correct password");
            return {
                isValid: true,
                error: null
            };
        }else{
            console.log("---->validatePassword:Wrong password");
            return {
                isValid: false,
                error: null
            };
        }
    }catch(error){
        return{
            isValid: null,
            error: error
        }
    }
}


async function validateLogin(req, res, next){
    const user = req.body;
    const inputValidator = validateLoginInput(user);
    const finder = await findUserByEmail(user);

    if(finder.error){
        return res.status(400).send(finder.error.message);
    }else{
    if(!inputValidator.isValid){
        return res.status(400).send(`INPUT NOT VALID because: ${inputValidator.error.details[0].message}`)
    }
    else if(!finder.user){
        return res.status(400).send(`this email: ${user.email} is not registered`);
    }

    const pwValidator = await validatePassword(user.password, finder.user.password_hash);

    if(pwValidator.error){
        return res.status(400).send(`Error accured duting password validation: ${pwValidator.error.message}`);
    }
    else if(!pwValidator.isValid){
        return res.status(401).send("wrong password");
    }else{
        console.log("Login validation done successfully!!");
        req.user = finder.user;
        next();
    }
    //I hate this else ifss that im using here they look ugly but ill fix it once the testing is done 
}}


module.exports = validateLogin;