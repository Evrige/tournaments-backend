import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { RoleName } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private roleService: RoleService) {
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto
    });
    const role = await this.roleService.getRoleByValue(RoleName.USER);
    await this.prisma.userRole.create({
      data: {
        user: { connect: { id: user.id } },
        role: { connect: { id: role.id } }
      }
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

    const updatedUser = await this.prisma.userRole.create({
      data: {
        user: { connect: { id: userId } },
        role: { connect: { id: role.id } }
      }
    });
    if (!updatedUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return { message: `Role ${value} added` };
  }

  async banUser(BanUserDto: BanUserDto) {
    const user = await this.prisma.user.update({
        where: {
          id: BanUserDto.userId
        },
        data: {
          isBanned: true,
          banReason: BanUserDto.banReason
        }
      });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return { message: "Ban success" };
  }

  async unBanUser(BanUserDto: BanUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: BanUserDto.userId
      },
      data: {
        isBanned: false,
        banReason: null
      }
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return { message: "UnBan success" };
  }

  async LeaveTeam(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return { message: "User not found" };
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: { teamId: null },
      });

      return { message: 'Leave team success' };
    } catch (error) {
      return { message: 'Have a error with leave team' };
    }
  }

  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        roles: {
          select: {
            role: true
          }
        }
      }
    });
  }
}
