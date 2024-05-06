import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UserRoleEnum } from "./dto/create-role.dto";
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { RoleDto } from "./dto/role.dto";
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
  getByValue(@Param('roleName') value: UserRoleEnum) {
    return this.roleService.getRoleByValue(value);
  }
}
