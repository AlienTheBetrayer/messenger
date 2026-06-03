import { jestInitRoot } from "./init";

/**
 * testing
 */
describe("RootService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitRoot>>;

	beforeEach(async () => {
		ctx = await jestInitRoot();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("happy path", () => {
		it("should return the correct health status", () => {
			// act
			const result = ctx.rootService.health();

			// assert
			expect(result).toHaveProperty("status", "ok");
		});
	});
});
