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

async function validateGameD(req, res, next){
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
    req.idResources.gameID = isFound.game.gameid;
    console.log("---->validateGame: done successfully");
    next();
    return;
}


module.exports = {validateGame, validateGameD};
