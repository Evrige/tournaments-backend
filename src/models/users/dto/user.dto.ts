import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsFQDN, IsInt, IsString, Length} from "class-validator";
import {ErrorMessage} from "../../../exceptions/types.exceptions";

export class UserDto {
	@ApiProperty({example: "1", description: "User id"})
	@IsInt({message: ErrorMessage.INT})
	id?: number;

	@ApiProperty({example: "Evrige", description: "User nickname"})
	@IsString({message: ErrorMessage.STRING})
	nickname?: string;

	@ApiProperty({required: true, example: "user@gmail.com", description: "User email"})
	@IsString({message: ErrorMessage.STRING})
	@IsEmail({}, {message: ErrorMessage.EMAIL})
	email: string;

	@ApiProperty({required: true, example: "123456789", description: "User password"})
	@IsString({message: ErrorMessage.STRING})
	@Length(6, 16, {message: ErrorMessage.PASSWORD})
	password: string;

	@ApiProperty({example: "Artur", description: "User name"})
	@IsString({message: ErrorMessage.STRING})
	name?: string;

	@ApiProperty({example: "Dudnik", description: "User lastname"})
	@IsString({message: ErrorMessage.STRING})
	lastname?: string;

	@ApiProperty({example: "20", description: "User age"})
	@IsInt({message: ErrorMessage.INT})
	age?: number;

	@ApiProperty({example: "url/user1.jpg", description: "link to profile image"})
	@IsFQDN({}, {message: ErrorMessage.LINK})
	avatar?: string;

	@ApiProperty({example: "false", description: "User is banned?"})
	@IsBoolean({message: ErrorMessage.BOOL})
	isBanned?: boolean;

	@ApiProperty({example: "using cheats", description: "Reason for ban"})
	@IsString({message: ErrorMessage.STRING})
	banReason?: string;

	@ApiProperty({example: "2024-01-05", description: "When profile created"})
	@IsString({message: ErrorMessage.STRING})
	createdAt?: Date;

	@ApiProperty({example: "USER, ADMIN", description: "Users role"})
	roles?: Roles[];
}

interface Roles {
  role: {
    id: number
    name: string
  }
}
