import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { PrismaService } from "../../prisma.service";

@Module({
  controllers: [MailerController],
  providers: [MailerService, PrismaService],
  exports: [MailerService]
})
export class MailerModule {}
