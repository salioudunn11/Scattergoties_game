-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT,
    "game_id" UUID,
    "player_id" UUID,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomCode" TEXT,
    "letters" TEXT,
    "category" TEXT,
    "players" UUID,
    "answers" UUID,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT,
    "game_id" UUID,
    "answers" UUID,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_players_fkey" FOREIGN KEY ("players") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_answers_fkey" FOREIGN KEY ("answers") REFERENCES "Answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
