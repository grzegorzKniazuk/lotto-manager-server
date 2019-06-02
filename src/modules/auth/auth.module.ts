import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import * as passport from 'passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([ User ]),
	],
	controllers: [
		AuthController,
	],
	providers: [
		AuthService,
		JwtStrategy,
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
