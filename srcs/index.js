import express from "express";
import gamesRouter from "./games.js";
import answersRouter from "./answers.js";

// import dbRouter from "./db.js";

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

export default app;