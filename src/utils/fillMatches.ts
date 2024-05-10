import {Teams_List} from "@prisma/client";
import {MatchDto} from "../models/match/dto/match.dto";

export const fillMatches = (matches: MatchDto[], teams: Teams_List[]) => {
	const shuffleTeams = shuffle(teams);

	for (const match of matches){
		if (+match.tournamentRoundText === 1){
			match.team1Id = shuffleTeams.shift().teamId;
			match.team2Id = shuffleTeams.shift().teamId;
		}
	}

	return matches;
}


function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}