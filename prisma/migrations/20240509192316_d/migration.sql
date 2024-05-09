/*
  Warnings:

  - You are about to drop the column `startTime` on the `Match` table. All the data in the column will be lost.
  - Added the required column `start_time` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "startTime",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "map" DROP NOT NULL,
ALTER COLUMN "team1_rounds_won" DROP NOT NULL,
ALTER COLUMN "team2_rounds_won" DROP NOT NULL;
