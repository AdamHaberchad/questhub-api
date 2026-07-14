// path: ./server.js
require('dotenv').config();
const express = require('express');
const pool = require('./data/databasepg');
const authRouter = require('./router/authRoutes')


const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth/', authRouter);



app.get('/', (req, res)=>{
    res.send("Welcome to the home page :)");
})


//db connection
async function dbConnection(){
    try{
        const result = await pool.query("SELECT NOW();");
        console.log("App has been connected to the database successfully!");
        console.log(result.rows);
    }catch(error){
        console.log("Connection to the database failed :(");
        console.log(error.message);
    }
}


//port
const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
    dbConnection();
})
