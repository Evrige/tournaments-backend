import { Address } from "nodemailer/lib/mailer";

export type MailDto = {
	from?: Address,
	recipients?: Address[],
	subject?: string,
  text?: string,
  html?: string,
  attachments?: any[],
	placeholderReplacement?: Record<string, string>
}
