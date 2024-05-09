/*
  Warnings:

  - Added the required column `name` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_arena_id_fkey";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "name" INTEGER NOT NULL,
ALTER COLUMN "prize_pool" DROP NOT NULL,
ALTER COLUMN "min_rating" DROP NOT NULL,
ALTER COLUMN "max_rating" DROP NOT NULL,
ALTER COLUMN "arena_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "Arens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
