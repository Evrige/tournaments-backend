import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({required: true, example: "1", description: "Role identifier"})
  readonly id: number;
  @ApiProperty({required: true, example: "USER", description: "Role name(ADMIN, USER...)"})
  readonly name: UserRoleEnum;
}
export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ANALYST = 'ANALYST',
}