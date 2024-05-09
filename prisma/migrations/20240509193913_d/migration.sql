/*
  Warnings:

  - The primary key for the `Match` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_match_id_fkey";

-- AlterTable
ALTER TABLE "Analysis" ALTER COLUMN "match_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Match" DROP CONSTRAINT "Match_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Match_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
