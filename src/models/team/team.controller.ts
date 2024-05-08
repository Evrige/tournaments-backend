import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { TeamService } from './team.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTeamDto} from "./dto/create-team.dto";
import {Role} from "../auth/role.decorator";
import {RoleName} from "@prisma/client";
import {RoleGuard} from "../auth/role.guard";

@ApiTags("Team")
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({summary: "Create team"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Post("/createTeam")
  createTeam(@Body() CreateTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(CreateTeamDto);
  }

  @ApiOperation({summary: "Create team"})
  @ApiResponse({status: 200, type: String})
  @Role([RoleName.ADMIN])
  @UseGuards(RoleGuard)
  @Post("/deleteTeam")
  deleteTeam(@Body() data: {id: number}) {
    return this.teamService.deleteTeam(data.id);
  }
}
