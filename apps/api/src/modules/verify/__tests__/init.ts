import { Test } from "@nestjs/testing";

import { MockType } from "../../../common";
import { MailService } from "../../mail/mail.service";
import { PrismaService } from "../../prisma/prisma.service";
import { VerifyService } from "../verify.service";

/**
 * initializes the verify module for jest
 * @returns context file
 */
export const jestInitVerify = async () => {
	const mockPrismaService = {
		verification_codes: {
			deleteMany: jest.fn(),
			findFirst: jest.fn(),
			count: jest.fn(),
			create: jest.fn(),
		},
	};

	const mockMailService: MockType<MailService, "send"> = {
		send: jest.fn(),
	};

	const moduleRef = await Test.createTestingModule({
		providers: [
			VerifyService,

			{
				provide: PrismaService,
				useValue: mockPrismaService,
			},
			{
				provide: MailService,
				useValue: mockMailService,
			},
		],
	}).compile();

	const verifyService = moduleRef.get<VerifyService>(VerifyService);

	return {
		verifyService,
		mockPrismaService,
		mockMailService,
	};
};
