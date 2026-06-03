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
		it("should return codes if found", async () => {
			// arrange
			const dto = {
				email: "email@gmail.com",
			};
			ctx.mockPrismaService.verification_codes.count.mockResolvedValue(1);

			// act
			const result = await ctx.verifyService.cleanupCodes(dto);

			// assert
			expect(result).not.toBeNull();
		});
	});

	describe("sad paths", () => {
		it("should return null if no codes are found", async () => {
			// arrange
			const dto = {
				email: "email@gmail.com",
			};
			ctx.mockPrismaService.verification_codes.count.mockResolvedValue(0);

			// act
			const result = await ctx.verifyService.cleanupCodes(dto);

			// assert
			expect(result).toBeNull();
			expect(
				ctx.mockPrismaService.verification_codes.deleteMany,
			).not.toHaveBeenCalled();
		});
	});
});
