import { Controller, Post } from "@nestjs/common";
import { MailerService } from './mailer.service';
import { MailDto } from "./dto/mail.dto";

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {
  }

  @Post('send-email')
  async sendMail(){
    const dto: MailDto = {
      from: {
        name: "MTG",
        address: "mt.game.tournaments@gmail.com"
      },
      recipients: [
        {
          name: "Test",
          address: "evrige.game@gmail.com"
        }
      ],
      subject: "Test subject",
      text: "Test text",
      html: "<h1>Test html</h1>",
      placeholderReplacement: {
        name: "Test placeholder"
      }
    }
    return await this.mailerService.sendMail(dto)
  }
}
