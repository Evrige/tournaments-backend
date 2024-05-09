import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsInt, IsString, Length } from "class-validator";
import { ErrorMessage } from "../../../exceptions/types.exceptions";
import { TournamentType } from "@prisma/client";

export class TournamentDto {
  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  name: string;
  
  @ApiProperty()
  @IsInt({message: ErrorMessage.INT})
  id?: number;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  type: TournamentType;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  teamCount: string;

  @ApiProperty({required: true})
  @IsDate({message: ErrorMessage.DATE})
  date: Date;

  @ApiProperty()
  @IsInt({message: ErrorMessage.INT})
  minRating?: number;

  @ApiProperty()
  @IsInt({message: ErrorMessage.INT})
  maxRating?: number;

  @ApiProperty()
  @IsInt({message: ErrorMessage.INT})
  arenaId?: number;

  @ApiProperty()
  @IsInt({message: ErrorMessage.INT})
  prizePool?: number;
}
