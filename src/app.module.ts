import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { RoleModule } from './models/role/role.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';
import {APP_GUARD, Reflector} from "@nestjs/core";
import {RoleGuard} from "./models/auth/role.guard";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "./models/auth/jwt-auth.guard";
import { TeamModule } from './models/team/team.module';
import { TournamentModule } from './models/tournament/tournament.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    RoleModule,
    UsersModule,
    AuthModule,
    TeamModule,
    TournamentModule,

  ],
  controllers: [AppController],
  providers: [
    JwtAuthGuard,
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
