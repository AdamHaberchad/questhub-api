// path: ./controllers/loginController.js
const jwt  = require("jsonwebtoken"); 

//JWT generation



async function login(req, res) {
    const payload = {
        userID: req.user.userid
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "10m"
    }
    const token = jwt.sign(payload, secret, options);
    return res.json({
        token
    });
}

module.exports = login;