// path: ./middleware/validateCollection.js
const Joi = require('joi');
const pool = require('../data/databasepg');

const schema = Joi.object({
    name: Joi.string().min(8).max(30).required()
});

function validateInput(user){
    const { error } = Joi.validate(user, schema);
    if(!error){
        console.log("---->validateinput: Valid Input!!");
        return {
            isValid: true,
            error: null
        };
    }else{
        console.log(`---->validateinput: NOT VALID because: ${error.details[0].message}`);
        return {
            isValid: false,
            error: error
        };
    }
}

async function validateCollection(req, res, next){ // the actual middleware, it will also check if there is a collection with the same name since its just a small task
    const validator = validateInput(req.body);
    if(validator.error){
        return res.status(400).send(validator.error.details[0].message);
    }
    const query = 'SELECT * FROM collections WHERE name = $1 AND userID = $2';
    // const query = 'SELECT * FROM collections WHERE name = $1 WHERE userID = $2;';
    const values = [req.body.name, req.user.userID];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log(`---->validateCollection: There is exist a collection with name: ${req.body.name}`)
            return res.status(400).send(`Collection: ${req.body.name} already exists`);
        }else{
            console.log(`---->validateCollection: VALID!!`);
            next();
        }
    }catch(error){
        return res.status(500).send(`---->validateCollection:something went wrong -details: ${error.message}`);
    }
}

async function validateCollectionFinder(req, res, next){ 
    const validator = validateInput(req.body);
    if(validator.error){
        return res.status(400).send(validator.error.details[0].message);
    }
    const query = 'SELECT * FROM collections WHERE name = $1 AND userID = $2';
    const values = [req.params.name, req.user.userID];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log(`---->validateCollectionFinder: Collection: ${req.body.name} already exists`);
            console.log(`---->validateCollectionFinder: VALID!!`);
            next();
        }else{
            return res.status(400).send(`---->validateCollectionFinder: Collection: ${req.params.name} dosen't exists`);
        }
    }catch(error){
        return res.status(500).send(`---->validateCollectionFinder:something went wrong -details: ${error.message}`);
    }
}

async function validateCollectionDelete(req, res, next){ 
    const query = 'SELECT * FROM collections WHERE name = $1 AND userID = $2';
    const values = [req.params.name, req.user.userID];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log(`---->validateCollectionFinder: Collection: ${req.body.name} already exists`);
            console.log(`---->validateCollectionFinder: VALID!!`);
            next();
        }else{
            return res.status(400).send(`---->validateCollectionFinder: Collection: ${req.params.name} dosen't exists`);
        }
    }catch(error){
        return res.status(500).send(`---->validateCollectionFinder:something went wrong -details: ${error.message}`);
    }
}

module.exports = {validateCollection, validateCollectionFinder, validateCollectionDelete};