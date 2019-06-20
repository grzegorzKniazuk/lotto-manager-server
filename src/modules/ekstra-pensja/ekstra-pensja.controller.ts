import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { EkstraPensjaService } from './ekstra-pensja.service';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { BallValuePercentageArray, DateValueArray } from '../../shared/types';

@Controller('ekstra_pensja')
export class EkstraPensjaController {

	constructor(
		private readonly ekstraPensjaService: EkstraPensjaService,
	) {
	}

	@Get()
	@HttpCode(200)
	public async scores(): Promise<Score[]> {
		return await this.ekstraPensjaService.scores();
	}

	@Post('query')
	@HttpCode(200)
	public async scoresByQueryParams(@Body() queryParams: ScoreQueryParams): Promise<DateValueArray | BallValuePercentageArray> {
		return await this.ekstraPensjaService.scoresByQueryParams(queryParams);
	}
}
