import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreateArenaDto} from "./dto/create-arena.dto";
import {TournamentDto} from "./dto/tournament.dto";
import {TournamentStatus} from "@prisma/client";
import {createMatch} from "../../utils/create-match";

@Injectable()
export class TournamentService {
	constructor(private prisma: PrismaService) {
	}

	async createArena(createArenaDto: CreateArenaDto) {
		const arena = await this.prisma.arens.create({
			data: createArenaDto
		});
		return arena;
	}

	async createTournament(TournamentDto: TournamentDto) {
		const tournament = await this.prisma.tournament.create({
			data: TournamentDto
		});
		const match = createMatch(tournament)
		const res = await this.prisma.match.createMany({
			data: match
		})
		if (res) return {message: "All good"}
	}

	async updateTournament(TournamentDto: TournamentDto) {
		const tournament = await this.prisma.tournament.update({
			where: {
				id: TournamentDto.id
			},
			data: TournamentDto
		});
		return tournament;
	}

	async getTournaments() {
		const tournamentList = await this.prisma.tournament.findMany({
			where: {
				status: {
					notIn: [TournamentStatus.FINISHED, TournamentStatus.CANCELLED]
				}
			}
		});
		return tournamentList;
	}


}
