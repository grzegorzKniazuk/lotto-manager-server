import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { BallValuePercentage, Score, ScoreQueryParams } from '../../shared/interfaces';
import { DateValueArray } from '../../shared/types';
import { ScoreNumbersExpression, ScoreNumbersFilters } from '../../shared/enums';

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
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.SUM);
	}

	@Post(ScoreNumbersExpression.AVERAGE)
	@HttpCode(200)
	public async average(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.AVERAGE);
	}

	@Post(ScoreNumbersExpression.MIN_MAX_DIFFERENCE)
	@HttpCode(200)
	public async minMaxDifference(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.MIN_MAX_DIFFERENCE);
	}

	@Post(ScoreNumbersExpression.MEDIAN)
	@HttpCode(200)
	public async median(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.MEDIAN);
	}

	@Post(ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION)
	@HttpCode(200)
	public async medianAbsoluteDeviation(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION);
	}

	@Post(ScoreNumbersExpression.PRODUCT)
	@HttpCode(200)
	public async product(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.PRODUCT);
	}

	@Post(ScoreNumbersExpression.STANDARD_DEVIATION)
	@HttpCode(200)
	public async standardDeviation(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.STANDARD_DEVIATION);
	}

	@Post(ScoreNumbersExpression.GREATEST_COMMON_DIVISOR)
	@HttpCode(200)
	public async greatestCommonDivisor(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.GREATEST_COMMON_DIVISOR);
	}

	@Post(ScoreNumbersExpression.LEAST_COMMON_MULTIPLE)
	@HttpCode(200)
	public async leastCommonMultiple(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray> {
		return await this.scoreService.scoresNumbersByExpression(queryParams, ScoreNumbersExpression.LEAST_COMMON_MULTIPLE);
	}

	@Post(ScoreNumbersFilters.NUMBERS_FREQUENCY)
	@HttpCode(200)
	public async numbersFrequency(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentage[]> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.NUMBERS_FREQUENCY);
	}
}
