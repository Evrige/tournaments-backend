/*
  Warnings:

  - Added the required column `placement` to the `Teams_List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams_List" ADD COLUMN     "placement" INTEGER NOT NULL;
