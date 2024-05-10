import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {TournamentService} from './tournament.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateArenaDto} from "./dto/create-arena.dto";
import {TournamentDto} from "./dto/tournament.dto";
import {AuthGuard} from "@nestjs/passport";

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

  @ApiOperation({summary: "Create tournament"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Post("/createTournament")
  createTournament(@Body() TournamentDto: TournamentDto) {
    return this.tournamentService.createTournament(TournamentDto);
  }

  @ApiOperation({summary: "Update tournament"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.ADMIN])
  // @UseGuards(RoleGuard)
  @Put("/updateTournament")
  updateTournament(@Body() TournamentDto: TournamentDto) {
    return this.tournamentService.updateTournament(TournamentDto);
  }

  @ApiOperation({summary: "Get tournament information"})
  @ApiResponse({status: 200, type: String})
  @Get()
  getTournaments() {
    return this.tournamentService.getTournaments();
  }

  @ApiOperation({summary: "Join team to tournament"})
  @ApiResponse({status: 200, type: String})
  // @Role([RoleName.MANAGER])
  // @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post("/joinToTournament/:id")
  joinTeamToTournament(@Param("id") idTournament: number, @Req() request: any) {
    return this.tournamentService.joinTeamToTournament(request.user.id, +idTournament);
  }
}
