import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RoleName } from "@prisma/client";
import { CreateGameDto } from "./dto/create-game.dto";

@Injectable()
export class GameService {
	constructor(
		private prisma: PrismaService,
	) {}

	async createGame(CreateGameDto: CreateGameDto){
		const game = await this.prisma.game.create({
			data: CreateGameDto
		})
		return game;
	}


	async getAllGames() {
			const games = await this.prisma.game.findMany();
      return games;
	}
}
