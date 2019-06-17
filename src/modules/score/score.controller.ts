import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.entity';
import { ScoreQueryParams } from '../../shared/interfaces/score-query-params';

@Controller('scores')
export class ScoreController {

	constructor(
		private readonly scoreService: ScoreService,
	) {
	}

	@Get()
	@HttpCode(200)
	public async scores(@Query() queryParams: ScoreQueryParams): Promise<Score[]> {
		return await this.scoreService.scores(queryParams);
	}
}
