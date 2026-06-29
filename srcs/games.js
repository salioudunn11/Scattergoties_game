const express = require("express");
const prisma = require("/db");
const { LETTERS, CATEGORY, pick} = require("/game_info");

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const room_code = req.body;

        if (typeof room_code !== "string" || room_code.trim() === "") {
            return res.status(400).json({error: "Missing roomcode"});
        }

        // topic = category
        const game = await prisma.game.create({
            data: {
                room_code: room_code.trim(),
                letters: pick(LETTERS),
                category: pick(CATEGORY),
            },
        });

        return res.status(201).json({
            room_code: game.room_code,
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
            select: {room_code: true, letters: true, category: true},
        });
        return res.json(games);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;