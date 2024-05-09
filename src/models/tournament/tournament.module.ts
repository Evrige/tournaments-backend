import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { PrismaService } from "../../prisma.service";

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, PrismaService],
})
export class TournamentModule {}
