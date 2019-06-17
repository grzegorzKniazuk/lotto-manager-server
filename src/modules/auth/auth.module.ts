import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as passport from 'passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ User ]),
	],
	controllers: [
		AuthController,
	],
	providers: [
		JwtStrategy,
		AuthService,
	],
})
export class AuthModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(passport.authenticate('jwt', { session: false }))
		.forRoutes(
			{ path: '/products', method: RequestMethod.ALL },
			{ path: '/products/*', method: RequestMethod.ALL });
	}
}
