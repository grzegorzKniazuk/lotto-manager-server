import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { BallValuePercentageArray, DateValueArray } from '../../shared/types';

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

	@Post('query')
	@HttpCode(200)
	public async scoresByQueryParams(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray | BallValuePercentageArray> {
		return await this.scoreService.scoresByQueryParams(queryParams);
	}
}
