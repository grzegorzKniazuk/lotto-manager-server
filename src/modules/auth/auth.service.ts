import { HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseErrorMessages, secret } from '../../shared/constants';
import { InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterUserDto } from '../../shared/data-transfer-objects';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

	private readonly saltRounds = 10;

	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) {
	}

	public async createToken(id: number, username: string): Promise<string> {
		const user = { id, username };

		return jwt.sign(user, secret);
	}

	public async validateUser(user): Promise<boolean> {
		if (user && user.username) {
			return await !!this.getUserByUsername(user.username);
		} else {
			return false;
		}
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

	public async compareHash(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	private async getHash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

}
