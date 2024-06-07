import {
	Body,
	Controller,
	Get, Param,
	Post, Put,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { GoogleOauthGuard } from "./google-oauth.guard";
import * as process from "node:process";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: "Registration" })
	@ApiResponse({ status: 201, description: "User created successfully" })
	@Post("/registration")
	async registration(
		@Body() createUserDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return	await this.authService.registration(createUserDto);
	}

	@ApiOperation({ summary: "Activate email" })
	@ApiResponse({ status: 201, description: "Email activated" })
	@Put("/confirmEmail/:token")
	async confirmEmail(
		@Param() params: any,
	) {
		return	await this.authService.confirmEmail(params.token);
	}

	@ApiOperation({ summary: "Logout" })
	@ApiResponse({ status: 201, description: "Logout successfully" })
	@UseGuards(JwtAuthGuard)
	@Get("/logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		return { message: "Logout successfully" };
	}

	@ApiOperation({ summary: "Login" })
	@ApiResponse({ status: 200, description: "Login successful", type: UserDto })
	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(
		@Body() loginDto: LoginDto,
		@Req() req,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.generateToken(req.user.id);
		this.setCookies(res, accessToken, refreshToken);
		return {
			user,
			message: "Login success",
		};
	}

	@Get("google")
	@UseGuards(GoogleOauthGuard)
	async googleAuth(@Req() req) {}

	@Get('google/callback')
	@UseGuards(GoogleOauthGuard)
	async googleAuthRedirect(@Req() req, @Res() res: Response) {
		const { user, accessToken, refreshToken } = await this.authService.googleLogin(req)
		this.setCookies(res, accessToken, refreshToken);
		 res.redirect(process.env.CLIENT_URL);
	}

	@ApiOperation({ summary: "Refresh tokens" })
	@ApiResponse({
		status: 200,
		description: "Tokens refreshed successfully",
		type: UserDto,
	})
	@Get("/refreshToken")
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		try {
			const { user, accessToken, refreshToken } =
				await this.authService.refreshTokens(req.cookies.refreshToken);
			this.setCookies(res, accessToken, refreshToken);
			return {
				user: user,
				message: "Tokens refreshing",
			};
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({ summary: "Get user profile" })
	@ApiResponse({
		status: 200,
		description: "User profile retrieved successfully",
		type: UserDto,
	})
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
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(Date.now() + 1 * 30 * 60 * 1000),
			sameSite: process.env.NODE_ENV === 'production' ? 'none': 'lax',
			path: "/"
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			sameSite: process.env.NODE_ENV === 'production' ? 'none': 'lax',
			path: "/"
		});
	}
}

