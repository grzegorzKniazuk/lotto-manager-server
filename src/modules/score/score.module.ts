import { HttpModule, Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

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
