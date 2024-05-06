import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({required: true})
  nickname: string;

  @ApiProperty({required: true})
  email: string;

  @ApiProperty({required: true})
  password: string;
}
