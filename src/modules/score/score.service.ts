import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScoreEntity } from './score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { DateValueArray } from '../../shared/types';
import { ScoreNumbersExpression, SqlQuery } from '../../shared/enums';
import { BaseScoreService } from '../../shared/services';

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

	public async sumScoresNumbers(queryParams: Partial<ScoreQueryParams>): Promise<DateValueArray> {
		try {
			return await this.queryToDateValueArray(queryParams)(SqlQuery.DATE_AND_NUMBERS_BY_DATE_RANGE)(ScoreNumbersExpression.SUM);
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}
}
