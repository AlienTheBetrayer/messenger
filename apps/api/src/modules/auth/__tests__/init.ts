import { Test } from "@nestjs/testing";

import { MockType } from "../../../common";
import { JwtService } from "../../jwt/jwt.service";
import { PrismaService } from "../../prisma/prisma.service";
import { VerifyService } from "../../verify/verify.service";
import { AuthService } from "../auth.service";

/**
 * initializes the auth module for jest
 * @returns context file
 */
export const jestInitAuth = async () => {
	const mockPrismaService = {
		users: {
			count: jest.fn(),
			findFirst: jest.fn(),
			update: jest.fn(),
			create: jest.fn(),
		},
		auth_session: {
			delete: jest.fn(),
			count: jest.fn(),
		},
	};

	const mockJwtService: MockType<
		JwtService,
		"issueAuthTokens" | "getAuthTokens" | "decode" | "deleteAuthTokens"
	> = {
		issueAuthTokens: jest.fn(),
		getAuthTokens: jest.fn(),
		decode: jest.fn(),
		deleteAuthTokens: jest.fn(),
	};

	const mockVerifyService: MockType<
		VerifyService,
		"issueCode" | "validateCode"
	> = {
		issueCode: jest.fn(),
		validateCode: jest.fn(),
	};

	const moduleRef = await Test.createTestingModule({
		providers: [
			AuthService,

			{
				provide: PrismaService,
				useValue: mockPrismaService,
			},
			{
				provide: JwtService,
				useValue: mockJwtService,
			},
			{
				provide: VerifyService,
				useValue: mockVerifyService,
			},
		],
	}).compile();

	const authService = moduleRef.get<AuthService>(AuthService);

	return {
		authService,
		mockPrismaService,
		mockJwtService,
		mockVerifyService,
	};
};
