import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateArenaDto } from "./dto/create-arena.dto";
import { TournamentDto } from "./dto/tournament.dto";
import { TournamentStatus } from "@prisma/client";
import { createMatch } from "../../utils/create-match";
import { UsersService } from "../users/users.service";
import { MatchService } from "../match/match.service";
import { fillMatches } from "../../utils/fillMatches";
import { ratingCalc } from "../../utils/rating-calc";

@Injectable()
export class TournamentService {
	constructor(
		private prisma: PrismaService,
		private usersService: UsersService,
		private matchService: MatchService,
	) {}

	async createArena(createArenaDto: CreateArenaDto) {
		const arena = await this.prisma.arens.create({
			data: createArenaDto,
		});
		return arena;
	}

	async createTournament(TournamentDto: TournamentDto) {
		const tournament = await this.prisma.tournament.create({
			data: TournamentDto,
		});
		const match = createMatch(tournament);
		const res = await this.prisma.match.createMany({
			data: match,
		});
		if (res) return { message: "All good" };
	}

	async updateTournament(TournamentDto: TournamentDto) {
		const tournament = await this.prisma.tournament.update({
			where: {
				id: TournamentDto.id,
			},
			data: TournamentDto,
		});
		return tournament;
	}

	async closeTournament(tournamentId: number) {
		const tournament = await this.prisma.tournament.update({
			where: {
				id: tournamentId,
			},
			data: {
				status: TournamentStatus.FINISHED,
			},
		});
		const teams = await this.prisma.teams_List.findMany({
			where: {
				tournamentId: tournamentId,
			},
		});
		for (const team of teams) {
			await this.prisma.result.create({
				data: {
					teamId: team.teamId,
					tournamentId: tournamentId,
					placement: team.placement,
				},
			});
			const tournament = await this.getTournament(tournamentId);
			const points = ratingCalc(tournament, team);
			const ratings = await this.prisma.team_Rating.upsert({
				where: {
					teamId: team.teamId,
				},
				update: {
					points: {
						increment: points,
					},
				},
				create: {
					teamId: team.teamId,
					points,
				},
			});
			const teamUsers = await this.prisma.user.findMany({
				where: {
					teamId: team.id,
				},
			});
			for (const user of teamUsers) {
				await this.prisma.result.create({
					data: {
						userId: user.id,
						tournamentId: tournamentId,
						placement: team.placement,
					},
				});
				await this.prisma.user_Rating.upsert({
					where: {
						userId: user.id,
					},
					update: {
						points: {
							increment: points,
						},
					},
					create: {
						userId: user.id,
						points,
					},
				});
			}
		}
		return tournament;
	}

	async getTournaments() {
		const tournamentList = await this.prisma.tournament.findMany({
			where: {
				status: {
					notIn: [TournamentStatus.FINISHED, TournamentStatus.CANCELLED],
				},
			},
			include: {
				game: true,
				arena: true,
				teamList: {
					include: {
						team: true,
					},
				},
			},
		});
		return tournamentList;
	}

	async getTournament(id: number): Promise<TournamentDto> {
		const tournament = await this.prisma.tournament.findUnique({
			where: {
				id,
			},
			include: {
				game: true,
				arena: true,
				teamList: {
					include: {
						team: true,
					},
				},
			},
		});
		return tournament;
	}

	async getMapsByGame(id: number) {
		const maps = await this.prisma.map.findMany({
			where: {
				gameId: id,
			},
		});
		return maps;
	}

	async getTeamsByTournament(id: number) {
		const teams = await this.prisma.teams_List.findMany({
			where: {
				tournamentId: id,
			},
			include: {
				team: true,
			},
		});
		return teams;
	}

