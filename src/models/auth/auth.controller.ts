import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Registration"})
  @ApiResponse({status: 200, type: UserDto})
  @Post("/registration")
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
