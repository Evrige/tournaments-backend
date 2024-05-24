import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { MatchDto } from "./dto/match.dto";

@Injectable()
export class MatchService {
	constructor(private prisma: PrismaService) {}

	async updateMatch(MatchDto: MatchDto) {
		const match = await this.prisma.match.update({
			where: {
				id: MatchDto.id,
			},
			data: MatchDto,
		});
		await this.prisma.teams_List.update({
			where: {
				teamId_tournamentId: {
					teamId: match.teamWinId,
					tournamentId: match.tournamentId,
				},
			},
			data: {
				placement: {
					divide: 2,
				},
			},
		});
		if (match.teamWinId && match.nextMatchId) {
			const nextMatch = await this.prisma.match.findUnique({
				where: {
					id: match.nextMatchId,
				},
			});
			const teamToUpdate = nextMatch.team1Id ? "team2Id" : "team1Id";
			await this.prisma.match.update({
				where: {
					id: match.nextMatchId,
				},
				data: {
					[teamToUpdate]: match.teamWinId,
				},
			});
		}
		return this.prisma.match.findUnique({
			where: {
				id: MatchDto.id,
			},
			include: {
				team1: true,
				team2: true,
			},
		});
	}

	async getMatchesByTournamentId(id: number) {
		const matches = await this.prisma.match.findMany({
			where: {
				tournamentId: +id,
			},
			include: {
				team1: {
					include: {
						user: {
							select: {
								id: true,
								nickname: true,
								avatar: true,
							},
						},
					},
				},
				team2: {
					include: {
						user: {
							select: {
								id: true,
								nickname: true,
								avatar: true,
							},
						},
					},
				},
				map: true,
			},
		});
		return matches;
	}
}
