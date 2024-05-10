import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { PrismaService } from "../../prisma.service";
import {UsersService} from "../users/users.service";
import {RoleService} from "../role/role.service";

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, PrismaService, UsersService, RoleService],
})
export class TournamentModule {}
