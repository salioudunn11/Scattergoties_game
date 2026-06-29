const express = require("express");   //all commonjs
const gamesRouter = require("./games.js");
const answersRouter = require("./answers.js")

const app = express();

app.use(express.json());

app.use("/games", gamesRouter);
app.use("/answers", answersRouter);

app.use((req,res) => {
    res.status(404).json({error: "Not found"});
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: "Something went wrong"});
});

module.exports = app;