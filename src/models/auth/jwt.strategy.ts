import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJWTFromCookie,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY,
		});
	}

	private static extractJWTFromCookie(req: Request): string | null {
		console.log(req.cookies)
		if (req.cookies && req.cookies.accessToken) {
			return req.cookies.accessToken;
		}
		return null;
	}


	async validate(payload: any) {

		return { userId: payload.userId, nickname: payload.nickname };
	}
}