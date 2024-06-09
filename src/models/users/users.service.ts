import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { InviteStatus, RoleName, User, UserStatus } from "@prisma/client";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private roleService: RoleService,
	) {}

	async createUser(createUserDto: CreateUserDto) {
		const user = await this.prisma.user.create({
			data: createUserDto,
		});
		const role = await this.roleService.getRoleByValue(RoleName.USER);
		await this.prisma.user_Role.create({
			data: {
				user: { connect: { id: user.id } },
				role: { connect: { id: role.id } },
			},
		});
		await this.prisma.user_Rating.create({
			data: {
				userId: user.id,
				points: 0,
			},
		});

		return await this.findUser(user.email);
	}

	async getAllUsers() {
		return await this.prisma.user.findMany({ include: { roles: true } });
	}

	async addRole(addRoleDto: AddRoleDto) {
		const { userId, value } = addRoleDto;

		const role = await this.roleService.getRoleByValue(value);

		if (!role) {
			throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
		}

		const updatedUser = await this.prisma.user_Role.create({
			data: {
				user: { connect: { id: userId } },
				role: { connect: { id: role.id } },
			},
		});
		if (!updatedUser) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return { message: `Role ${value} added` };
	}

	async banUser(BanUserDto: BanUserDto) {
		const user = await this.prisma.user.update({
			where: {
				id: BanUserDto.userId,
			},
			data: {
				status: UserStatus.BANNED,
				banReason: BanUserDto.banReason,
			},
		});
		if (!user) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}
		return { message: "Ban success" };
	}

	async unBanUser(BanUserDto: BanUserDto) {
		const user = await this.prisma.user.update({
			where: {
				id: BanUserDto.userId,
			},
			data: {
				status: UserStatus.ACTIVE,
				banReason: null,
			},
		});
		if (!user) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}
		return { message: "UnBan success" };
	}

	async leaveTeam(user: UserDto) {
		if (!user) {
			throw new HttpException(
				{ message: "User not found" },
				HttpStatus.NOT_FOUND,
			);
		}

		const managerRole = await this.prisma.role.findFirst({
			where: { name: RoleName.MANAGER },
		});

		const result = await this.prisma.$transaction(async prisma => {
			await prisma.user_Role.deleteMany({
				where: {
					userId: user.id,
					roleId: managerRole.id,
				},
			});

			await prisma.user.update({
				where: { id: user.id },
				data: { teamId: null },
			});

			return { message: "Leave team success" };
		});

		return { statusCode: HttpStatus.OK, ...result };
	}

	async getInvites(userId: number) {
		const invites = await this.prisma.user_Invites.findMany({
			where: {
				userId,
				status: InviteStatus.PENDING,
			},
			include: {
				team: true,
			},
		});
		return {
			invites,
			message: "ok",
		};
	}

	async updateData(userId: number, user: User) {
		try {
			const userData = await this.prisma.user.update({
				where: { id: userId },
				data: user,
			});
			return { user: userData, message: "User update" };
		} catch (error) {
			throw new Error(`Failed to update user: ${error.message}`);
		}
	}

	async findUser(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				roles: {
					select: {
						role: true,
					},
				},
			},
		});
	}

	async findUserByid(userId: number) {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				roles: {
					select: {
						role: true,
					},
				},
				team: true,
			},
		});
	}

	async findUsersByNickname(query: string) {
		const users = await this.prisma.user.findMany({
			where: {
				nickname: {
					contains: query,
					mode: "insensitive",
				},
			},
			select: {
				id: true,
				nickname: true,
				avatar: true,
				teamId: true,
			},
		});
		if (!users) return { message: "No users found" };
		return { users, message: "Users found" };
	}
}
