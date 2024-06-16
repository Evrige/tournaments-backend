import { ApiProperty } from "@nestjs/swagger";
import {  IsString, Length } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class ChangePasswordDto {
	@ApiProperty({ required: true, example: "123456789", description: "User current password" })
	@IsString({ message: ErrorMessage.STRING })
	@Length(6, 16, { message: ErrorMessage.PASSWORD })
	currentPassword: string;

	@ApiProperty({ required: true, example: "123456789", description: "User new password" })
	@IsString({ message: ErrorMessage.STRING })
	newPassword: string;
}
