import { HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseError } from 'src/shared/interfaces/database-response';

export class DatabaseException extends HttpException {

	constructor(response: Partial<DatabaseError>, status: HttpStatus) {
		super(response, status);
	}
}
