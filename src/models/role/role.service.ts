import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UserRoleEnum } from "./dto/create-role.dto";
import { UpdateRoleDto } from './dto/update-role.dto';
import {PrismaService} from "../../prisma.service";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: createRoleDto,
    });
    return role;
  }

  async getRoleByValue(value: UserRoleEnum) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: value,
      },
    });
    return role;
  }
}
