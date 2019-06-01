import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';
import { secret } from 'src/shared/constants';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
	) {
	}

	public async createToken(id: number, username: string): Promise<string> {
		const user = { id, username };

		return jwt.sign(user, secret);
	}

	public async validateUser(user): Promise<boolean> {
		if (user && user.username) {
			return await !!this.userService.getUserByUsername(user.username);
		} else {
			return false;
		}
	}

}
