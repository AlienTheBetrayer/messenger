import { VerifyService } from "../verify.service";
import { jestInitVerify } from "./init";

describe("VerifyService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitVerify>>;

	beforeEach(async () => {
		ctx = await jestInitVerify();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("happy paths", () => {
		it("should validate the code if it found the right one", async () => {
			// arrange
			const dto: Parameters<VerifyService["validateCode"]>[0] = {
				email: "m@email.com",
				code: "23423423",
				type: "signup",
			};
			ctx.mockPrismaService.verification_codes.findFirst.mockResolvedValue({});

			// act
			const result = await ctx.verifyService.validateCode(dto);

			// assert
			expect(result).toBeDefined();
		});
	});

	describe("sad paths", () => {
		it("should throw while validating the code if it hasn't found it", async () => {
			// arrange
			const dto: Parameters<VerifyService["validateCode"]>[0] = {
				email: "m@email.com",
				code: "23423423",
				type: "signup",
			};
			ctx.mockPrismaService.verification_codes.findFirst.mockResolvedValue(
				null,
			);

			// act
			const result = ctx.verifyService.validateCode(dto);

			// assert
			await expect(result).rejects.toThrow();
		});
	});
});
