import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { RoleModule } from "./models/role/role.module";
import { UsersModule } from "./models/users/users.module";
import { AuthModule } from "./models/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { RoleGuard } from "./models/auth/role.guard";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./models/auth/jwt-auth.guard";
import { TeamModule } from "./models/team/team.module";
import { TournamentModule } from "./models/tournament/tournament.module";
import { MatchModule } from "./models/match/match.module";
import { RatingModule } from "./models/rating/rating.module";
import { ScheduleModule } from "@nestjs/schedule";
import { GeneratorModule } from "./models/generator/generator.module";
import { SocketModule } from "./models/socket/socket.module";
import { SocketService } from "./models/socket/socket.service";
import { GameModule } from './models/game/game.module';
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ScheduleModule.forRoot(),
    RoleModule,
    UsersModule,
    AuthModule,
    TeamModule,
    TournamentModule,
    MatchModule,
    RatingModule,
    GeneratorModule,
    SocketModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [
    JwtAuthGuard,
    JwtService,
    AppService,
    SocketService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
}
