import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {

	constructor(response: { code: string, message: string }, status: HttpStatus) {
		super(response, status);
	}
}
