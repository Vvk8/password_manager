const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToMongoDB } = require('./db/connection');
const cookieParser = require('cookie-parser');  

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());   
// SETTING UP DOTENV
const PORT = process.env.PORT || 8080;
// CONNECTING WITH DATABASE
Promise.all([connectToMongoDB()])
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log("Error while connecting to the database:", error);
        process.exit(1);
    });


//Middleware
app.use(express.json());
// LINKING THE ROUTER FILES 
app.use(require("./router/routing"));
// LISTENING TO PORT 
app.listen(PORT, () =>
{
    console.log(`listening to port : http://localhost:${PORT}/`)
})