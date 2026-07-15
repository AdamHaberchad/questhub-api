// path: ./middleware/auth.js
const jwt = require('jsonwebtoken');

async function auth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).send("Authorization header missing or no token provided");
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("---->JWT verified successfully")
        next();
    }catch(error){
        return res.status(401).send(`something went wrong in the authentication\nDetails: ${error.message}`);
    }
    
} 

    module.exports = auth;