import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsDateString, IsInt, IsOptional, IsString} from "class-validator";
import {ErrorMessage} from "../../../exceptions/types.exceptions";
import {TournamentStatus, TournamentType} from "@prisma/client";

export class TournamentDto {
  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  id?: number;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  name: string;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  type: TournamentType;

  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  teamCount: number;

  @ApiProperty({required: true})
  @IsDateString({}, {message: ErrorMessage.DATE})
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  minRating?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  maxRating?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  format?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  arenaId?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({message: ErrorMessage.INT})
  prizePool?: number;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  status: TournamentStatus;

  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  gameId: number;

  @ApiProperty({required: true})
  @IsOptional()
  @IsDateString({}, {message: ErrorMessage.DATE})
  registrationClosedAt: Date;
}
