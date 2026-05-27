import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "./../src/app.module";

import type { RootService } from "../src/modules/root/root.service";
import type { INestApplication } from "@nestjs/common";
import type { App } from "supertest/types";

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.get("/")
			.expect(200)
			.expect((res) => {
				expect(
					(res.body as ReturnType<RootService["getApiHealth"]>).status,
				).toBe("ok");
			});
	});

	afterEach(async () => {
		await app.close();
	});
});
