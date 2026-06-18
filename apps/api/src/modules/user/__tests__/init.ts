import { Test } from "@nestjs/testing";

import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "../user.service";

/**
 * initializes the root module for jest
 * @returns context file
 */
export const jestInitUser = async () => {
	const mockPrismaService = {
		users: {
			count: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
			update: jest.fn(),
			create: jest.fn(),
		},
	};

	const moduleRef = await Test.createTestingModule({
		providers: [
			UserService,

			{
				provide: PrismaService,
				useValue: mockPrismaService,
			},
		],
	}).compile();

	const userService = moduleRef.get<UserService>(UserService);

	return {
		userService,
		mockPrismaService,
	};
};
