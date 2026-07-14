// path: ./controllers/loginController.js
const pool = require('../data/databasepg');


async function login(req, res) {
    return res.json({
        message: "------->loginController: login is valid (placeholder for JWT which will be coming soon :-) )"
    });
}

module.exports = login;