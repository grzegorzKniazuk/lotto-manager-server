import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InsertResult, Repository } from 'typeorm';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateUserDto } from 'src/shared/dto';
import { DatabaseException } from 'src/shared/exception-handlers/database.exception';
import { DatabaseError } from 'src/shared/interfaces/database-response';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
	) {
	}

	public createUser(createUserDto: CreateUserDto): Observable<InsertResult> {
		return fromPromise(this.usersRepository.insert(createUserDto))
			.pipe(catchError((e: DatabaseError) => {
				throw new DatabaseException({
					code: e.code,
					message: e.message,
				}, HttpStatus.CONFLICT);
			}));
	}
}
