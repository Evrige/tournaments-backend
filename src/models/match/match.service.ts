import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {MatchDto} from "./dto/match.dto";

@Injectable()
export class MatchService {
	constructor(private prisma: PrismaService) {
	}

	async updateMatch(MatchDto: MatchDto) {
		const match = await this.prisma.match.update({
			where: {
				id: MatchDto.id
			},
			data: MatchDto
		});
		return this.prisma.match.findUnique({
			where: {
        id: MatchDto.id
      },
			include: {
        team1: true,
        team2: true
      }
		});
	}

	async getMatchesByTournamentId(id: number){
		const matches = await this.prisma.match.findMany({
			where: {
				tournamentId: +id
			},
			include: {
				team1: true,
        team2: true
			}
		});
		return matches;
	}
}
