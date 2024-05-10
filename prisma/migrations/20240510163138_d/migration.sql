/*
  Warnings:

  - You are about to drop the column `is_registration_open` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `registration_closed_at` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "is_registration_open",
ADD COLUMN     "registration_closed_at" TIMESTAMP(3) NOT NULL;
