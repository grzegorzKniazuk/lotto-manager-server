import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		) {
	}

	public async getUsers(user: User): Promise<User[]> {
		return await this.usersRepository.find();
	}

	public async getUser(_id: number): Promise<User[]> {
		return await this.usersRepository.find({
			select: [ 'username' ],
			where: [ { 'id': _id } ],
		});
	}

	public async createUser(user: User): Promise<InsertResult> {
		return await this.usersRepository.insert(user);
	}

	public async updateUser(user: User) {
		this.usersRepository.save(user);
	}

	public async deleteUser(user: User) {
		this.usersRepository.delete(user);
	}
}
