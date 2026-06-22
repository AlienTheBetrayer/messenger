import bcrypt from "bcryptjs";

import { jestInitAuthCore } from "./init";

jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
}));

describe("AuthCoreService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuthCore>>;

	beforeEach(async () => {
		ctx = await jestInitAuthCore();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const request = {
		cookies: {
			accessToken: "accessToken",
			refreshToken: "refreshToken",
		},
	};

	describe("happy paths", () => {
		it("should verify the code if refresh token is found, jwt service validated, auth session found and hash validated", async () => {
			// arrange
			ctx.mockAppJwtService.verify.mockResolvedValue({} as never);
			ctx.mockPrismaService.auth_sessions.findFirst.mockResolvedValue({});
			jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

			// act
			const result = await ctx.authCoreService.verify(request as never);

			// assert
			expect(result).toBe(true);
		});
	});

	describe("sad paths", () => {
		it("should throw if jwt token is not verified", async () => {
			// arrange
			ctx.mockAppJwtService.verify.mockImplementation(() => {
				throw new Error();
			});

			// act
			const result = ctx.authCoreService.verify(request as never);

			// assert
			await expect(result).rejects.toThrow();
			expect(
				ctx.mockPrismaService.auth_sessions.findFirst,
			).not.toHaveBeenCalled();
			expect(bcrypt.compare).not.toHaveBeenCalled();
		});

		it("should throw if auth session is not found", async () => {
			// arrange
			ctx.mockAppJwtService.verify.mockReturnValue({
				sessionId: "sessionId",
				userId: "userId",
			});
			ctx.mockPrismaService.auth_sessions.findFirst.mockResolvedValue(null);

			// act
			const result = ctx.authCoreService.verify(request as never);

			// assert
			await expect(result).rejects.toThrow();
			expect(bcrypt.compare).not.toHaveBeenCalled();
		});

		it("should throw if hash does not match", async () => {
			// arrange
			ctx.mockAppJwtService.verify.mockReturnValue({
				sessionId: "sessionId",
				userId: "userId",
			});
			ctx.mockPrismaService.auth_sessions.findFirst.mockResolvedValue(null);
			jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

			// act
			const result = ctx.authCoreService.verify(request as never);

			// assert
			await expect(result).rejects.toThrow();
		});
	});
});
