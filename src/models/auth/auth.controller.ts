import {Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "../users/dto/user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {LoginDto} from "./dto/login.dto";

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
	@ApiOperation({summary: "Login"})
	@ApiResponse({status: 200, type: UserDto})
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Body() loginDto: LoginDto,
							@Request() req: Request & { user: LoginDto }) {
		return this.authService.generateToken(req.user);
	}

	@ApiOperation({summary: "Registration"})
	@ApiResponse({status: 200, type: UserDto})
	@Post("/registration")
	refreshToken(@Body() createUserDto: CreateUserDto) {
		return this.authService.registration(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
