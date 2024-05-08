/*
  Warnings:

  - You are about to drop the column `isBanned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,role_id]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "UserRole_userId_roleId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isBanned",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_banned" BOOLEAN;

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_id_role_id_key" ON "UserRole"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
