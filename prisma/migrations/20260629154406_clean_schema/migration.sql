/*
  Warnings:

  - You are about to drop the column `game_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `player_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `players` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gameId,text]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomCode]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Made the column `text` on table `Answer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomCode` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `letters` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_player_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_players_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_answers_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_game_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "game_id",
DROP COLUMN "player_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gameId" UUID NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "text" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "answers",
DROP COLUMN "players",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "roomCode" SET NOT NULL,
ALTER COLUMN "letters" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;

-- DropTable
DROP TABLE "Player";

-- CreateIndex
CREATE UNIQUE INDEX "Answer_gameId_text_key" ON "Answer"("gameId", "text");

-- CreateIndex
CREATE UNIQUE INDEX "Game_roomCode_key" ON "Game"("roomCode");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
