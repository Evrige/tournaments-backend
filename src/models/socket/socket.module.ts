import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { UsersService } from "../users/users.service";
import { RoleService } from "../role/role.service";
import { PrismaService } from "../../prisma.service";
import { JwtModule } from "@nestjs/jwt"; // Только импорт JwtModule, без JwtService
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    PassportModule
  ],
  controllers: [SocketController],
  providers: [SocketService, UsersService, RoleService, PrismaService, AuthService],
})
export class SocketModule {}
