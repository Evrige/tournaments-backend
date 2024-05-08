import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from "./dto/create-role.dto";
import {PrismaService} from "../../prisma.service";
import { RoleName } from "@prisma/client";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: createRoleDto,
    });
    return role;
  }

  async getRoleByValue(value: RoleName) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: value,
      },
    });
    return role;
  }
}
