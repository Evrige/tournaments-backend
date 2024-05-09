/*
  Warnings:

  - You are about to drop the column `date` on the `Match` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournament_round_text` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "date",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tournament_round_text" TEXT NOT NULL;
