/*
  Warnings:

  - You are about to drop the column `map` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "map",
ADD COLUMN     "map_id" INTEGER;

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;
