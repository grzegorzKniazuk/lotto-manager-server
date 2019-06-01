import { Body, Controller, ForbiddenException, HttpCode, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/users/user.service';
import { LoginUserDto, RegisterUserDto } from 'src/shared/data-transfer-objects';
import { InsertResult } from 'typeorm';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {
	}

	@Post('login')
	@HttpCode(200)
	public async login(@Body()loginUserDto: LoginUserDto): Promise<{ username: string, token: string }> {
		const user = await this.userService.getUserByUsername(loginUserDto.username);

		if (user && await this.userService.compareHash(loginUserDto.password, user.password)) {
			const token =  await this.authService.createToken(user.id, user.username);

			return {
				username: user.username,
				token,
			}
		} else {
			throw new ForbiddenException('Nieprawidłowa nazwa użytkownika lub hasło');
		}
	}

	@Post('register')
	@HttpCode(201)
	public async register(@Body()registerUserDto: RegisterUserDto): Promise<InsertResult> {
		return await this.userService.register(registerUserDto);
	}
}
