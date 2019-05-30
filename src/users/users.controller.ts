import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
	) {
	}

	@Get(':id')
	public get(@Param() params) {
		return this.usersService.getUser(params.id);
	}

	@Get()
	findAll() {
		return 'This route uses a wildcard';
	}

	@Post()
	public create(@Body()user: User) {
		return this.usersService.createUser(user);
	}

	@Put()
	public update(@Body() user: User) {
		return this.usersService.updateUser(user);
	}

	@Delete(':id')
	public deleteUser(@Param() params) {
		return this.usersService.deleteUser(params.id);
	}
}
