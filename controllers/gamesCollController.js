// path: ./controllers/gamesCollController.js
const pool = require('../data/databasepg');





//POST insert game to a collection
async function insertGameController(req, res){
    const query = 'INSERT INTO collection_games (collID, gameID) VALUES ($1, $2) RETURNING *';
    const values = [req.toBeInserted.collID, req.toBeInserted.gameID];
    console.log(`---->insertGameController(db):\nreq.toBeInserted.collID: ${req.toBeInserted.collID}\nreq.toBeInserted.gameID: ${req.toBeInserted.gameID}`)
    try{
        const result = await pool.query(query, values);
        return res.json({
            message: "Game inserted successfully",
            record: result.rows[0]
        });
    }catch(error){
        return res.status(500).send("---->insertGameController(db):Something went wrong try again");
    }
    console.log("---->insertGameController: Done");
}

module.exports = {insertGameController};