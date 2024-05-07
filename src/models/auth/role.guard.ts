// import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
// import {Role} from "./role.decorator";
// import {Reflector} from "@nestjs/core";
// import {JwtService} from "@nestjs/jwt";
//
// @Injectable()
// export class RoleGuard implements CanActivate {
// 	constructor(private reflector: Reflector,
// 							private jwtService: JwtService) {}
//
//
// 	canActivate(context: ExecutionContext): boolean {
// 		const roles = this.reflector.get(Role, context.getHandler());
// 		if (!roles) {
// 			return true;
// 		}
// 		const request = context.switchToHttp().getRequest();
// 		const authHeader = request.headers.authorization;
// 		const bearer = authHeader.split(' ')[0]
// 		const token = authHeader.split(' ')[1]
//
// 		if (bearer !== 'Bearer' || !token) {
// 			throw new UnauthorizedException({message: 'Пользователь не авторизован'})
// 		}
//
// 		const user = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
// 		return user?.roles?.some(role => roles.includes(role.role.name));
// 	}
// }



import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from './role.decorator';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard'; // Импортируем JwtAuthGuard

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private jwtAuthGuard: JwtAuthGuard,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get(Role, context.getHandler());
		if (!roles) {
			return true;
		}

		await this.jwtAuthGuard.canActivate(context);

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user || !user.roles) {
			throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
		}

		return user.roles.some(role => roles.includes(role.role.name));
	}
}

