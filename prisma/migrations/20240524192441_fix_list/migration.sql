/*
  Warnings:

  - A unique constraint covering the columns `[team_id,tournament_id]` on the table `Teams_List` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Teams_List_team_id_tournament_id_key" ON "Teams_List"("team_id", "tournament_id");
