// path: ./router/collectionRoutes.js
const express = require('express');
const router = express.Router();

const pool = require('../data/databasepg');
const validateCollection = require('../middleware/validateCollection');
const insertColl = require('../controllers/collectionController');
const auth = require('../middleware/auth');





//==============POST==============

//create a collection
router.post('/', auth, validateCollection, insertColl);




module.exports = router;