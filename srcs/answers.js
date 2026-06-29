
const express = require("express");
const prisma = require("/db");
const router = express.Router();


router.post("/", async (req, res, next) => {
   
    try{
        const {room_codes, player_id, text} = req.body;
        
        if (typeof room_codes !== "string" || room_codes.trim() === ""){
            return req.status (400).json({error: "roomCode is required"});
        }
        // player_id = username

        if (typeof player_id !== "string" || player_id.trim() === ""){
            return req.status (400).json({error: "username is required"});
            
        }

        // text = answer

        if (typeof text !== "string" || text.trim() === ""){
            return req.status (400).json({error: "answers is required"});

        }
        const clean_room = room_codes.trim();
        const clean_answer = text.trim();



        const game = await prisma.game.findUnique({
            where: {room_codes: clean_room}
        });
        if (!game) {
            return res.status (404).json({error: "No game with that room code"});   
        }
        if (clean_answer[0].toUpperCase() !== game.letter.toUpperCase()) {
            return res
                .status (400)
                .json({error: `Answer must start with ${game.letter}`});
        }


        await prisma.answer.create({
            data: {
                game_id: game.id,
                player_id: player_id.trim(),
                text: clean_answer,
            },
        });
        res.status(201).json({ accepted: true });
    } 
        catch (err) {
        
            if ((err as {code?: string }).code === "P2002"){
            res.status(409).json({ error: "Answer already taken"});
            return;
        }
        next(err);
    }
});

export default router;