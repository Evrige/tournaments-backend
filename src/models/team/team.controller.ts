import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req} from "@nestjs/common";
import { TeamService } from './team.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTeamDto} from "./dto/create-team.dto";
import {Role} from "../auth/role.decorator";
import {RoleName} from "@prisma/client";
import {RoleGuard} from "../auth/role.guard";
import { CreateInvitesDto } from "./dto/create-invites.dto";
import { InviteResponseDto } from "./dto/invite-response.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("Team")
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({summary: "Create team"})
  @ApiResponse({status: 200, type: String})
  @Post("/createTeam")
  createTeam(@Body() CreateTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(CreateTeamDto);
  }

  @ApiOperation({summary: "Delete team"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.MANAGER])
  @UseGuards(RoleGuard)
  @Post("/deleteTeam")
  deleteTeam(@Body() data: {id: number}) {
    return this.teamService.deleteTeam(data.id);
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
