import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class CreateGameDto {
	@ApiProperty({ required: true })
	@IsString({ message: ErrorMessage.STRING })
	name: string;

	@ApiProperty({ required: true })
	image: string;

	@ApiProperty({ required: true })
	logo: string;
}
