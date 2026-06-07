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
		it("should sign up if the code is valid", async () => {
			// arrange
			const dto = {
				email: "email",
				password: "password",
				code: "code",
			};
			ctx.mockVerifyService.validateCode.mockResolvedValue({} as never);

			// act
			await ctx.authService.signup(dto);

			// assert
			expect(ctx.mockUserService.create).toHaveBeenCalled();
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

			// act
			const result = ctx.authService.signup(dto);

			// assert
			await expect(result).rejects.toThrow(error);
			expect(ctx.mockUserService.create).not.toHaveBeenCalled();
		});
	});
});
