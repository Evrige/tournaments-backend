import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import {PrismaService} from "../../prisma.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, JwtAuthGuard],
})
export class TeamModule {}
