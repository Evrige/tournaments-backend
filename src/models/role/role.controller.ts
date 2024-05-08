import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleDto } from "./dto/role.dto";
import { RoleName } from "@prisma/client";
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({summary: "Create role"})
  @ApiResponse({status: 200, type: RoleDto})
  @Post()
  create(@Body() dto: CreateRoleDto){
    return this.roleService.createRole(dto);
  }


  @ApiOperation({summary: "Get role by role name"})
  @ApiResponse({status: 200, type: [RoleDto]})
  @ApiParam({name: "roleName", description: "Role name(USER, ADMIN...)"})
  @Get("/:roleName")
  getByValue(@Param('roleName') value: RoleName) {
    return this.roleService.getRoleByValue(value);
  }

}
