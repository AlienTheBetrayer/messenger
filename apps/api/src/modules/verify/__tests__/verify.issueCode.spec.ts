import { CodeSchema } from "@gravity/shared";

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
		it("should return and send the code if it's been issued", async () => {
			// arrange
			const dto: CodeSchema = {
				email: "email",
				type: "signup",
			};
			ctx.mockPrismaService.verification_codes.create.mockResolvedValue({
				id: "code-123",
			});

			// act
			const result = await ctx.verifyService.issueCode(dto);

			// assert
			expect(result).not.toBeNull();
			expect(
				ctx.mockPrismaService.verification_codes.create,
			).toHaveBeenCalled();
		});
	});
});
