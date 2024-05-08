import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreateTeamDto} from "./dto/create-team.dto";

@Injectable()
export class TeamService {
	constructor(private prisma: PrismaService) {
	}

	async createTeam(CreateTeamDto: CreateTeamDto) {
		const team = await this.prisma.team.create({
			data: CreateTeamDto
		});

		return team;
	}

	async deleteTeam(id: number) {
		await this.prisma.team.delete({
			where: {
				id: id
			}
		});
		return {
			message: "Team deleted successfully"
		}
	}
}
