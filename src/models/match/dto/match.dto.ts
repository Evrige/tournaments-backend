import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsInt, IsOptional, IsString} from "class-validator";
import {ErrorMessage} from "../../../exceptions/types.exceptions";

export class MatchDto {
	@ApiProperty({required: true})
	@IsString({message: ErrorMessage.STRING})
	id: string;

	@ApiProperty()
	@IsOptional()
	@IsString({message: ErrorMessage.STRING})
	nextMatchId?: string;

	@ApiProperty()
	@IsOptional()
	@IsInt({message: ErrorMessage.INT})
	team1Id?: number;

	@ApiProperty()
	@IsOptional()
	@IsInt({message: ErrorMessage.INT})
	team2Id?: number;

	@ApiProperty()
	@IsOptional()
	@IsInt({message: ErrorMessage.INT})
	teamWinId?: number;

	@ApiProperty()
	@IsString({message: ErrorMessage.STRING})
	tournamentRoundText: string;

	@ApiProperty({required: true})
	@IsDateString({}, {message: ErrorMessage.DATE})
	startTime: Date;

	@ApiProperty()
	@IsInt({message: ErrorMessage.INT})
	tournamentId: number;

	@ApiProperty()
	@IsOptional()
	@IsString({message: ErrorMessage.STRING})
	map?: string;

	@ApiProperty()
	@IsString({message: ErrorMessage.STRING})
	state: string;

	@ApiProperty()
	@IsOptional()
	@IsString({message: ErrorMessage.STRING})
	team1RoundsWon?: number;

	@ApiProperty()
	@IsOptional()
	@IsString({message: ErrorMessage.STRING})
	team2RoundsWon?: number;
}
