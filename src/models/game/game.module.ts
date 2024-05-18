import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from "../../prisma.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    })
  ],
  controllers: [GameController],
  providers: [GameService, PrismaService],
})
export class GameModule {}
