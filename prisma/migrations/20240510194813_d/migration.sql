/*
  Warnings:

  - You are about to drop the column `Logo` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "Logo",
ADD COLUMN     "logo" TEXT DEFAULT './uploads/default-team-logo.jpg';
