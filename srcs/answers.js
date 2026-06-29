
const express = require("express");
const prisma = require("/db");
const router = express.Router();


router.post("/", async (req, res, next) => {
   
    try{
        const {room_codes, username, text} = req.body;
        
        if (typeof room_codes !== "string" || room_codes.trim() === ""){
            return req.status (400).json({error: "room_code is required"});
        }
        // player_id = username

        if (typeof username !== "string" || username.trim() === ""){
            return req.status (400).json({error: "username is required"});
            
        }

        // text = answer

        if (typeof text !== "string" || text.trim() === ""){
            return req.status (400).json({error: "Answer is required"});

        }
        const clean_room = room_codes.trim();
        const clean_text = text.trim();



        const game = await prisma.game.findUnique({
            where: {room_codes: clean_room}
        });
        if (!game) {
            return res.status (404).json({error: "No game with that room code"});   
        }
        if (clean_text[0].toUpperCase() !== game.letter.toUpperCase()) {
            return res
                .status (400)
                .json({error: `Answer must start with ${game.letter}`});
        }


        await prisma.text.create({
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

module.export = router;