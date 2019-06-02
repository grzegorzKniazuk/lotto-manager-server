import { IsString } from 'class-validator';

export class AuthorizeUserDto {

	@IsString()
	public readonly token: string;
}
