import bcrypt from "bcryptjs";

import { AuthContextType } from "../../auth-core/decorators";
import { jestInitAuth } from "./init";

jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
}));

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	// init variables
	const dto = {
		email: "email",
		password: "password",
		code: "code",
	};
	const authCtx: AuthContextType = {
		ip: "ip",
		userAgent: "userAgent",
	};
	const user = {
		id: "user-id",
		password: "password",
  };
  const ret = {
    accessToken: "a",
    refreshToken: "r",
    session: {}
  }

	describe("happy paths", () => {
		it("should login if the code and password are valid", async () => {
			// arrange
			ctx.mockVerifyService.validateCode.mockResolvedValue({} as never);
      ctx.mockPrismaService.users.findFirst.mockResolvedValue(user);
      ctx.mockAppJwtService.issueAuthData.mockResolvedValue(ret as never);
			jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

			// act
			const result = await ctx.authService.login(dto, authCtx);

			// assert
			expect(result).toBeDefined();
			expect(ctx.mockAppJwtService.issueAuthData).toHaveBeenCalled();
		});
	});

	describe("sad paths", () => {
		it("should throw when attempting to login with an invalid password", async () => {
			// arrange
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(undefined);
      ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);
      ctx.mockAppJwtService.issueAuthData.mockResolvedValue(ret as never);
			jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

			// act
			const result = ctx.authService.login(dto, authCtx);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockAppJwtService.issueAuthData).not.toHaveBeenCalled();
		});

		it("should throw when attempting to login with an invalid email", async () => {
			// arrange
			ctx.mockPrismaService.users.findFirst.mockResolvedValue(null);
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);
      ctx.mockAppJwtService.issueAuthData.mockResolvedValue(ret as never);

			// act
			const result = ctx.authService.login(dto, authCtx);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockAppJwtService.issueAuthData).not.toHaveBeenCalled();
		});

		it("should throw when attempting to login with an invalid code", async () => {
			const error = new Error();
			ctx.mockVerifyService.validateCode.mockRejectedValue(error);
			jest.spyOn(bcrypt, "compare");
      ctx.mockAppJwtService.issueAuthData.mockResolvedValue(ret as never);

			// act
			const result = ctx.authService.login(dto, authCtx);

			// assert
			await expect(result).rejects.toThrow(error);
			expect(bcrypt.compare).not.toHaveBeenCalled();
			expect(ctx.mockAppJwtService.issueAuthData).not.toHaveBeenCalled();
		});
	});
});
