import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ScoreModule } from './modules/score/score.module';
import { TimeService } from './shared/services';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		ScoreModule,
	],
	providers: [
		TimeService,
	],
})
export class AppModule {
}
