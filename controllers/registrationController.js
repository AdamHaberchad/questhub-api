// path: ./controllers/registrationController.js
const pool = require('../data/databasepg');
const bcrypt = require('bcrypt');

async function hashPassword(password){ //might be redundant but idk i just wanted to keep it away from the actual insertion process
    return bcrypt.hash(password, 10);
}

async function insertUser(user){ //note: user = req.body
    const hashedPassword = await hashPassword(user.password);
    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING userid, username, email, created_at';
    const values = [
        user.username, 
        user.email,
        hashedPassword
    ];
    try{
        const result = await pool.query(query, values);
        return {
            row: result.rows[0],
            error: null
        };
    }catch(error){
        return {
            row: null,
            error: error
        }
    };
};

module.exports = insertUser;