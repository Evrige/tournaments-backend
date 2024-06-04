import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dto/user.dto";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async registration(
		User: CreateUserDto,
	): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
		const user = await this.usersService.findUser(User.email);
		if (user) {
			throw new HttpException(
				"User already registered",
				HttpStatus.BAD_REQUEST,
			);
		}

		const newUser = await this.usersService.createUser({
			...User,
		});
		return this.generateToken(newUser.id);
	}

	async generateToken(
		id: number,
	): Promise<{ user: any; accessToken: string; refreshToken: string }> {
		const { password, ...userData } = await this.usersService.findUserByid(id);
		try {
			const accessToken = this.jwtService.sign({
				nickname: userData.nickname,
				userId: userData.id,
			});
			const refreshToken = this.jwtService.sign({
				nickname: userData.nickname,
				userId: userData.id,
			});
			const user = userData
			return { user, accessToken, refreshToken };
		} catch (error) {
			throw new HttpException(
				"Token generation failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async refreshTokens(
		refreshToken: string,
	): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
		try {
			const decodedToken = this.jwtService.verify(refreshToken);
			if (
				typeof decodedToken !== "object" ||
				!decodedToken.hasOwnProperty("userId")
			) {
				throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
			}
			const user = decodedToken;
			return this.generateToken(user.userId);
		} catch (error) {
			throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
		}
	}
	async verifyToken(token: string){
		return await this.jwtService.verify(token)
	}
	async validateUser(email: string, password: string): Promise<any> {
		try {
			const user = await this.usersService.findUser(email);
			if (!user) {
				return null;
			}
			console.log(password);
			console.log(user.password);
			const pass = await bcrypt.compare(password, user.password);
			if (pass) {
				return user;
			}
			return null;
		} catch (error) {
			throw new HttpException(
				"User validation failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
