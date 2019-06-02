import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ScoreModule } from './modules/score/score.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		ScoreModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
	],
})
export class AppModule {
}
