const express = require('express');
const app  = express();
const userRoutes = require('./routes/user');
const { connectToDB } = require('./config/db');
require('dotenv').config();

const PORT = 3000;

app.listen(PORT, () => {
    console.log('App is running on PORT - ', PORT);
    connectToDB();
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Back end API is running...");
});

app.use('/user', userRoutes);