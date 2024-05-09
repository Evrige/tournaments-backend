-- CreateTable
CREATE TABLE "User_Invites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "roleId" INTEGER,

    CONSTRAINT "User_Invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Invites_user_id_team_id_key" ON "User_Invites"("user_id", "team_id");

-- AddForeignKey
ALTER TABLE "User_Invites" ADD CONSTRAINT "User_Invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Invites" ADD CONSTRAINT "User_Invites_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Invites" ADD CONSTRAINT "User_Invites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
