/*
  Warnings:

  - You are about to drop the column `Capacity` on the `Arens` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Arens` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Arens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Arens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Arens" DROP COLUMN "Capacity",
DROP COLUMN "Location",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
