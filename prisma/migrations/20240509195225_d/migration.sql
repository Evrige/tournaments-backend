/*
  Warnings:

  - You are about to drop the column `team1Id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `team2Id` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team2Id_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "team1Id",
DROP COLUMN "team2Id",
ADD COLUMN     "team1_id" INTEGER,
ADD COLUMN     "team2_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
