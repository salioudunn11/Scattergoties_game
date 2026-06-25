const express = require("express");
const prisma = require("/db");
const { LETTERS, TOPICS, pick} = require("/game_info");

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const roomCode = req.body;

        if (typeof roomCode !== "string" || roomCode.trim() === "") {
            return res.status(400).json({error: "Missing roomcode"});
        }

        const game = await prisma.game.create({
            data: {
                roomCode: roomCode.trim(),
                letter: pick(LETTERS),
                topic: pick(TOPICS),
            },
        });

        return res.status(201).json({
            roomCode: game.roomCode,
            letter: game.letter,
            topic: game.topic,
        });
    } catch (err) {
        if (err.code === "P2002") {
            return res.status(409).json({error: "Duplicate RoomCode"});
        }
        return next(err);
    }
});
