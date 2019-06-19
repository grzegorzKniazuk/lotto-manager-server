import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { DatabaseErrorMessages } from '../../shared/constants';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreQueryParams } from '../../shared/interfaces';
import { DateValueArray } from '../../shared/types';
import { ScoreNumbersExpression } from '../../shared/enums';
import { forEach } from 'lodash';
import { BaseScoreService } from '../../shared/services';

@Injectable()
export class ScoreService extends BaseScoreService {

	constructor(
		@InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
	) {
		super();
	}

	public async scores(): Promise<Score[]> {
		try {
			const scores = await this.scoreRepository.find();

			return scores.map((score: Score) => {
				score.numbers = (score.numbers as string).split(',').map((number: string) => +number);

				return score;
			});

		} catch (e) {
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async sumScoresNumbers(queryParams: ScoreQueryParams): Promise<DateValueArray> {
		const { startDate, endDate, indexes } = this.prepareScoreQueryParams(queryParams);

		try {
			const scores = await this.scoreRepository.query(`SELECT date, numbers FROM score WHERE date >= ? AND date <= ?`, [ startDate, endDate ]);
			forEach(scores, (score: { date: string, numbers: string | number[] }) => {
				score.numbers = (score.numbers as string).split(',').map((x: string) => +x);
			});

			const filteredScores = this.filterScoresNumbersArrayByIndex(scores, indexes);

			return this.toDateValueArray(filteredScores, ScoreNumbersExpression.SUM);

		} catch (e) {
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
