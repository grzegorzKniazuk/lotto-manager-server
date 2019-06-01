import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { RegisterUserDto } from 'src/shared/data-transfer-objects';
import { DatabaseException } from 'src/shared/exception-handlers/database.exception';
import { DatabaseErrorMessages, secret } from 'src/shared/constants';
import { User } from 'src/shared/entities';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

	private readonly saltRounds = 10;

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
	) {
	}

	public async register(createUserDto: RegisterUserDto): Promise<InsertResult> {
		try {
			return await this.usersRepository.insert({
				...createUserDto,
				password: await this.getHash(createUserDto.password),
			});
		} catch (e) {
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.CONFLICT);
		}
	}

	public async authorize(token: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const verify = jwt.verify(token, secret);
			if (verify) {
				resolve(true);
			} else {
				reject(false);
			}
		});
	}

	public async getUserByUsername(username: string): Promise<User> {
		return await this.usersRepository.findOne({ username });
	}

	private async getHash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

	public async compareHash(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
