import { HttpModule, Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/shared/entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([ Score ]),
		HttpModule,
	],
	controllers: [
		ScoreController,
	],
	providers: [
		ScoreService,
	],
})
export class ScoreModule {
}
