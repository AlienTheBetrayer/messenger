import bcrypt from "bcryptjs";

import { createException } from "../../../common";
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
		it("should change the password if the code is valid", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);
      ctx.mockPrismaService.users.update.mockResolvedValue({});
			jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password" as never);

			// act
			const result = await ctx.authService.forgotPassword(dto);

			// assert
			expect(result).toBeDefined();
			expect(ctx.mockPrismaService.users.update).toHaveBeenCalledWith({
				where: {
					email: dto.email,
				},
				data: {
					password: "hashed-password",
				},
			});
		});
	});

	describe("sad paths", () => {
		it("should throw when attempting to recover the password with an invalid code", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
      const error = new Error();
			ctx.mockVerifyService.validateCode.mockRejectedValue(error);

			// act
			const result = ctx.authService.forgotPassword(dto);

			// assert
			await expect(result).rejects.toThrow(error);
			expect(ctx.mockPrismaService.users.update).not.toHaveBeenCalled();
		});
	});
});
