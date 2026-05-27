import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";

@Injectable()
export class MailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "outwave.team@gmail.com",
				pass: process.env.GMAIL_APP_PASSWORD,
			},
		});
	}

	/**
	 * sends an email from the official outwave gmail
	 * @param config email config
	 * @returns sent message info
	 */
	async send(config: { to: string; html: string; subject: string }) {
		return await this.transporter.sendMail({
			from: "Outwave <outwave.team@gmail.com>",
			...config,
		});
	}
}
