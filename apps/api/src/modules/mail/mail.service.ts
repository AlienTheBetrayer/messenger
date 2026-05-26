import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'outwave.team@gmail.com',
				pass: process.env.GMAIL_APP_PASSWORD,
			},
		});
	}

	async send(to: string) {
		return this.transporter.sendMail({
			from: 'Outwave <outwave.team@gmail.com>',
			to,
			subject: 'W',
			html: `
        <h1>W<h1>
        <p>This shit works!!!</p>
      `,
		});
	}
}
