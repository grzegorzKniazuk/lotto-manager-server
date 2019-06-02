import { IsString, Length } from 'class-validator';

export class LoginUserDto {

	@IsString()
	@Length(1, 45)
	public readonly username: string;

	@IsString()
	@Length(1, 60)
	public readonly password: string;
}
