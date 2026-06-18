import { jestInitUser } from "./init";

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

	// arrange vars
	const dto = "m@gmail.com";

	describe("happy paths", () => {
		it("should generate a username and not search for more if it doesn't exist", async () => {
			// arrange
			ctx.mockPrismaService.users.count.mockResolvedValue(0);

			// act
			await ctx.userService.generateUsername(dto);

			// assert
			expect(ctx.mockPrismaService.users.findMany).not.toHaveBeenCalled();
		});
	});

	describe("sad paths", () => {
		it("should start searching for all usernames if it exists", async () => {
			// arrange
			ctx.mockPrismaService.users.count.mockResolvedValue(1);
			ctx.mockPrismaService.users.findMany.mockResolvedValue([
				{ username: "username" },
			]);

			// act
			await ctx.userService.generateUsername(dto);

			// assert
			expect(ctx.mockPrismaService.users.findMany).toHaveBeenCalled();
		});
	});
});
