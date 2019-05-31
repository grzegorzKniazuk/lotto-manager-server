import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/shared/dto';
import { Observable } from 'rxjs';
import { InsertResult } from 'typeorm';

@Controller('users')
export class UsersController {

	constructor(
		private usersService: UsersService,
	) {
	}

	@Post()
	@HttpCode(201)
	public create(@Body()createUserDto: CreateUserDto): Observable<InsertResult> {
		return this.usersService.createUser(createUserDto);
	}
}
