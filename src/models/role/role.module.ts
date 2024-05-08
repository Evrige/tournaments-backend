import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {PrismaService} from "../../prisma.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, JwtAuthGuard],
  exports: [RoleService]
})
export class RoleModule {}
