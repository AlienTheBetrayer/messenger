import {
	AuthConfig,
	CodeSchema,
	generateId,
	randomString,
	verification_code_type,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import { createException } from "../../common";
import { generateVerificationEmail } from "../mail/lib/constants";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VerifyService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
	) {}

	/**
	 * create and send via email verification code
	 * @param email email address to send it to
	 * @param type verification code type
	 * @returns created code
	 */
  async issueCode(params: CodeSchema) {
		const code = await this.prismaService.verification_codes.create({
			data: {
				id: generateId(),
				code: randomString(AuthConfig.code.length, "0123456789"),
				email: params.email,
				type: params.type,
				expiry_at: new Date(Date.now() + AuthConfig.code.expiryMs),
			},
		});

		// send it via email
		await this.mailService.send({
			to: params.email,
			html: generateVerificationEmail(code.code),
			subject: `Verification code`,
		});

		return code;
	}

	/**
	 * validates a code and throws if invalid (auto cleans it)
	 * @param email the email the code was sent to
	 * @param type the type of the code
	 * @param code the code to validate
	 * @param cleanup whether to clean up the code after the verification
	 * @returns code or thrown error
	 */
	async validateCode(params: {
		email: string;
		code: string;
		type: verification_code_type;
		cleanup?: boolean;
	}) {
		const status = await this.prismaService.verification_codes.findFirst({
			where: {
				email: params.email,
				type: params.type,
				code: params.code,
				expiry_at: {
					gte: new Date(),
				},
			},
		});

		// verification
		if (!status) {
			throw createException("unauthorized", "INVALID_VERIFICATION_CODE");
		}

		// auto-cleanup
		if (params.cleanup !== false) {
			void this.cleanupCodes({ email: params.email, type: params.type });
		}

		return status;
	}

	/**
	 * cleans up the codes for a specific email
	 * @param email the email the code was sent to
	 * @param type the type of the code
	 * @returns deleted codes or null if not found
	 */
	async cleanupCodes(params: { email: string; type?: verification_code_type }) {
		// do codes exist?
		const isFound = await this.prismaService.verification_codes.count({
			where: {
				email: params.email,
				type: params.type,
			},
		});

		if (!isFound) {
			return null;
		}

		return await this.prismaService.verification_codes.deleteMany({
			where: {
				email: params.email,
				type: params.type,
			},
		});
	}
}
