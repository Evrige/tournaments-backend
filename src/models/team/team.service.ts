import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { InviteStatus, RoleName } from "@prisma/client";
import { CreateInvitesDto } from "./dto/create-invites.dto";
import { InviteResponseDto } from "./dto/invite-response.dto";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class TeamService {
	constructor(private prisma: PrismaService, private usersService: UsersService) {
	}

	async createTeam(CreateTeamDto: CreateTeamDto, userId: number) {
		const teamAlreadyExist = await this.prisma.team.findUnique({
			where: {
        name: CreateTeamDto.name
      }
		})
		if (teamAlreadyExist) {
      return { message: "Team already exist" };
    }
		const team = await this.prisma.team.create({
			data: CreateTeamDto
		});
		const rating = await this.prisma.team_Rating.create({
			data: {
				teamId: team.id,
        points: 0
			}
		})
		const user = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
        teamId: team.id
      }
		})
		const addRole = await this.usersService.addRole({
			userId: userId,
      value: RoleName.MANAGER
		})
		return {
			status: HttpStatus.OK,
			message: "Team created",
		};
	}

	async deleteTeam(id: number) {
		await this.prisma.team.delete({
			where: {
				id: id
			}
		});
		return {
			status: HttpStatus.OK,
			message: "Team deleted successfully"
		}
	}

	async getTeamUsers(id: number) {
		if(!id) {
			throw new HttpException(
				{ message: "User are not in team" },
				HttpStatus.BAD_REQUEST,
			);
		}
		const users = await this.prisma.user.findMany({
			where: {
				teamId: id
			},
			select: {
				id: true,
				nickname: true,
				avatar: true
			}
		});
		return {
			users,
			message: "Users found"
		}
	}

	async sendInvites(CreateInvitesDto: CreateInvitesDto) {
		const user = await this.usersService.findUserByid(CreateInvitesDto.userId);
		if(user.teamId) return {message: "User already in team"}
		await this.prisma.user_Invites.create({
			data: {
				userId: CreateInvitesDto.userId,
				teamId: CreateInvitesDto.teamId,
				status: InviteStatus.PENDING
			}
		});
		return {
			status: HttpStatus.OK,
			message: "invite successfully",
		};
	}

	async inviteResponse(InviteResponseDto: InviteResponseDto, userId: number) {
		const user = await this.usersService.findUserByid(userId);

		if (!user) {
			throw new HttpException({ message: "User not found" }, HttpStatus.NOT_FOUND);
		} else if (user.teamId) {
			throw new HttpException({ message: "You are already in a team" }, HttpStatus.BAD_REQUEST);
		}

		const response = await this.prisma.user_Invites.update({
			where: { id: InviteResponseDto.id },
			data: {
				status: InviteResponseDto.status
			}
		});

		if (response.status === InviteStatus.ACCEPTED) {
			await this.prisma.user.update({
				where: {
					id: response.userId
				},
				data: {
					teamId: response.teamId
				}
			});

			return {
				statusCode: HttpStatus.OK,
				message: "User added to team"
			};
		}

		return {
			statusCode: HttpStatus.OK,
			message: "Invite response updated"
		};
	}


}
