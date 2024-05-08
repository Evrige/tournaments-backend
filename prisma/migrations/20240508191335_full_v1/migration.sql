-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "team_id" INTEGER;

-- CreateTable
CREATE TABLE "User_Rating" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Logo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team_Rating" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Team_Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams_List" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "stage" INTEGER NOT NULL,

    CONSTRAINT "Teams_List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "prize_pool" INTEGER NOT NULL DEFAULT 0,
    "type" "TournamentType" NOT NULL,
    "team_count" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "min_rating" INTEGER NOT NULL,
    "max_rating" INTEGER NOT NULL,
    "arena_id" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Capacity" INTEGER NOT NULL,

    CONSTRAINT "Arens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "Placment" INTEGER NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "team_id" INTEGER,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "team1Id" INTEGER NOT NULL,
    "team2Id" INTEGER NOT NULL,
    "next_match_id" INTEGER,
    "team_win_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match_Statisctic" (
    "id" SERIAL NOT NULL,
    "map" TEXT NOT NULL,
    "team1_rounds_won" INTEGER NOT NULL,
    "team2_rounds_won" INTEGER NOT NULL,
    "match_id" INTEGER NOT NULL,

    CONSTRAINT "Match_Statisctic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "match_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Rating_user_id_key" ON "User_Rating"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_Rating_team_id_key" ON "Team_Rating"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_Statisctic_match_id_key" ON "Match_Statisctic"("match_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Rating" ADD CONSTRAINT "User_Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team_Rating" ADD CONSTRAINT "Team_Rating_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams_List" ADD CONSTRAINT "Teams_List_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "Arens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_team_win_id_fkey" FOREIGN KEY ("team_win_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match_Statisctic" ADD CONSTRAINT "Match_Statisctic_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
