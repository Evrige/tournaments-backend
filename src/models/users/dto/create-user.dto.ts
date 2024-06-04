import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class CreateUserDto {
  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  nickname: string;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  @IsEmail({}, {message: ErrorMessage.EMAIL})
  email: string;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  password: string;
}
