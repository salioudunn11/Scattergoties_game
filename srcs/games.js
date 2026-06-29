import express from "express";
import prisma from "./db.js";
import { LETTERS, CATEGORY, pick } from "./game_info.js";


const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { roomCode } = req.body;

        if (typeof roomCode !== "string" || roomCode.trim() === "") {
            return res.status(400).json({error: "Missing roomcode"});
        }

        // topic = category
        const game = await prisma.game.create({
            data: {
                roomCode: roomCode.trim(),
                letters: pick(LETTERS),
                category: pick(CATEGORY),
            },
        });

        return res.status(201).json({
            roomCode: game.roomCode,
            letters: game.letters,
            category: game.category,
        });
    } catch (err) {
        if (err.code === "P2002") {
            return res.status(409).json({error: "Duplicate RoomCode"});
        }
        return next(err);
    }
});

router.get("/", async (req,res,next) => {
    try {
        const games = await prisma.game.findMany({
            select: {roomCode: true, letters: true, category: true},
        });
        return res.json(games);
    } catch (err) {
        return next(err);
    }
});

export default router;