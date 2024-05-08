import { ApiProperty } from "@nestjs/swagger";
import { RoleName } from "@prisma/client";
import { IsInt, IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class AddRoleDto {
  @ApiProperty({required: true, example: "ADMIN", description: "Name of the role to add"})
  @IsString({message: ErrorMessage.STRING})
  value: RoleName;

  @ApiProperty({required: true, example: "1", description: "user id"})
  @IsInt({message: ErrorMessage.INT})
  userId: number;
}
