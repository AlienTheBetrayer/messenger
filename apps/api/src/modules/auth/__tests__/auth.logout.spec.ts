import { jestInitAuth } from "./init";

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("happy paths", () => {
		it("should successfully log the user out if session was found", async () => {
			// arrange
      const session = {
				id: "session-123",
			};

			ctx.mockPrismaService.auth_session.count.mockResolvedValue(1);
			ctx.mockPrismaService.auth_session.delete.mockResolvedValue(session);

      // act
			const result = await ctx.authService.logout(session.id);

      // assert
			expect(result).toEqual(session);
			expect(ctx.mockPrismaService.auth_session.delete).toHaveBeenCalledWith({
				where: {
					id: session.id,
				},
			});
		});
	});

	describe("sad paths", () => {
		it("should not log the user out if session is not found", async () => {
			// arrange
      ctx.mockPrismaService.auth_session.count.mockResolvedValue(0);

      // act
			const result = await ctx.authService.logout("session-id");

      // assert
			expect(result).toBeNull();
			expect(ctx.mockPrismaService.auth_session.delete).not.toHaveBeenCalled();
		});
	});
});
