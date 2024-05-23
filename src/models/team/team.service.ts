import { Injectable } from "@nestjs/common";
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
		return {message: "ok"}
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

	async getTeamUsers(id: number) {
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
      message: "Invites sent successfully"
    }
	}

	async inviteResponse(InviteResponseDto: InviteResponseDto, userId: number) {
		const user = await this.usersService.findUserByid(userId);
		if (!user) {
      return { message: "User not found" };
    } else if (user.teamId) {
			return { message: "You are already in team"}
		}
		const response = await this.prisma.user_Invites.update({
			where: { id: InviteResponseDto.id },
			data: {
				status: InviteResponseDto.status
			}
		});
		if (response.status === InviteStatus.ACCEPTED){
			const user = await this.prisma.user.update({
				where: {
          id: response.userId
        },
        data: {
          teamId: response.teamId
        }
			})
			return {
				message: "User added to team"
			}
		}
	}
}
