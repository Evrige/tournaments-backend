import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from './role.decorator';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

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

