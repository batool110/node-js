const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Batool:batool123@cluster0-2bk7q.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true
}, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("connected to database");
    }
});

var gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
});

var Game = mongoose.model("Game", gameSchema);

Game.create({
    title: "abc",
    creator: "123"
}, function(error, data){
    if(error){
        console.log("there is an error");
        console.log(error);
    }
    else{
        console.log(data);
    }
})

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const game = [
    {title: "Game 1", creator: "creator 1" },
    {title: "Game 2", creator: "creator 2" },
    {title: "Game 3", creator: "creator 3" },
]

app.get("/" , function(req, res){
    res.render("home.ejs");
})

app.get("/home", (req,res) => {
    res.send("hello home page");
})

app.get("/home/:homeTitle", (req, res) => {
    const title = req.params.homeTitle;
    res.render("homepage.ejs", {
        title: title,
        name: "BATOOL ALI"
    });
})

app.get("/game", (req, res ) => {
    res.render("gamePage.ejs")
})

app.get("/game/:gameList", (req, res) => {
    const gameList = req.params.gameList;
    
    res.render("GameList.ejs", {
        gameList: gameList,
        game: game
    })
})

app.get("/addGame", function(req,res){
    res.render("addGame.ejs");
})

//sending data without database and redirecting to game list page
app.post("/addGame", function(req,res){
    var data = req.body;
    game.push(data);
    res.redirect("/game/:gameList");

    console.log(data);
})

app.get("*", function(req, res){
    res.send("you are lost!!");
})

app.listen(3000 , () => {
    console.log("server start at localhost:3000");
})