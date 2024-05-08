-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ban_reason" TEXT,
ADD COLUMN     "isBanned" BOOLEAN,
ALTER COLUMN "nickname" DROP NOT NULL;
