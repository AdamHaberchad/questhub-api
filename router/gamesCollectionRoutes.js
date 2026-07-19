// path: ./router/gamesCollectionsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../data/databasepg');

const auth = require('../middleware/auth');
const {Validate_Find_Collection} = require('../middleware/validateCollection');
const validateGame = require('../middleware/validateGame');
const {insertGameController} = require('../controllers/gamesCollController');



//===============POST===============
//insert games into a collection
    //need to validate the input + existance(does it exists and if you already have it in the collection)
    //insert the gameID and collection ID in the table

router.post('/:name/:title', auth, Validate_Find_Collection, validateGame, insertGameController);

module.exports = router;