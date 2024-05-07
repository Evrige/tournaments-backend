import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, RoleService]
})
export class AuthModule {
}
