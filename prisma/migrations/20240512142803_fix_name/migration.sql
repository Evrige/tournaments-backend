/*
  Warnings:

  - You are about to drop the column `placment` on the `Result` table. All the data in the column will be lost.
  - Added the required column `placement` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "placment",
ADD COLUMN     "placement" INTEGER NOT NULL;
