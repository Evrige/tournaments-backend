import { Module } from '@nestjs/common';
import { SseService } from './sse.service';
import { SseController } from './sse.controller';
import { UsersService } from "../users/users.service";
import { RoleService } from "../role/role.service";
import { PrismaService } from "../../prisma.service";

@Module({
  controllers: [SseController],
  providers: [SseService, UsersService, RoleService, PrismaService],
})
export class SseModule {}
