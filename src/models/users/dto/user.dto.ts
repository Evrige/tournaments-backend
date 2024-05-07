import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
	@ApiProperty({example: "1", description: "User id"})
	id?: number;

	@ApiProperty({example: "Evrige", description: "User nickname"})
	nickname?: string;

	@ApiProperty({required: true, example: "user@gmail.com", description: "User email"})
	email: string;

	@ApiProperty({required: true, example: "123456789", description: "User password"})
	password: string;

	@ApiProperty({example: "Artur", description: "User name"})
	name?: string;

	@ApiProperty({example: "Dudnik", description: "User lastname"})
	lastname?: string;

	@ApiProperty({example: "20", description: "User age"})
	age?: number;

	@ApiProperty({example: "url/user1.jpg", description: "link to profile image"})
	avatar?: string;

	@ApiProperty({example: "USER, ADMIN", description: "Users role"})
	roles?: Roles[];
}

interface Roles {
  role: {
    id: number
    name: string
  }
}
