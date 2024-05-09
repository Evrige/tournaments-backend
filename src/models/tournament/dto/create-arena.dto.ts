import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, Length } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class CreateArenaDto {
  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  name: string;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  location: string;

  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  capacity: number;
}
