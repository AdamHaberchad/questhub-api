// path: ./router/gamesCollectionsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../data/databasepg');

const auth = require('../middleware/auth');
const {Validate_Find_Collection, collvalidation} = require('../middleware/validateCollection');
const {validateGame, validateGameD} = require('../middleware/validateGame');
const {insertGameController, displayGamesInCollection, deleteGameFromColl} = require('../controllers/gamesCollController');



//===============GET===============
//get all the games in a given collection
router.get('/:name/games', auth, collvalidation, displayGamesInCollection);

//===============POST===============
//insert games into a collection
    //need to validate the input + existance(does it exists and if you already have it in the collection)
    //insert the gameID and collection ID in the table

router.post('/:name/:title', auth, Validate_Find_Collection, validateGame, insertGameController);

//===============DELETE===============
//delete a given game from collection assuming the user knows that the game exists in the collection

router.delete('/:name/games/:title', auth, collvalidation, validateGameD, deleteGameFromColl);

module.exports = router;