import { Controller, Get, Param } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Rating")
@Controller("rating")
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@ApiOperation({ summary: "Get rating" })
	@ApiResponse({ status: 200, type: String })
	@Get("/getRating/:who")
	async getRating(@Param() params: any) {
		return await this.ratingService.getRating(params.who);
	}
}
