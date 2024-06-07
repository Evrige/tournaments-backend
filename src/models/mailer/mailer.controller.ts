import { Controller, Post } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { confirmEmail } from "../../utils/confirm-email";

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {
  }

  @Post('send-email')
  async sendMail(){
    return await this.mailerService.sendMail(confirmEmail("evrige.game@gmail.com", "dfdsf"))
  }
}
