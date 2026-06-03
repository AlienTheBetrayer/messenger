import bcrypt from "bcryptjs";

import { createException } from "../../../common";
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
		it("should sign up if the code is valid", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			ctx.mockVerifyService.validateCode.mockResolvedValue(undefined as never);

			jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password" as never);

			// act
			await ctx.authService.signup(dto);

			// assert
      expect(ctx.mockPrismaService.users.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          password: "hashed-password",
        }
      });
		});
	});

	describe("sad paths", () => {
		it("should throw when attempting to sign up with an invalid code", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
      };
      const error = new Error();
			ctx.mockVerifyService.validateCode.mockRejectedValue(error);
			jest.spyOn(bcrypt, "hash");

			// act
			const result = ctx.authService.signup(dto);

			// assert
			await expect(result).rejects.toThrow(error);
			expect(bcrypt.hash).not.toHaveBeenCalled();
			expect(ctx.mockPrismaService.users.create).not.toHaveBeenCalled();
		});
	});
});
