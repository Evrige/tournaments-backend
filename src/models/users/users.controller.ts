import {Controller, Get, Post, Body, Param, UseGuards} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import {Role} from "../auth/role.decorator";
import {UserRoleEnum} from "../role/dto/role.dto";
import {RoleGuard} from "../auth/role.guard";

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 200, type: UserDto})
  @Role([UserRoleEnum.ADMIN])
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: [UserDto]})
  @Role([UserRoleEnum.ADMIN])
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
}
