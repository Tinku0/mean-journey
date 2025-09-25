const express = require('express');
const app  = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log('App is running on PORT - ', PORT);
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Back end API is running...");
});