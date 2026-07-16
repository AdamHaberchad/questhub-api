// path: ./data/seeders/seadGames.js
const pool = require('../databasepg');

const games = [
    "Minecraft",
    "CS GO",
    "Brawlhalla",
    "League of legends",
    "Roblox",
    "Legend of Zelda",
    "Call of Duty",
    "Uncharted",
    "Stranded Deep",
    "Rust",
    "ARK: Survival Evolved",
    "FreeFire",
    "fortnite",
    "Among Us"
];

async function seedGames(){
    let i = 0;
    const query = 'INSERT INTO games (title) VALUES ($1) ON CONFLICT DO NOTHING' 
    let values;
    try{
        for(i; i < games.length; i++){
            values = [games[i]];
            await pool.query(query, values);
            console.log(`Inserted ${values[0]}`) // just to double check
        }
        return;
    }catch(error){
        console.log(`Something went wrong\nDetails: ${error.message}`);
    }
}

seedGames();
//module.exports = seedGames;