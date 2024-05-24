import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";
import { TournamentService } from "./tournament.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateArenaDto } from "./dto/create-arena.dto";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TournamentDto } from "./dto/tournament.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("tournament")
@Controller("tournament")
export class TournamentController {
	constructor(private readonly tournamentService: TournamentService) {}

	@ApiOperation({ summary: "Create arena" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Post("/createArena")
	createArena(@Body() createArenaDto: CreateArenaDto) {
		return this.tournamentService.createArena(createArenaDto);
	}

	@ApiOperation({ summary: "Create tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Post("/createTournament")
	createTournament(@Body() TournamentDto: TournamentDto) {
		return this.tournamentService.createTournament(TournamentDto);
	}

	@ApiOperation({ summary: "Update tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Put("/updateTournament")
	updateTournament(@Body() TournamentDto: TournamentDto) {
		return this.tournamentService.updateTournament(TournamentDto);
	}

	@ApiOperation({ summary: "Get tournaments information" })
	@ApiResponse({ status: 200, type: String })
	@Get()
	getTournaments() {
		return this.tournamentService.getTournaments();
	}

	@ApiOperation({ summary: "Get tournament information" })
	@ApiResponse({ status: 200, type: String })
	@Get("/getTournament/:id")
	getTournament(@Param("id") idTournament: number) {
		return this.tournamentService.getTournament(+idTournament);
	}

	@ApiOperation({ summary: "Get maps by game" })
	@ApiResponse({ status: 200, type: String })
	@Get("/getMapsByGame/:id")
	getMapsByGame(@Param("id") idGame: number) {
		return this.tournamentService.getMapsByGame(+idGame);
	}

	@ApiOperation({ summary: "Get team by tournament" })
	@ApiResponse({ status: 200, type: String })
	@Get("/getTeamsByTournament/:id")
	getTeamsByTournament(@Param("id") idTournament: number) {
		return this.tournamentService.getTeamsByTournament(+idTournament);
	}

	@ApiOperation({ summary: "Join team to tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.MANAGER])
	// @UseGuards(RoleGuard)
	@UseGuards(AuthGuard("jwt"))
	@Get("/joinToTournament/:id")
	joinTeamToTournament(@Param("id") idTournament: number, @Req() request: any) {
		return this.tournamentService.joinTeamToTournament(
			request.user.teamId,
			+idTournament,
		);
	}

	@ApiOperation({ summary: "Leave team from tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.MANAGER])
	// @UseGuards(RoleGuard)
	@UseGuards(AuthGuard("jwt"))
	@Get("/leaveFromTournament/:id")
	leaveTeamFromTournament(
		@Param("id") idTournament: number,
		@Req() request: any,
	) {
		return this.tournamentService.leaveTeamFromTournament(
			request.user.id,
			+idTournament,
		);
	}

	@ApiOperation({ summary: "Handle start tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	// @UseGuards(AuthGuard('jwt'))
	@Get("/handleStartTournament/:id")
	handleStartTournament(@Param("id") id: number) {
		return this.tournamentService.handleStartTournament(+id);
	}


	@ApiOperation({ summary: "Close tournament" })
	@ApiResponse({ status: 200, type: String })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Put("/closeTournament/:id")
	closeTournament(@Param("id") id: number) {
		return this.tournamentService.closeTournament(id);
	}
}
