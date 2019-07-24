const express = require('express');
const app = express();

app.get("/", function(req,res) {
    res.send("express is working");
})

app.listen("3000" , function() {
    console.log("hello world");
})