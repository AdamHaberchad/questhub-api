// path: ./controllers/collectionController.js
//I am not sure but this file will probably ahve most the logic for any CRUD with collections that why I named it collectionController.js :)
const pool = require('../data/databasepg');


// for GET request (display all collections)
async function displayCollections(req, res) {
    const query = 'SELECT * FROM collections WHERE userID = $1';
    const values = [req.user.userID];
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log("------>displayCollections: done");
            return res.json(result.rows);
        }else{
            return res.send("You don't have any collection");
        }
    }catch(error){
        console.log(`------>displayCollections: Something went wrong \nDetails: ${error.message}`);
        return res.status(500).send(`------>displayCollections: Something went wrong: \nDetails: ${error.message}`);
    }
}

//for GET request (get collection by name);

 async function getCollectionByName(req, res){
    const query = 'SELECT * FROM collections WHERE name = $1 AND userID = $2';
    const values = [req.params.name, req.user.userID];
    console.log(`req.params.id: ${req.params.name}\nreq.user.userID: ${req.user.userID}`);
    try{
        const result = await pool.query(query, values);
        if(result.rows.length > 0){
            console.log("------>getCollectionByName: done");
            return res.send(result.rows[0]);
        }else{
            return res.send(`There is no collection with ID: ${req.params.name}`);
        }
    }catch(error){
        console.log(`------>getCollectionByName: Something went wrong \nDetails: ${error.message}`);
        return res.status(500).send(`------>getCollectionByName: Something went wrong: \nDetails: ${error.message}`);
    }
 }

// for POST request (create a collection)
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

//for PUT request (change name of the collection)
async function updateCollController(req, res){
    const query = 'UPDATE collections SET name = $1 WHERE name = $2 AND userID = $3 RETURNING *';
    const values = [req.body.name, req.params.name, req.user.userID];

    try{
        const result = await pool.query(query, values);
        console.log(`collection ${result.rows[0].name} updated successfully!!`);
        return res.send(`collection ${result.rows[0].name} updated successfully!!`);
    }catch(error){
        console.log(`----->updateCollController: something went wrong: ${error.message}`);
        res.status(500).send(`something went wrong: ${error.message}`);
    }
}

//for DELETE request (delete a collection cascade)

async function deleteCollController(req, res){
    const query = 'DELETE FROM collections WHERE name = $1 AND userID = $2';
    const values = [req.params.name, req.user.userID];

    try{
        const result = await pool.query(query, values);
        console.log(`collection ${req.params.name} deleted successfully!!`);
        return res.send(`collection ${req.params.name} deleted successfully!!`);
    }catch(error){
        console.log(`----->deleteCollController: something went wrong: ${error.message}`);
        res.status(500).send(`something went wrong: ${error.message}`);
    }
}

module.exports = {insertCollController, displayCollections, getCollectionByName, updateCollController, deleteCollController};