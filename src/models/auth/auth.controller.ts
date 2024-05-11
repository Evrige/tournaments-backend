import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "../users/dto/user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import { Request, Response } from 'express';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService,
							private readonly usersService: UsersService) {
	}

	@ApiOperation({summary: "Registration"})
	@ApiResponse({status: 200, type: UserDto})
	@Post("/registration")
	registration(@Body() createUserDto: CreateUserDto) {
		return this.authService.registration(createUserDto);
	}


	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Req() req, @Res({ passthrough: true }) res: Response): Promise<void> {
		const { accessToken } = await this.authService.generateToken(req.user);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: false,
			expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
		}).send({ status: 'ok' });
	}



	// }@ApiOperation({summary: "Login"})
	// @ApiResponse({status: 200, type: UserDto})
	// @UseGuards(LocalAuthGuard)
	// @Post('/login')
	// async login(@Body() loginDto: LoginDto,
	// 						@Request() req: Request & { user: LoginDto }) {
	// 	const res =  this.authService.generateToken(req.user);
	// 	console.log(req.user)
	// }

	@ApiOperation({summary: "Registration"})
	@ApiResponse({status: 200, type: UserDto})
	@Post("/refreshToken")
	refreshToken(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
		return this.authService.registration(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getProfile(@Req() req) {
		console.log(req.user)
		return req.user;
	}
}
