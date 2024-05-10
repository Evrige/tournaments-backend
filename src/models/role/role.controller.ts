import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleDto } from "./dto/role.dto";
import { RoleName } from "@prisma/client";
import {Role} from "../auth/role.decorator";
import {RoleGuard} from "../auth/role.guard";
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({summary: "Create role"})
  @ApiResponse({status: 200, type: RoleDto})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateRoleDto){
    return this.roleService.createRole(dto);
  }


  @ApiOperation({summary: "Get role by role name"})
  @ApiResponse({status: 200, type: [RoleDto]})
  @ApiParam({name: "roleName", description: "Role name(USER, ADMIN...)"})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Get("/:roleName")
  getByValue(@Param('roleName') value: RoleName) {
    return this.roleService.getRoleByValue(value);
  }

}
