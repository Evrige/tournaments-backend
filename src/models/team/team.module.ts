import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import {PrismaService} from "../../prisma.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../users/users.service";
import {RoleService} from "../role/role.service";

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, JwtAuthGuard, UsersService, RoleService],
})
export class TeamModule {}
