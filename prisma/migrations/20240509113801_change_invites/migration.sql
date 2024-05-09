/*
  Warnings:

  - You are about to drop the column `roleId` on the `User_Invites` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "User_Invites" DROP CONSTRAINT "User_Invites_roleId_fkey";

-- AlterTable
ALTER TABLE "User_Invites" DROP COLUMN "roleId",
ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING';
