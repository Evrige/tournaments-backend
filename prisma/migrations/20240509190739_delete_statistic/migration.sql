/*
  Warnings:

  - You are about to drop the `Match_Statisctic` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `map` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team1_rounds_won` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team2_rounds_won` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match_Statisctic" DROP CONSTRAINT "Match_Statisctic_match_id_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "map" TEXT NOT NULL,
ADD COLUMN     "team1_rounds_won" INTEGER NOT NULL,
ADD COLUMN     "team2_rounds_won" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Match_id_seq";

-- DropTable
DROP TABLE "Match_Statisctic";

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_name_key" ON "Tournament"("name");
