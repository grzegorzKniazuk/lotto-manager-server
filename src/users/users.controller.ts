import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

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

	@Post()
	public create(@Body() user: User): void {
		this.usersService.createUser(user).subscribe((r) => {
			console.log(r);
		});
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
