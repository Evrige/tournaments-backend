/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('PLANNED', 'ONGOING', 'FINISHED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_user_id_fkey";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "status" "TournamentStatus" NOT NULL;

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "User_Role" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Role_user_id_role_id_key" ON "User_Role"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "User_Role" ADD CONSTRAINT "User_Role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Role" ADD CONSTRAINT "User_Role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
