import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 200, type: UserDto})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: [UserDto]})
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
