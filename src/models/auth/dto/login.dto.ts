import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
	@ApiProperty({required: true, example: "user@gmail.com", description: "User email"})
	email: string;

	@ApiProperty({required: true, example: "123456789", description: "User password"})
	password: string;
}
