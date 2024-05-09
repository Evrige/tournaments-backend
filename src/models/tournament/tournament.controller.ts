import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req } from "@nestjs/common";
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../auth/role.decorator";
import { RoleName } from "@prisma/client";
import { RoleGuard } from "../auth/role.guard";
import { CreateArenaDto } from "./dto/create-arena.dto";

@ApiTags("tournament")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @ApiOperation({summary: "Create arena"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Post("/createArena")
  createArena(@Body() createArenaDto: CreateArenaDto) {
    return this.tournamentService.createArena(createArenaDto);
  }

  @ApiOperation({summary: "Create arena"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Post("/createTournament")
  createTournament(@Body() CreateTournamentDto: CreateTournamentDto) {
    return this.tournamentService.createTournament(CreateTournamentDto);
  }
}
