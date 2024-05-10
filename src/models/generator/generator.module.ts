import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import {PrismaService} from "../../prisma.service";
import {RoleService} from "../role/role.service";
import {TournamentService} from "../tournament/tournament.service";
import {UsersService} from "../users/users.service";
import {TeamService} from "../team/team.service";
import {MatchService} from "../match/match.service";
import {RatingService} from "../rating/rating.service";
import {AuthService} from "../auth/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../auth/local.strategy";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    PassportModule,
  ],
  controllers: [GeneratorController],
  providers: [GeneratorService, LocalStrategy, JwtStrategy, PrismaService, RoleService, TournamentService, UsersService, JwtService, AuthService, TeamService, MatchService, RatingService ],
})
export class GeneratorModule {}
