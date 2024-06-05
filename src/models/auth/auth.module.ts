import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { GoogleStrategy } from "./google-oauth.strategy";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRES_IN,
			},
		}),
		PassportModule,
		UsersModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UsersService,
		PrismaService,
		RoleService,
		LocalStrategy,
		JwtStrategy,
		GoogleStrategy
	],
	exports: [AuthService]
})
export class AuthModule {}
