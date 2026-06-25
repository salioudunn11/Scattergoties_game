
const express = require("express");
const prisma = require("/db");
const router = express.Router();


router.post("/", async (req, res, next) => {
    try{
        const {roomCode, username, answer} = req.body;

        if (typeof roomCode !== "string" || roomcode.trim() === ""){
            return req.status (400).json({error: "roomCode is required"});
        }
        if (typeof username !== "string" || answer.trim() === ""){
            return req.status (400).json({error: "username is required"});
            
        }
        if (typeof answer !== "string" || answer.trim() === ""){
            return req.status (400).json({error: "answers is required"});

        }
        const clean_room = roomCode.trim();
        const clean_answer = answer.trim();

        const game = await prisma.game.findUnique({
            where: {roomCode: clean_room}
        });
        if (!game) {
            return res.status (404).json({error:})
        }

    }
})