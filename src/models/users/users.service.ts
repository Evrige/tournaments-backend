import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../../prisma.service";
import { RoleService } from "../role/role.service";
import { UserRoleEnum } from "../role/dto/create-role.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private roleService: RoleService) {
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto
    });
    const role = await this.roleService.getRoleByValue(UserRoleEnum.USER);
    await this.prisma.userRole.create({
      data: {
        user: { connect: { id: user.id } },
        role: { connect: { id: role.id } }
      }
    });

    return user;
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({ include: { roles: true } });
  }
}
