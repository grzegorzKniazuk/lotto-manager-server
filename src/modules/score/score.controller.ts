import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { BallValuePercentageArray, DateValueArray } from '../../shared/types';
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
	public async numbersFrequency(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.NUMBERS_FREQUENCY);
	}

	@Post(ScoreNumbersFilters.SAME_WEEK_DAY_AS_TODAY)
	@HttpCode(200)
	public async sameWeekDayAsToday(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.SAME_WEEK_DAY_AS_TODAY);
	}

	@Post(ScoreNumbersFilters.SAME_MONTH_AS_TODAY)
	@HttpCode(200)
	public async sameMonthDayAsToday(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.SAME_MONTH_AS_TODAY);
	}

	@Post(ScoreNumbersFilters.ODD_DAY)
	@HttpCode(200)
	public async oddDay(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.ODD_DAY);
	}

	@Post(ScoreNumbersFilters.EVEN_DAY)
	@HttpCode(200)
	public async evenDay(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.EVEN_DAY);
	}

	@Post(ScoreNumbersFilters.ODD_MONTH)
	@HttpCode(200)
	public async oddMonth(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.ODD_MONTH);
	}

	@Post(ScoreNumbersFilters.EVEN_MONTH)
	@HttpCode(200)
	public async evenMonth(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.EVEN_MONTH);
	}

	@Post(ScoreNumbersFilters.SAME_YEAR_QUARTER)
	@HttpCode(200)
	public async sameYearDayQuarter(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.NUMBERS_FREQUENCY);
	}

	@Post(ScoreNumbersFilters.SAME_YEAR_DAY_NUMBER)
	@HttpCode(200)
	public async sameYearDayNumber(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.SAME_YEAR_DAY_NUMBER);
	}

	@Post(ScoreNumbersFilters.SAME_MONTH_DAY_NUMBER)
	@HttpCode(200)
	public async samMonthDayNumber(@Body() queryParams: ScoreQueryParams): Promise<BallValuePercentageArray> {
		return await this.scoreService.scoresNumbersByFilters(queryParams, ScoreNumbersFilters.SAME_MONTH_DAY_NUMBER);
	}
}
