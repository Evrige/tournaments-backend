import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { GameService } from "./game.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateGameDto } from "./dto/create-game.dto";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

@ApiTags("game")
@Controller("game")
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@ApiOperation({ summary: "Get all games" })
	@ApiResponse({ status: 200, description: "Games send" })
	@Get("")
	async getAllGames() {
		return await this.gameService.getAllGames();
	}

	@ApiOperation({ summary: "Create game" })
	@ApiResponse({ status: 200, description: "Game created" })
	@Post("create")
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{ name: "image", maxCount: 1 },
				{ name: "logo", maxCount: 1 },
			],
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
		@UploadedFiles()
		files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
		@Body() createGameDto: CreateGameDto,
	) {
		console.log(files);
		const logoFile = files.logo ? files.logo[0] : null;
		const imageFile = files.image ? files.image[0] : null;

		const gameData = {
			...createGameDto,
			logo: logoFile ? logoFile.path : null,
			image: imageFile ? imageFile.path : null,
		};

		const game = await this.gameService.createGame(gameData);
		return game;
	}
}
