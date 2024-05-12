import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { MatchService } from "./match.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MatchDto } from "./dto/match.dto";

@ApiTags("match")
@Controller("match")
export class MatchController {
	constructor(private readonly matchService: MatchService) {}

	@ApiOperation({ summary: "Update match" })
	@ApiResponse({ status: 200, type: MatchDto })
	// @Role([RoleName.ADMIN])
	// @UseGuards(RoleGuard)
	@Put("/updateMatch")
	updateMatch(@Body() MatchDto: MatchDto) {
		return this.matchService.updateMatch(MatchDto);
	}

	@ApiOperation({ summary: "Get all by tournament" })
	@ApiResponse({ status: 200, type: MatchDto })
	@Get("/:id")
	getMatchesByTournamentId(@Param("id") TournamentId: number) {
		return this.matchService.getMatchesByTournamentId(TournamentId);
	}
}
