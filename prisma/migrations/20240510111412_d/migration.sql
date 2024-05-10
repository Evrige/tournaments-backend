/*
  Warnings:

  - You are about to drop the column `tournamnent_id` on the `Teams_List` table. All the data in the column will be lost.
  - Added the required column `tournament_id` to the `Teams_List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teams_List" DROP CONSTRAINT "Teams_List_tournamnent_id_fkey";

-- AlterTable
ALTER TABLE "Teams_List" DROP COLUMN "tournamnent_id",
ADD COLUMN     "tournament_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Teams_List" ADD CONSTRAINT "Teams_List_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
