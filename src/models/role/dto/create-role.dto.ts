export class CreateRoleDto {
	readonly name: UserRoleEnum;
}
export enum UserRoleEnum {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	ANALYST = 'ANALYST',
}