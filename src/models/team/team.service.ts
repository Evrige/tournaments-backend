import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreateTeamDto} from "./dto/create-team.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { InviteStatus, RoleName } from "@prisma/client";
import { CreateInvitesDto } from "./dto/create-invites.dto";
import { InviteResponseDto } from "./dto/invite-response.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class TeamService {
	constructor(private prisma: PrismaService, private usersService: UsersService) {
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

	async sendInvites(CreateInvitesDto: CreateInvitesDto) {
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
