-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_team2Id_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "team1Id" DROP NOT NULL,
ALTER COLUMN "team2Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
