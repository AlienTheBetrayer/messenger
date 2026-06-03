import { TokenPayloadSchema } from "../auth.types";
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
		it("should return a user if the user exists", async () => {
			// arrange
			const refreshPayload: TokenPayloadSchema = {
				sessionId: "session-123",
				userId: "user-123",
			};
			const user = {
				id: "user-123",
			};
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(user);

			// act
			const result = await ctx.authService.me(refreshPayload);

			// assert
			expect(result).not.toBeNull();
			expect(result?.id).toBe(user.id);
		});
	});

	describe("sad paths", () => {
		it("should return null if the user does not exist", async () => {
			// arrange
			const refreshPayload: TokenPayloadSchema = {
				sessionId: "session-123",
				userId: "user-123",
			};
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(null);

			// act
			const result = await ctx.authService.me(refreshPayload);

			// assert
			expect(result).toBeNull();
		});
	});
});
