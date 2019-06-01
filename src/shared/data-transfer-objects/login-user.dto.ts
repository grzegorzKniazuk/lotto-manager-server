import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

	@IsString()
	@MinLength(1)
	@MaxLength(45)
	public readonly username: string;

	@IsString()
	@MinLength(1)
	@MaxLength(60)
	public readonly password: string;
}
