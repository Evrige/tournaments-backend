import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
  UseInterceptors, UploadedFiles, UploadedFile,
} from "@nestjs/common";
import { TeamService } from './team.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTeamDto} from "./dto/create-team.dto";
import {Role} from "../auth/role.decorator";
import {RoleName} from "@prisma/client";
import {RoleGuard} from "../auth/role.guard";
import { CreateInvitesDto } from "./dto/create-invites.dto";
import { InviteResponseDto } from "./dto/invite-response.dto";
import {AuthGuard} from "@nestjs/passport";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { CreateGameDto } from "../game/dto/create-game.dto";

@ApiTags("Team")
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({summary: "Create team"})
  @ApiResponse({status: 200, type: String})
  @UseGuards(AuthGuard('jwt'))
  @Post("/createTeam")
  @UseInterceptors(
    FileInterceptor(
     "logo",
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
    @UploadedFile() logo: Express.Multer.File,
    @Body() CreateTeamDto: CreateTeamDto,
    @Req() request: any
  ) {
    if(request.user.teamId) return {message: "User already in team"}
    const logoFile = logo ? logo : null;

    const teamData = {
      ...CreateTeamDto,
      logo: logoFile ? logoFile.path : null,
    };

    return await this.teamService.createTeam(teamData, request.user.id);
  }

  @ApiOperation({summary: "Delete team"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.MANAGER])
  @UseGuards(RoleGuard)
  @Post("/deleteTeam")
  deleteTeam(@Body() data: {id: number}) {
    return this.teamService.deleteTeam(data.id);
  }

  @ApiOperation({summary: "Get team users"})
  @ApiResponse({status: 200, type: String})
  @UseGuards(AuthGuard('jwt'))
  @Get("/getTeamUsers")
  getTeamUsers(@Req() request: any) {
    return this.teamService.getTeamUsers(request.user.teamId);
  }


  @ApiOperation({summary: "Send invite to team"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.MANAGER])
  // @UseGuards(RoleGuard)
  @Post("/invites")
  sendInvites(@Body() dto: CreateInvitesDto) {
    return this.teamService.sendInvites(dto);
  }

  @ApiOperation({summary: "Invite response"})
  @ApiResponse({status: 200, type: String})
  @UseGuards(AuthGuard('jwt'))
  @Put("/invites")
  inviteResponse(@Body() dto: InviteResponseDto, @Req() request: any) {
    return this.teamService.inviteResponse(dto, request.user.id);
  }
}
