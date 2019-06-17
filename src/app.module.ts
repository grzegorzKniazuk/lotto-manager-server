import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ScoreModule } from './modules/score/score.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		ScoreModule,
	],
})
export class AppModule {
}
