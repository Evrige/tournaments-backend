import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Request, Response } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: "Registration" })
	@ApiResponse({ status: 200, type: UserDto })
	@Post("/registration")
	async registration(
		@Body() createUserDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.registration(createUserDto);
		this.setCookies(res, accessToken, refreshToken);
		return { user, message: "Registration success" };
	}

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		const { user, accessToken, refreshToken } =
			await this.authService.generateToken(req.user);
		this.setCookies(res, accessToken, refreshToken);
		return {
			user,
			message: "Login success",
		};
	}

	@ApiOperation({ summary: "Refresh tokens" })
	@ApiResponse({ status: 200, type: UserDto })
	@Post("/refreshToken")
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.refreshTokens(req.cookies.refreshToken);
		this.setCookies(res, accessToken, refreshToken);
		return {
			user: user,
			message: "Tokens refreshing",
		};
	}

	@UseGuards(JwtAuthGuard)
	@Get("/profile")
	getProfile(@Req() req) {
		return req.user;
	}

	private setCookies(
		res: Response,
		accessToken: string,
		refreshToken: string,
	): void {
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			expires: new Date(Date.now() + 1 * 3 * 60 * 1000),
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
		});
	}
}
