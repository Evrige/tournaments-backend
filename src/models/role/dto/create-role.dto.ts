import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";
import { RoleName } from "@prisma/client";

export class CreateRoleDto {
	@ApiProperty({required: true})
	@IsString({message: ErrorMessage.STRING})
	readonly name: RoleName;
}