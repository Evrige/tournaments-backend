import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreateArenaDto} from "./dto/create-arena.dto";
import {TournamentDto} from "./dto/tournament.dto";
import {TournamentStatus} from "@prisma/client";
import {createMatch} from "../../utils/create-match";
import {UsersService} from "../users/users.service";

@Injectable()
export class TournamentService {
	constructor(private prisma: PrismaService, private usersService: UsersService) {
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

	async getTournament(id: number): Promise<TournamentDto>{
		const tournament = await this.prisma.tournament.findUnique({
			where: {
				id
			}
		});
		return tournament;
	}

	async joinTeamToTournament(userId: number, tournamentId: number) {
		const teamId = (await this.usersService.findUserByid(userId)).teamId;
		const fullTeam = await this.prisma.user.findMany({
			where: {
        teamId: teamId
      }
		})
		if(fullTeam.length != 5){
			return {message: "Team must have 5 players"}
		}
		const team = await this.prisma.team.findUnique({
			where: {
        id: teamId
      }
		})
		if (!team) {
      return {message: "Team not found"}
    }
		const alreadyRegister = await this.prisma.teams_List.findFirst({
			where: {
        tournamentId: tournamentId,
        teamId: teamId
      }
		})
		if (alreadyRegister) {
			return {message: "Team already registered"}
		}
		// проверка по рейтингу
		const result = await this.prisma.teams_List.create({
			data: {
        tournamentId: tournamentId,
        teamId: teamId,
				stage: 1,
				placement: (await this.getTournament(tournamentId)).teamCount
      }
		})
	}
}
