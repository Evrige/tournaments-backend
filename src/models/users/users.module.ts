import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Module({
  controllers: [UsersController],
  providers: [
    JwtAuthGuard,
    JwtService,
    UsersService,
    PrismaService,
    RoleService],
  imports: [],
  exports: [UsersService]
})

export class UsersModule {}
