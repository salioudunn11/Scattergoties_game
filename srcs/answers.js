
import express from "express";
import prisma from "./db.js";
const router = express.Router();


router.post("/", async (req, res, next) => {
   
    try{
        const {roomCode, username, text} = req.body;
        
        if (typeof roomCode !== "string" || roomCode.trim() === ""){
            return res.status (400).json({error: "roomCode is required"});
        }
        // player_id = username

        if (typeof username !== "string" || username.trim() === ""){
            return res.status (400).json({error: "username is required"});
            
        }

        // text = answer

        if (typeof text !== "string" || text.trim() === ""){
            return res.status (400).json({error: "Answer is required"});

        }
        const clean_room = roomCode.trim();
        const clean_text = text.trim();



        const game = await prisma.game.findUnique({
            where: {roomCode: clean_room}
        });
        if (!game) {
            return res.status (404).json({error: "No game with that room code"});   
        }
        if (clean_text[0].toUpperCase() !== game.letters.toUpperCase()) {
            return res
                .status (400)
                .json({error: `Answer must start with ${game.letters}`});
        }


        await prisma.answer.create({
            data: {
                game_id: game.id,
                username: username.trim(),
                text: clean_text,
            },
        });
        res.status(201).json({ accepted: true });
    } 
        catch (err) {
        
            if (err.code === "P2002"){
            res.status(409).json({ error: "Answer already taken"});
            return;
        }
        next(err);
    }
});

export default router;