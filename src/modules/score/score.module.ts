import { HttpModule, Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreEntity } from './score.entity';
import { ScoreService } from './score.service';
import { BaseScoreService } from '../../shared/services';

@Module({
	imports: [
		TypeOrmModule.forFeature([ ScoreEntity ]),
		HttpModule,
	],
	controllers: [
		ScoreController,
	],
	providers: [
		ScoreService,
		BaseScoreService,
	],
})
export class ScoreModule {
}
