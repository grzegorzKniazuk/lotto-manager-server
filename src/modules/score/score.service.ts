import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScoreEntity } from './score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { DateValueArray } from '../../shared/types';
import { BaseScoreService } from '../../shared/services';
import { BallValuePercentage } from 'src/shared/interfaces/ball-value-percentage';
import { ScoreNumbersExpression, ScoreNumbersFilters, SqlQuery } from '../../shared/enums';

@Injectable()
export class ScoreService extends BaseScoreService {

	constructor(
		@InjectRepository(ScoreEntity) scoreRepository: Repository<ScoreEntity>,
	) {
		super(scoreRepository);
	}

	public async scores(): Promise<Score[]> {
		try {
			return this.parseScoresRowDataPackets(await this.scoreRepository.find());
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}

	public async scoresNumbersByExpression(queryParams: Partial<ScoreQueryParams>, expression: ScoreNumbersExpression): Promise<DateValueArray> {
		try {
			return await this.queryToDateValueArray(queryParams)(SqlQuery.DATE_AND_NUMBERS_BY_DATE_RANGE)(expression);
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}

	public async scoresNumbersByFilters(queryParams: Partial<ScoreQueryParams>, filter: ScoreNumbersFilters): Promise<BallValuePercentage[]> {
		try {
			return await this.queryToBallValuePercentageArray(queryParams)(SqlQuery.DATE_AND_NUMBERS_BY_DATE_RANGE)(filter);
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}
}
