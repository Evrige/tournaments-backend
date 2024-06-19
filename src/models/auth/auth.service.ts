import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dto/user.dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { PrismaService } from "../../prisma.service";
import { RoleName, UserStatus } from "@prisma/client";
import { RoleService } from "../role/role.service";
import * as nodemailer from "nodemailer";
import { MailDto } from "../mailer/dto/mail.dto";
import Mail from "nodemailer/lib/mailer";
import { mailForm } from "../../utils/mail-form";
import { confirmEmailHtml } from "../../utils/confirm-email-html";
import * as process from "node:process";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private prisma: PrismaService,
		private roleService: RoleService,
	) {}

	async registration(User: CreateUserDto) {
		const user = await this.usersService.findUser(User.email);
		if (user) {
			throw new HttpException(
				"User already registered",
				HttpStatus.BAD_REQUEST,
			);
		}
		const newUser = await this.usersService.createUser({
			...User,
		});
		await this.sendEmailToActivated(newUser.email);
		return { message: "Account created" };
	}

	async reSendEmailToActivated(email: string) {
		await this.sendEmailToActivated(email);
		return { message: "Mail send", status: 200 };
	}

	async confirmEmail(token: string) {
		let verifyToken;
		try {
			verifyToken = await this.jwtService.verify(token);
		} catch (error) {
			throw new HttpException(
				"Invalid or expired token",
				HttpStatus.BAD_REQUEST,
			);
		}

		if (!verifyToken) {
			throw new HttpException("Token expired", HttpStatus.BAD_REQUEST);
		}

		const user = await this.prisma.user.findUnique({
			where: { id: verifyToken.userId },
		});

		if (!user) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		const updateUser = await this.prisma.user.update({
			where: { id: user.id },
			data: {
				status: UserStatus.ACTIVE,
			},
		});

		return {
			status: 200,
			message: "Account activated",
			email: updateUser.email,
		};
	}

	async generateToken(
		id: number,
	): Promise<{ user: any; accessToken: string; refreshToken: string }> {
		const { password, ...userData } = await this.usersService.findUserByid(id);
		try {
			const accessToken = this.jwtService.sign({
				nickname: userData.nickname,
				userId: userData.id,
			});
			const refreshToken = this.jwtService.sign({
				nickname: userData.nickname,
				userId: userData.id,
			});
			const user = userData;
			return { user, accessToken, refreshToken };
		} catch (error) {
			throw new HttpException(
				"Token generation failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async changePassword(
		passwords: ChangePasswordDto,
		userId: number,
	): Promise<any> {
		const user = await this.usersService.findUserByid(userId);
		if (!user) {
			return null;
		}
		const pass = await bcrypt.compare(passwords.currentPassword, user.password);
		if (!pass) {
			throw new HttpException(
				"currentPassword - Uncorrected password",
				HttpStatus.BAD_REQUEST,
			);
		}
		await this.prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: passwords.newPassword,
			},
		});
		return {
			status: HttpStatus.OK,
			message: "Password update",
		};
	}

	async googleLogin(
		req,
	): Promise<{ user: any; accessToken: string; refreshToken: string }> {
		if (!req.user) {
			throw new HttpException("No data", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		const user = await this.prisma.user.findUnique({
			where: {
				email: req.user.email,
			},
		});
		if (!user) {
			const newUser = await this.prisma.user.create({
				data: {
					email: req.user.email,
					name: req.user.name,
					lastname: req.user.lastname,
					avatar: req.user.avatar,
					nickname: `Player${req.user.name}`,
				},
			});
			const createdUser = await this.prisma.user.update({
				where: {
					id: newUser.id,
				},
				data: {
					nickname: `Player${newUser.id}`,
				},
			});
			const role = await this.roleService.getRoleByValue(RoleName.USER);
			await this.prisma.user_Role.create({
				data: {
					user: { connect: { id: createdUser.id } },
					role: { connect: { id: role.id } },
				},
			});
			await this.prisma.user_Rating.create({
				data: {
					userId: createdUser.id,
					points: 0,
				},
			});
			if (createdUser) return this.generateToken(createdUser.id);
		}
		return this.generateToken(user.id);
	}

	async refreshTokens(
		refreshToken: string,
	): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
		try {
			const decodedToken = this.jwtService.verify(refreshToken);
			if (
				typeof decodedToken !== "object" ||
				!decodedToken.hasOwnProperty("userId")
			) {
				throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
			}
			const user = decodedToken;
			return this.generateToken(user.userId);
		} catch (error) {
			throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
		}
	}

	async verifyToken(token: string) {
		return await this.jwtService.verify(token);
	}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findUser(email);
		if (!user) {
			return null;
		}
		if (user.status === UserStatus.PENDING)
			throw new HttpException("Activate email first", HttpStatus.UNAUTHORIZED);
		const pass = await bcrypt.compare(password, user.password);
		if (pass) {
			return user;
		} else
			throw new HttpException(
				"User validation failed",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
	}

	async sendEmailToActivated(email: string) {
		const token = this.jwtService.sign({ email }, { expiresIn: 60 * 15 });
		const confirmLink = `${process.env.CLIENT_URL}/confirmEmail?token=${token}`;
		await this.sendMail(
			mailForm(email, "Activated email", confirmEmailHtml(confirmLink)),
		);
	}

	mailTransport() {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: +process.env.MAIL_PORT,
			secure: false, // Use `true` for port 465, `false` for all other ports
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		return transporter;
	}

	async sendMail(mailDto: MailDto) {
		const { from, recipients, html, placeholderReplacement, text, subject } =
			mailDto;

		const transport = this.mailTransport();

		const options: Mail.Options = {
			from: from ?? {
				address: process.env.MAIL_DEFAULT_FROM,
				name: process.env.MAIL_NAME,
			},
			to: recipients,
			text,
			subject,
			html,
		};
		try {
			const result = await transport.sendMail(options);
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}
