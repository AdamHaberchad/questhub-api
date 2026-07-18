// path: ./router/collectionRoutes.js
const express = require('express');
const router = express.Router();

const pool = require('../data/databasepg');
const {validateCollection, validateCollectionFinder, validateCollectionDelete} = require('../middleware/validateCollection');
const {insertCollController, displayCollections, getCollectionByName, updateCollController, deleteCollController} = require('../controllers/collectionController');
const auth = require('../middleware/auth');




//==============GET==============
//get all collections
router.get('/', auth, displayCollections);

//get collection by ID
router.get('/:name', auth, getCollectionByName);

//==============POST==============

//create a collection
router.post('/', auth, validateCollection, insertCollController);

//==============PUT==============
//change name of the collections name only
router.put('/:name', auth, validateCollectionFinder, updateCollController);



//==============DELETE==============
router.delete('/:name', auth, validateCollectionDelete, deleteCollController);



module.exports = router;