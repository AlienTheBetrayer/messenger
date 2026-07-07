import {
	Body,
	Controller,
	Delete,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";

import { AuthenticatedGuard } from "../auth-core/guards";
import { UserGuard, UserNotFoundGuard } from "./guards";
import { UserCreateDto, UserDeleteDto, UserEditDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseGuards(AuthenticatedGuard, UserNotFoundGuard)
	async create(@Body() body: UserCreateDto) {
		return await this.userService.create(body);
	}

	@Delete()
	@UseGuards(AuthenticatedGuard, UserGuard)
	async delete(@Body() body: UserDeleteDto) {
		return await this.userService.delete(body);
	}

	@Patch()
	@UseGuards(AuthenticatedGuard, UserGuard)
	async edit(@Body() body: UserEditDto) {
		return await this.userService.edit(body);
	}
}
