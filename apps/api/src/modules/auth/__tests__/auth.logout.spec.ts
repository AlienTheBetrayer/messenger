import { jestInitAuth } from "./init";

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("happy paths", () => {
		it("should successfully log the user out if session is found and refresh token is valid and decoded", async () => {
			// arrange
			const session = {
				id: "session-123",
			};

			ctx.mockAppJwtService.getAuthTokens.mockReturnValue({
				accessToken: "access",
				refreshToken: "refresh",
			});
			ctx.mockAppJwtService.verify.mockReturnValue({
				sessionId: session.id,
			});
			ctx.mockPrismaService.auth_session.count.mockResolvedValue(1);

			// act
			const result = await ctx.authService.logout(session.id);

			// assert
			expect(ctx.mockPrismaService.auth_session.delete).toHaveBeenCalled();
		});
	});

	describe("sad paths", () => {
		it("should not log the user out if session is not found", async () => {
			// arrange
			ctx.mockPrismaService.auth_session.count.mockResolvedValue(0);

			// act
			await ctx.authService.logout("session-id");

			// assert
			expect(ctx.mockPrismaService.auth_session.delete).not.toHaveBeenCalled();
		});
	});
});
