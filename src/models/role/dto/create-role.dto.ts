import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
	@ApiProperty({required: true})
	readonly name: UserRoleEnum;
}
export enum UserRoleEnum {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	ANALYST = 'ANALYST',
}