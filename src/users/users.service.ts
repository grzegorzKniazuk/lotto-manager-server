import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
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

	public createUser(user: User): Observable<User> {
		return fromPromise(this.usersRepository.save(user));
	}

	public async updateUser(user: User) {
		this.usersRepository.save(user);
	}

	public async deleteUser(user: User) {
		this.usersRepository.delete(user);
	}
}
