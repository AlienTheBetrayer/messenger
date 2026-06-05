import { jestInitAuth } from "./init";

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	// init variables
	const refreshToken = "refresh";

	describe("happy paths", () => {
		it("should return a user if jwt token decoded and session found", async () => {
			// arrange
			ctx.mockJwtService.decode.mockReturnValue({});
			ctx.mockPrismaService.auth_session.count.mockResolvedValue(1);

			// act
			const result = await ctx.authService.me(refreshToken);

			// assert
			expect(result).not.toBeNull();
			expect(ctx.mockPrismaService.users.findFirst).toHaveBeenCalled();
		});
	});

	describe("sad paths", () => {
		it("should return null if jwt token is not decoded", async () => {
			// arrange
			ctx.mockJwtService.decode.mockReturnValue(null);

			// act
			const result = ctx.authService.me(refreshToken);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockPrismaService.users.findFirst).not.toHaveBeenCalled();
		});

		it("should return null if session is not found", async () => {
			// arrange
			ctx.mockJwtService.decode.mockReturnValue({});
			ctx.mockPrismaService.auth_session.count.mockResolvedValue(0);

			// act
			const result = ctx.authService.me(refreshToken);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockPrismaService.users.findFirst).not.toHaveBeenCalled();
		});
	});
});
