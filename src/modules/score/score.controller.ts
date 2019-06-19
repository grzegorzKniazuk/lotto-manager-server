import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { ScoreNumbersExpression } from '../../shared/enums';
import { DateValueArray } from '../../shared/types';

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

	@Post(ScoreNumbersExpression.SUM)
	@HttpCode(200)
	public async sum(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.SUM);
	}

	@Post(ScoreNumbersExpression.AVERAGE)
	@HttpCode(200)
	public async average(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.AVERAGE);
	}

	@Post(ScoreNumbersExpression.MIN_MAX_DIFFERENCE)
	@HttpCode(200)
	public async minMaxDifference(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.MIN_MAX_DIFFERENCE);
	}

	@Post(ScoreNumbersExpression.MEDIAN)
	@HttpCode(200)
	public async median(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.MEDIAN);
	}

	@Post(ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION)
	@HttpCode(200)
	public async medianAbsoluteDeviation(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION);
	}

	@Post(ScoreNumbersExpression.PRODUCT)
	@HttpCode(200)
	public async product(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.PRODUCT);
	}

	@Post(ScoreNumbersExpression.STANDARD_DEVIATION)
	@HttpCode(200)
	public async standardDeviation(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.STANDARD_DEVIATION);
	}

	@Post(ScoreNumbersExpression.GREATEST_COMMON_DIVISOR)
	@HttpCode(200)
	public async greatestCommonDivisor(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.GREATEST_COMMON_DIVISOR);
	}

	@Post(ScoreNumbersExpression.LEAST_COMMON_MULTIPLE)
	@HttpCode(200)
	public async leastCommonMultiple(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByQueryParams(queryParams, ScoreNumbersExpression.LEAST_COMMON_MULTIPLE);
	}
}
