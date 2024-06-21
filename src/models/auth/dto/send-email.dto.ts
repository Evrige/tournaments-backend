import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class SendEmailDto {
	@ApiProperty({ required: true, example: "user@gmail.com", description: "User email" })
	@IsEmail({}, { message: ErrorMessage.EMAIL })
	@IsString({ message: ErrorMessage.STRING })
	email: string;
}
