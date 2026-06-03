import bcrypt from "bcryptjs";

import { jestInitAuth } from "./init";

// Mock bcrypt so we don't run expensive hashing algorithms in unit tests
jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
}));

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("happy paths", () => {
		it("should login if the code and password are valid", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			const user = {
				id: "user-id",
			};
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(user);
			jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
			ctx.mockJwtService.issueAuthTokens.mockResolvedValue({} as never);

			// act
			const result = await ctx.authService.login(dto);

			// assert
			expect(result).toBeDefined();
			expect(ctx.mockJwtService.issueAuthTokens).toHaveBeenCalledWith({
				userId: user.id,
			});
		});
	});

	describe("sad paths", () => {
		it("should throw when attempting to login with an invalid password", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(undefined);
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);
			jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

			// act
			const result = ctx.authService.login(dto);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockJwtService.issueAuthTokens).not.toHaveBeenCalled();
		});

		it("should throw when attempting to login with an invalid email", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(null);
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);

			// act
			const result = ctx.authService.login(dto);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockJwtService.issueAuthTokens).not.toHaveBeenCalled();
		});

		it("should throw when attempting to login with an invalid code", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			const error = new Error();
			ctx.mockVerifyService.validateCode.mockRejectedValue(error);
			jest.spyOn(bcrypt, "compare");

			// act
			const result = ctx.authService.login(dto);

			// assert
			await expect(result).rejects.toThrow(error);
			expect(bcrypt.compare).not.toHaveBeenCalled();
			expect(ctx.mockJwtService.issueAuthTokens).not.toHaveBeenCalled();
		});
	});
});
