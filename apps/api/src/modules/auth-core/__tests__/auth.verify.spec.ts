import { jestInitAuthCore } from "./init";

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
			refreshToken: "refreshToken",
		},
	};

	describe("happy paths", () => {
		it("should verify the code if refresh token is found, jwt service validated and auth session found", async () => {
			// arrange
			ctx.mockAppJwtService.verify.mockResolvedValue({} as never);
			ctx.mockPrismaService.auth_session.findFirst.mockResolvedValue({});

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
				ctx.mockPrismaService.auth_session.findFirst,
			).not.toHaveBeenCalled();
		});

		it("should throw if auth session is not found", async () => {
			// arrange
			ctx.mockPrismaService.auth_session.findFirst.mockResolvedValue(null);

			// act
			const result = ctx.authCoreService.verify(request as never);

			// assert
			await expect(result).rejects.toThrow();
		});
	});
});
