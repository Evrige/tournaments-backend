import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";

export class BanUserDto {
  @ApiProperty({required: true, example: "1", description: "user id"})
  @IsInt({message: ErrorMessage.INT})
  userId: number;

  @ApiProperty({required: true, example: "Using cheats", description: "Reason for ban"})
  @IsString({message: ErrorMessage.STRING})
  banReason: string;
}
