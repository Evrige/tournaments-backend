import { Teams_List } from "@prisma/client";
import { TournamentDto } from "../models/tournament/dto/tournament.dto";

export const ratingCalc = (tournament: TournamentDto, team: Teams_List) => {
	let points = 0;
	switch (true) {
		case team.placement <= 8:
			points = (tournament.maxRating || 500 * 0.1) / team.placement;
			break;
		case team.placement <= 16:
			points = 10;
			break;
		case team.placement > 16 && team.placement <= 32:
			points = -10;
			break;
		case team.placement > 32 && team.placement <= 64:
			points = -20;
			break;
			default: points = -30
	}

	return Math.ceil(points / 10) * 10;
};
