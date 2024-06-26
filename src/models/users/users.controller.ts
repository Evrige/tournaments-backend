import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Req,
	Sse,
	UploadedFile,
	UseGuards,
	UseInterceptors,
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
import { interval, Observable, switchMap } from "rxjs";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

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
	getAllUsersById() {
		return this.usersService.getAllUsersById();
	}
	@ApiOperation({ summary: "Get user data" })
	@ApiResponse({ status: 200, type: [UserDto] })
	@UseGuards(AuthGuard("jwt"))
	@Get("/getData")
	getData(@Req() request: any) {
		return this.usersService.findUserByid(request.user.id);
	}

	@ApiOperation({ summary: "Find users" })
	@ApiResponse({ status: 200, type: String })
	@Get("/findUsers/:nickname")
	async findUsersByNickname(@Param() params: any) {
		return this.usersService.findUsersByNickname(params.nickname);
	}

	@ApiOperation({ summary: "Find user" })
	@ApiResponse({ status: 200, type: String })
	@Get("/getUserById/:id")
	async findUsersById(@Param() params: any) {
		return this.usersService.findUserByid(+params.id);
	}

	@ApiOperation({ summary: "SSE" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Sse('/sse')
	async sse(@Req() request: any): Promise<Observable<MessageEvent>> {
		return interval(30000).pipe(
			switchMap(async () => {
				const user = await this.usersService.findUserByid(request.user.id);
				return { data: { user } };
			})
		);
	}

	@ApiOperation({ summary: "SSE invites" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Sse('/invites')
	async sseInvites(@Req() request: any): Promise<Observable<MessageEvent>> {
		return interval(5000).pipe(
			switchMap(async () => {
				const invites = await this.usersService.getInvites(request.user.id);
				return { data: { ...invites } };
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

	@ApiOperation({ summary: "unban user" })
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
		return this.usersService.leaveTeam(request.user);
	}

	@ApiOperation({ summary: "Update user" })
	@ApiResponse({ status: 200, type: String })
	@UseGuards(AuthGuard("jwt"))
	@Put("/updateData")
	@UseInterceptors(
		FileInterceptor(
			"avatar",
			{
				storage: diskStorage({
					destination: "./uploads",
					filename: (req, file, cb) => {
						const uniqueFileName = `${uuid()}-${file.originalname}`;
						cb(null, uniqueFileName);
					},
				}),
			},
		),
	)
	async uploadFile(
		@UploadedFile() avatar: Express.Multer.File,
		@Body() userDto: User,
		@Req() request: any
	) {
		const avatarFile = avatar ? avatar : null;
		const userData = {
			...userDto,
			avatar: avatarFile ? avatarFile.path : null,
		};

		return await this.usersService.updateData(request.user.id, userData);
	}
}
export interface MessageEvent {
	data: string | object;
	id?: string;
	type?: string;
	retry?: number;
}