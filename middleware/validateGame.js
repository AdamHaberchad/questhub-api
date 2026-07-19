// path: ./middleware/validateGame.js
const Joi = require('joi');
const pool = require('../data/databasepg');

const schema = Joi.object({
    title: Joi.string().min(4).required()
});


function validateGameInput(user){
    const objTitle = {
        title: user
    };
    const { error } = Joi.validate(objTitle, schema);
    if(!error){
        console.log("---->validateGameInput: Valid Input!!");
        return {
            isValid: true,
            error: null
        };
    }else{
        console.log(`---->validateGameInput: NOT VALID because: ${error.details[0].message}`);
        return {
            isValid: false,
            error: error
        };
    }
}

async function getGameByTitle(title){
    const query = 'SELECT * FROM games WHERE title = $1';
    const values = [title];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log(`---->getGameByTitle: Game exists!`);
            return{
                game: result.rows[0],
                error: null
            }
        }else{
            console.log(`---->getGameByTitle: Game: ${title} doesn't exist!`);
            return{
                game: false,
                error: null
            }
        }
    }catch(error){
        console.log(`---->getGameByTitle: Something went wrong\nDetails: ${error.message}`);
        return{
            game: null,
            error: error
        }
    }
}

async function validateGame(req, res, next){
    const inputValidator = validateGameInput(req.params.title);
    if(!inputValidator.isValid){
        return res.status(400).send(`Invalid input: ${inputValidator.error.details[0].message}`);
    }
    const isFound = await getGameByTitle(req.params.title);
    if(isFound.error){
        return res.status(500).send(`Something went wrong\nDetails: ${isFound.error.message}`);
    }
    if(!isFound.game){
        return res.status(404).send(`Game: ${req.params.title} doesn't exist!`);
    }
    req.toBeInserted.gameID = isFound.game.gameid;
    console.log("---->validateGame: done successfully");
    next();
    return;
}

//context (req.toBeInserted)from another file:
/*
async function validateCollectionFinder(req, res, next){ 
    req.toBeInserted = {};
    const validator = validateInput(req.body);
    if(validator.error){
        return res.status(400).send(validator.error.details[0].message);
    }
    const query = 'SELECT * FROM collections WHERE name = $1 AND userID = $2';
    const values = [req.params.name, req.user.userID];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            req.toBeInserted.collID = result.rows[0].collID;
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
*/
module.exports = validateGame;
