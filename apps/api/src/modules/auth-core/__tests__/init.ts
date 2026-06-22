import { Test } from "@nestjs/testing";

import { MockType } from "../../../common";
import { AppJwtService } from "../../jwt/jwt.service";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthCoreService } from "../auth.service";

/**
 * initializes the auth module for jest
 * @returns context file
 */
export const jestInitAuthCore = async () => {
	const mockPrismaService = {
		auth_sessions: {
			findFirst: jest.fn(),
		},
	};

	const mockAppJwtService: MockType<AppJwtService, "verify"> = {
		verify: jest.fn(),
	};

	const moduleRef = await Test.createTestingModule({
		providers: [
			AuthCoreService,

			{ provide: PrismaService, useValue: mockPrismaService },
			{ provide: AppJwtService, useValue: mockAppJwtService },
		],
	}).compile();

	const authCoreService = moduleRef.get<AuthCoreService>(AuthCoreService);

	return {
		authCoreService,
		mockPrismaService,
		mockAppJwtService,
	};
};
