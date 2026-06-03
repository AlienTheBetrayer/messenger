import { Test } from "@nestjs/testing";

import { RootService } from "../root.service";

/**
 * initializes the root module for jest
 * @returns context file
 */
export const jestInitRoot = async () => {
	const moduleRef = await Test.createTestingModule({
		providers: [RootService],
	}).compile();

	const rootService = moduleRef.get<RootService>(RootService);

	return {
		rootService,
	};
};
