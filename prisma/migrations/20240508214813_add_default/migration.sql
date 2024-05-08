-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "Logo" DROP NOT NULL,
ALTER COLUMN "Logo" SET DEFAULT './uploads/default-team-logo.jpg';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET DEFAULT './uploads/default-profile-logo.jpg';
