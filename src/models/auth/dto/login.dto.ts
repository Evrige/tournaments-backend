import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class LoginDto {
  @ApiProperty({ required: true, example: "user@gmail.com", description: "User email" })
  @IsEmail({}, { message: ErrorMessage.EMAIL })
  @IsString({ message: ErrorMessage.STRING })
  email: string;

  @ApiProperty({ required: true, example: "123456789", description: "User password" })
  @IsString({ message: ErrorMessage.STRING })
  @Length(6, 16, { message: ErrorMessage.PASSWORD })
  password: string;
}
