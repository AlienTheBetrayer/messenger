import { UserGetReturn } from "@gravity/shared";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";

import { AuthenticatedGuard } from "../auth-core/guards";
import { UserGuard, UserNotFoundGuard } from "./guards";
import {
	UserCreateDto,
	UserDeleteDto,
	UserEditDto,
	UserGetByUsernameDto,
	UserGetDto,
} from "./user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("id/:userId")
	async get(@Param() params: UserGetDto): Promise<UserGetReturn> {
		const user = await this.userService.get(params);
		return { user };
	}

	@Get("username/:username")
	async getByUsername(
		@Param() params: UserGetByUsernameDto,
	): Promise<UserGetReturn> {
		const user = await this.userService.getByUsername(params);
		return { user };
	}

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
