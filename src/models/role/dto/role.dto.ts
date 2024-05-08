import { ApiProperty } from "@nestjs/swagger";
import { RoleName } from "@prisma/client";
import { IsInt, IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class RoleDto {
  @ApiProperty({required: true, example: "1", description: "Role identifier"})
  @IsInt({message: ErrorMessage.INT})
  readonly id: number;
  @ApiProperty({required: true, example: "USER", description: "Role name(ADMIN, USER...)"})
  @IsString({message: ErrorMessage.STRING})
  readonly name: RoleName;
}
