import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.entity';
import { ScoreQueryParams } from '../../shared/interfaces';

@Controller('scores')
export class ScoreController {

	constructor(
		private readonly scoreService: ScoreService,
	) {
	}

	@Get()
	@HttpCode(200)
	public async scores(): Promise<Score[]> {
		return await this.scoreService.scores();
	}

	@Post('sum')
	@HttpCode(200)
	public async sumScoresNumbers(@Body() queryParams: ScoreQueryParams): Promise<[string, number][]> {
		return await this.scoreService.sumScoresNumbers(queryParams);
	}
}
