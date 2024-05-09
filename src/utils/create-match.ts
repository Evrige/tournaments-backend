import { v4 as uuid } from 'uuid';
import {TournamentDto} from "../models/tournament/dto/tournament.dto";

export const createMatch = (TournamentDto: TournamentDto) => {

	const stageCount = calculatePlayoffMatches(TournamentDto.teamCount);
	let matches = [];
	let matchIds = [];

	for (let i = 0; i < stageCount; i++) {
		const stageMatches = [];
		TournamentDto.teamCount /= 2;

		for (let j = 0; j < TournamentDto.teamCount; j++) {
			const matchId = uuid();
			const startDate = new Date(TournamentDto.date.getTime());
			matchIds.push(matchId);
			stageMatches.push({
				id: matchId,
				nextMatchId: null,
				tournamentRoundText: `${i + 1}`,
				startTime: new Date(startDate.setDate(startDate.getDate() + i)),
				state: "SCHEDULED",
				tournamentId: TournamentDto.id,
			});
		}

		matches.push(stageMatches);
	}

	for (let i = 0; i < matches.length - 1; i++) {
		const currentStageMatches = matches[i];
		const nextStageMatches = matches[i + 1];

		for (let j = 0; j < currentStageMatches.length; j++) {
			const currentMatch = currentStageMatches[j];
			const nextMatchIndex = Math.floor(j / 2);
			currentMatch.nextMatchId = nextStageMatches[nextMatchIndex].id;
		}
	}

	return matches.flat();
}

function calculatePlayoffMatches(numTeams: number): number {
	let stageMatchCount = 0;
	while (numTeams !== 1) {
		numTeams = numTeams / 2;
		stageMatchCount++;
	}
	return stageMatchCount;
}