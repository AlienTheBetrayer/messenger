import { UserSchema } from "../user.dto";
import { jestInitUser } from "./init";

jest.mock("@dicebear/core", () => ({
	Avatar: class {
		toDataUri() {}
	},
	Style: class {},
}));

/**
 * testing
 */
describe("UserService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitUser>>;

	beforeEach(async () => {
		ctx = await jestInitUser();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const dto: UserSchema = {
		email: "email",
		password: "password",
	};

	describe("happy path", () => {
		it("should create the user if the email is not taken", async () => {
			// arrange
			ctx.mockPrismaService.users.count.mockResolvedValue(0);

			// act
			const result = await ctx.userService.create(dto);

			// assert
			expect(result).not.toBeNull();
			expect(ctx.mockPrismaService.users.create).toHaveBeenCalled();
		});
	});

	describe("sad path", () => {
		it("should throw if the email is taken", async () => {
			// arrange
			ctx.mockPrismaService.users.count.mockResolvedValue(1);

			// act
			const result = ctx.userService.create(dto);

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockPrismaService.users.create).not.toHaveBeenCalled();
		});
	});
});
