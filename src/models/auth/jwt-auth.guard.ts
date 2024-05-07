import {Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

}



// import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
//
// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		const canActivate = await super.canActivate(context);
// 		if (!canActivate) {
// 			throw new UnauthorizedException('Пользователь не авторизован');
// 		}
// 		return true;
// 	}
// 	handleRequest(err: any, user: any): any {
// 		if (err || !user) {
// 			throw err || new UnauthorizedException('Пользователь не авторизован');
// 		}
// 		return user;
// 	}
// }

