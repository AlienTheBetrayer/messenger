import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service.js';

@Controller('test')
export class TestController {
	constructor(private testService: TestService) {}

	@Get()
	async randomTestGet() {
		return await this.testService.randomTestGet();
	}

	@Post()
	async randomTestPost() {
		return await this.testService.randomTestPost();
	}
}
