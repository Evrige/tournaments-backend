import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailDto } from "./dto/mail.dto";
import Mail from "nodemailer/lib/mailer";
@Injectable()
export class MailerService {

	mailTransport(){
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: +process.env.MAIL_PORT,
			secure: true, // Use `true` for port 465, `false` for all other ports
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		return transporter;
	}
	async sendMail(mailDto: MailDto){
			const {from, recipients, html, placeholderReplacement, text, subject} = mailDto;

			const transport = this.mailTransport()

		  const options: Mail.Options = {
				from: from ?? {
					address: process.env.MAIL_USER,
          name: process.env.MAIL_NAME,
				},
				to: recipients,
				text,
				subject,
				html
			}
		try {
			const result = await transport.sendMail(options)
			return result;
		} catch (e){
			console.log(e);
		}
	}
}