	async joinTeamToTournament(teamId: number, tournamentId: number) {
		// const fullTeam = await this.prisma.user.findMany({
		// 	where: {
		// 		teamId: teamId
		// 	}
		// })
		// if (fullTeam.length != 5) {
		// 	return {message: "Team must have 5 players"}
		// }
		const team = await this.prisma.team.findUnique({
			where: {
				id: teamId,
			},
		});
		if (!team) {
			return { message: "Team not found" };
		}
		const alreadyRegister = await this.prisma.teams_List.findFirst({
			where: {
				tournamentId: tournamentId,
				teamId: teamId,
			},
		});
		if (alreadyRegister) {
			return { message: "Team already registered" };
		}
		const tournament = await this.getTournament(tournamentId);
		const teamRating = await this.prisma.team_Rating.findUnique({
			where: {
				teamId: team.id,
			},
		});
		// if (
		// 	(!teamRating && tournament.minRating > teamRating.points) ||
		// 	teamRating.points > tournament.maxRating
		// ) {
		// 	return { message: "Don't pass the requirements" };
		// }
		const result = await this.prisma.teams_List.create({
			data: {
				tournamentId: tournamentId,
				teamId: teamId,
				stage: 1,
				placement: tournament.teamCount,
			},
		});
		if (!result) return { message: "Error registration" };
		const tournamentData = await this.getTournament(tournamentId);
		return {
			tournament: tournamentData,
			message: "Registration successfully",
		};
	}

	async leaveTeamFromTournament(userId: number, tournamentId: number) {
		const teamId = (await this.usersService.findUserByid(userId)).teamId;
		const team = await this.prisma.team.findUnique({
			where: {
				id: teamId,
			},
		});
		if (!team) {
			return { message: "Team not found" };
		}
		const alreadyRegister = await this.prisma.teams_List.findFirst({
			where: {
				tournamentId: tournamentId,
				teamId: teamId,
			},
		});
		if (!alreadyRegister) {
			return { message: "Team not registered" };
		}
		const result = await this.prisma.teams_List.delete({
			where: {
				id: alreadyRegister.id,
			},
		});
		if (!result) return { message: "Error leave" };
		const tournamentData = await this.getTournament(tournamentId);
		return {
			tournament: tournamentData,
			message: "Leave successfully",
		};
	}

	// @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	// async checkClosedRegistrations() {
	// 	const currentDateTime = new Date();
	// 	const tournaments = await this.prisma.tournament.findMany({
	// 		where: {
	// 			registrationClosedAt: {
	// 				lte: currentDateTime,
	// 			},
	// 		},
	// 	});
	//
	// 	for (const tournament of tournaments) {
	// 		await this.runScriptForTournament(tournament);
	// 	}
	// }

	async handleStartTournament(tournamentId: number) {
		const tournament = await this.getTournament(tournamentId);
		await this.runScriptForTournament(tournament);
	}

	async runScriptForTournament(tournament: any) {
		const teams = await this.prisma.teams_List.findMany({
			where: {
				tournamentId: tournament.id,
			},
		});
		if (tournament.teamCount / 2 > teams.length) {
			await this.prisma.tournament.update({
				where: {
					id: tournament.id,
				},
				data: {
					status: TournamentStatus.CANCELLED,
				},
			});
			await this.prisma.teams_List.deleteMany({
				where: {
					tournamentId: tournament.id,
				},
			});
			return { message: "Tournament cancelled" };
		}
		const matches = await this.matchService.getMatchesByTournamentId(
			tournament.id,
		);
		const newMatches = fillMatches(matches, teams);
		for (const match of newMatches) {
			if (+match.tournamentRoundText === 1) {
				await this.prisma.match.update({
					where: {
						id: match.id,
					},
					data: {
						team1: {
							connect: { id: match.team1Id },
						},
						team2: {
							connect: { id: match.team2Id },
						},
					},
				});
			}
		}
		await this.prisma.tournament.update({
			where: {
				id: tournament.id,
			},
			data: {
				status: TournamentStatus.ONGOING,
			},
		});
	}
}
