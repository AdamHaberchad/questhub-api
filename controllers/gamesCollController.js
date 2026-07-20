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



//GET all games of a given collection:
async function displayGamesInCollection(req, res) {
    const query = "SELECT cg.name, g.title FROM games g INNER JOIN (SELECT c.collID, c.name, cg.gameID FROM collections c INNER JOIN collection_games cg ON c.collID = cg.collID WHERE c.userID = $1 AND c.collID = $2) cg ON g.gameID = cg.gameID";
    const values = [req.user.userID, req.idResources.collID];

    try{
        const result = await pool.query(query, values);
        console.log(`------>displayGamesInCollection:Displayed`)
        return res.json(result.rows);
    }catch(error){
        return res.status(500).send(`something went wrong: ${error.message}`);
    }

}

//DELETE a given game in a collection
async function deleteGameFromColl(req, res) {
    const query = 'DELETE FROM collection_games WHERE gameID = $1';
    const values = [req.idResources.gameID];
    try{
        const result = await pool.query(query, values);
        console.log(`------>deleteGameFromColl: ${req.params.title} was deleted from ${req.params.name} successfully!`);
        res.send(`${req.params.title} was deleted from ${req.params.name} successfully!`);
    }catch(error){
        return res.status(500).send(`something went wrong: ${error.message}`);

    }
}

module.exports = {insertGameController, displayGamesInCollection, deleteGameFromColl};