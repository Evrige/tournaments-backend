import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { Role } from "../auth/role.decorator";
import { RoleGuard } from "../auth/role.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { RoleName } from "@prisma/client";
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport";

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 200, type: UserDto})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: [UserDto]})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: "Get user by email"})
  @ApiResponse({status: 200, type: [UserDto]})
  @ApiParam({name: "email", description: "user@gmail.com"})
  @Get("/:email")
  getByValue(@Param('email') value: string) {
    return this.usersService.findUser(value);
  }

  @ApiOperation({summary: "Add role to user"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Post("/addRole")
  addRole(@Body() AddRoleDto: AddRoleDto) {
    return this.usersService.addRole(AddRoleDto);
  }

  @ApiOperation({summary: "Ban user"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Post("/ban")
  banUser(@Body() BanUserDto: BanUserDto) {
    return this.usersService.banUser(BanUserDto);
  }

  @ApiOperation({summary: "Ban user"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Post("/unban")
  unbanUser(@Body() BanUserDto: BanUserDto) {
    return this.usersService.unBanUser(BanUserDto);
  }

  @ApiOperation({summary: "Leave team"})
  @ApiResponse({status: 200, type: String})
  @UseGuards(AuthGuard('jwt'))
  @Put("/leave")
  leaveTeam(@Req() request: any) {
    return this.usersService.leaveTeam(request.user.id);
  }
}
