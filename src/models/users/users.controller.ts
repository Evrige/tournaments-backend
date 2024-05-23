import {
	Body,
	Controller,
	Get, Param,
	Post,
	Put,
	Req, Sse,
	UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { Role } from "../auth/role.decorator";
import { RoleGuard } from "../auth/role.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { RoleName, User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import { interval, map, Observable, switchMap } from "rxjs";

@ApiTags("user")
@Controller("user")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: "Create user" })
	@ApiResponse({ status: 200, type: UserDto })
	@Role([RoleName.ADMIN])
	@UseGuards(RoleGuard)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200, type: [UserDto] })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}
	@ApiOperation({ summary: "Get user data" })
	@ApiResponse({ status: 200, type: [UserDto] })
	@UseGuards(AuthGuard("jwt"))
	@Get("/getData")
	getData(@Req() request: any) {
		return this.usersService.findUserByid(request.user.id);
	}

	// @ApiOperation({ summary: "Find users" })
	// @ApiResponse({ status: 200, type: String })
	@Get("/findUsers/:nickname")
	async findUsersByNickname(@Param("nickname") nickname: string) {
		console.log("nickname ", nickname);
		return `Received nickname: ${nickname}`;
	}

	@ApiOperation({ summary: "SSE" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Sse('/sse')
	async sse(@Req() request: any): Promise<Observable<MessageEvent>> {
		return interval(30000).pipe(
			switchMap(async () => {
				const {password, ...user} = await this.usersService.findUserByid(request.user.id); // Асинхронный запрос пользователя
				return { data: { user } };
			})
		);
	}


	@ApiOperation({ summary: "Get user by email" })
	@ApiResponse({ status: 200, type: [UserDto] })
	@ApiParam({ name: "email", description: "user@gmail.com" })
	@Get("/:email")
	getByValue(@Param("email") value: string) {
		return this.usersService.findUser(value);
	}

	@ApiOperation({ summary: "Add role to user" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Post("/addRole")
	addRole(@Body() AddRoleDto: AddRoleDto) {
		return this.usersService.addRole(AddRoleDto);
	}

	@ApiOperation({ summary: "Ban user" })
	@ApiResponse({ status: 200, type: String })
	@Role([RoleName.ADMIN])
	@UseGuards(RoleGuard)
	@Post("/ban")
	banUser(@Body() BanUserDto: BanUserDto) {
		return this.usersService.banUser(BanUserDto);
	}

	@ApiOperation({ summary: "Ban user" })
	@ApiResponse({ status: 200, type: String })
	@Role([RoleName.ADMIN])
	@UseGuards(RoleGuard)
	@Post("/unban")
	unbanUser(@Body() BanUserDto: BanUserDto) {
		return this.usersService.unBanUser(BanUserDto);
	}

	@ApiOperation({ summary: "Leave team" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Put("/leave")
	leaveTeam(@Req() request: any) {
		return this.usersService.leaveTeam(request.user.id);
	}

	@ApiOperation({ summary: "Update user" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Put("/updateData")
	updateData(@Body() userData: User, @Req() request: any) {
		if(request.user.id === userData.id)
			return this.usersService.updateData(userData);
	}
}
export interface MessageEvent {
	data: string | object;
	id?: string;
	type?: string;
	retry?: number;
}