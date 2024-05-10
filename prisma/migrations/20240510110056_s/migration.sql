/*
  Warnings:

  - Added the required column `tournamnent_id` to the `Teams_List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams_List" ADD COLUMN     "tournamnent_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Teams_List" ADD CONSTRAINT "Teams_List_tournamnent_id_fkey" FOREIGN KEY ("tournamnent_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
