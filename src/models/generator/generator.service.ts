import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {RoleName} from "@prisma/client";
import * as faker from 'faker';
import {RoleService} from "../role/role.service";
import {TournamentService} from "../tournament/tournament.service";
import {TeamService} from "../team/team.service";
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class GeneratorService {
	constructor(private prisma: PrismaService,
							private roleService: RoleService,
							private tournamentService: TournamentService,
							private teamService: TeamService,
							private usersService: UsersService,
							private authService: AuthService,
	) {
	}

	async generate() {
		// const roles = [
		// 	{ name: RoleName.ADMIN },
		// 	{ name: RoleName.USER },
		// 	{ name: RoleName.MANAGER },
		// 	{ name: RoleName.ANALYST },
		// ];
		// for (const role of roles) {
		// 	await this.roleService.createRole(role)
		// }
		//
		//
		// const arens = []
		// for (let i = 0; i < 10; i++) {
		// 	arens.push({
		//     name: `${faker.address.city()} arena`,
		// 		capacity: faker.random.number({min: 2000, max: 10000, precision: 1000}),
		// 		location: faker.address.streetAddress()
		//   })
		// }
		// for (const arena of arens) {
		// 	await this.tournamentService.createArena(arena)
		// }

		//
		//
		//
		// const teams = []
		// for (let i = 0; i < 20; i++) {
		// 	teams.push({
		//     name: faker.address.city(),
		// 		logo: "uploads/default-team-logo.png"
		//   })
		// }
		// for (const team of teams) {
		// 	await this.teamService.createTeam(team)
		// }



		// const tournaments = []
		// for (let i = 0; i < 20; i++) {
		// 	tournaments.push({
		// 		name: faker.name.title(),
		// 		prizePool: faker.random.number({min: 100, max: 10000, precision: 50}),
		// 		type: faker.random.arrayElement(["OFFLINE", "ONLINE"]),
		// 		teamCount: faker.random.arrayElement([8, 16, 32]),
		// 		date: faker.date.future(),
		// 		minRating: faker.random.arrayElement([0, 0, 0, 200, 350, 500, 750, 1000]),
		// 		maxRating: faker.random.arrayElement([1500, 1700, 1900, 2000]),
		// 		// arenaId: faker.random.number({min: 1, max: 10}),
		// 		status: faker.random.arrayElement(["PLANNED", "PLANNED", "PLANNED", "ONGOING", "ONGOING", "FINISHED", "CANCELLED"]),
		// 		format: faker.random.arrayElement([1, 5, 5, 5, 2]),
		// 		gameId: faker.random.arrayElement([1, 2])
		// 	})
		// }
		// for (const tournament of tournaments) {
		// 	await this.tournamentService.createTournament(tournament)
		// }
		//
		//

		const users = []
		for (let i = 0; i < 20; i++) {
			users.push({
				name: faker.name.firstName(),
				lastname: faker.name.lastName(),
				nickname: `Evrige1285${i}`,
				email: faker.internet.email(),
		    password: faker.internet.password(),
			})
		}
		for (const user of users) {
			await this.authService.registration(user)
		}

		// const invites = []
		// for (let i = 0; i < 100; i++) {
		// 	invites.push({
		// 		teamId: faker.random.number({min: 1, max: 50}),
		// 		userId: faker.random.number({min: 1, max: 152}),
		// 	})
		// }
		// for (const invite of invites) {
		// 	await this.teamService.sendInvites(invite)
		// }

		// const invitesResponse = []
		// for (let i = 0; i < 100; i++) {
		// 	invites.push({
		// 		id: i + 1,
		// 		status: faker.random.arrayElement(["ACCEPTED", "ACCEPTED","ACCEPTED","ACCEPTED","ACCEPTED","ACCEPTED","DECLINED"]),
		// 	})
		// }
		// for (const inviteResponse of invitesResponse) {
		// 	await this.teamService.inviteResponse(inviteResponse, )
		// }

		// for (let i = 0; i < 50; i++) {
		// 	await this.prisma.teams_List.create({
		// 		data: {
		// 			teamId: i+1,
		// 			stage: 1,
		// 			tournamentId: faker.random.number({min: 1, max: 10}),
		// 			placement: 8
		// 		}
		// 	})
		// }
		// for (let i = 0; i < 8; i++) {
		// 	await this.prisma.teams_List.create({
		// 		data: {
		// 			teamId: i+72,
		// 			stage: 1,
		// 			tournamentId: 16,
		// 			placement: 8
		// 		}
		// 	})
		// }
	}

}
