import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RoleName } from "@prisma/client";
import { PrismaService } from "../../prisma.service";
import { CreateArenaDto } from "./dto/create-arena.dto";

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {
  }

  async createArena(createArenaDto: CreateArenaDto) {
    const arena = await this.prisma.arens.create({
      data: createArenaDto
    });
    return arena;
  }

  async createTournament(CreateTournamentDto: CreateTournamentDto) {
    // const tournament = await this.prisma.tournament.create({
    //   data: CreateTournamentDto
    // });
    // return tournament;
  }
}
