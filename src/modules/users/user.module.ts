import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import { UserController } from 'src/modules/users/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([ User ]),
	],
	providers: [
		UserService,
	],
	controllers: [
		UserController,
	],
	exports: [
		UserService,
	],
})
export class UserModule {
}
