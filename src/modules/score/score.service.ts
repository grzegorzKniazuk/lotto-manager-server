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
		@InjectRepository(ScoreEntity) private readonly scoreRepository: Repository<ScoreEntity>,
	) {
		super();
	}

	public async scores(): Promise<Score[]> {
		try {
			return this.parseScoresRowDataPackets(await this.scoreRepository.find());
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}

	public async sumScoresNumbers(queryParams: ScoreQueryParams): Promise<DateValueArray> {
		const { startDate, endDate, indexes } = this.prepareScoreQueryParams(queryParams);

		try {
			const scores = this.parseScoresRowDataPackets(await this.scoreRepository.query(SqlQuery.DATE_AND_NUMBERS_BY_DATE_RANGE, [ startDate, endDate ]));

			const filteredScores = this.filterScoresNumbersArrayByIndex(scores, indexes);

			return this.toDateValueArray(filteredScores, ScoreNumbersExpression.SUM);

		} catch (e) {
			this.catchDatabaseException(e);
		}

	}
}
