const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`listening on : http://localhost:${PORT}`)
}

function handleHome(req, res){
    console.log(req)
    res.send('hello from home!!')
    console.log('hi from home!!')
}

function handleProfile(req,res) {
    res.send('you are on my profile');
}

app.get("/", handleHome)
app.get("/profile", handleProfile)

app.listen(4000, handleListening);