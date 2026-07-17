// path: ./controllers/collectionController.js

//I am not sure but this file will probably ahve most the logic for any CRUD with collections that why I named it collectionController.js :)

const pool = require('../data/databasepg');


async function insertCollController(req, res){
    const query = 'INSERT INTO collections (name, userID) VALUES ($1, $2) RETURNING *';
    const values = [req.body.name, req.user.userID];

    try{
        const result = await pool.query(query, values);
        console.log(`collection ${result.rows[0].name} inserted successfully!!`);
        return res.send(`collection ${result.rows[0].name} inserted successfully!!`);
    }catch(error){
        console.log(`----->insertCollController: something went wrong: ${error.message}`);
        res.status(500).send(`something went wrong: ${error.message}`);
    }
}

module.exports = insertCollController;