/*
  Warnings:

  - You are about to drop the column `is_banned` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'BANNED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_banned",
ADD COLUMN     "status" TEXT;
