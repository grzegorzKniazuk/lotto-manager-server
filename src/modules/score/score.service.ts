import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { DatabaseErrorMessages, FIRST_DRAW_DATE } from '../../shared/constants';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreQueryParams } from '../../shared/interfaces';
import { filterScoresNumbersArrayByIndex } from '../../shared/utils';
import { forEach } from 'lodash';
import { TimeService } from '../../shared/services/time.service';

@Injectable()
export class ScoreService {

	constructor(
		@InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
	) {
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

	public async sumScoresNumbers(queryParams: ScoreQueryParams): Promise<[string, number][]> {
		const startDate = queryParams.startDate || FIRST_DRAW_DATE;
		const endDate = queryParams.endDate || TimeService.currentDate;
		const { indexes } = queryParams;

		try {
			const scores = await this.scoreRepository.query(`SELECT date, numbers FROM score WHERE date >= ? AND date <= ?`, [ startDate, endDate ]);
			const scoresFilteredByIndexes = indexes ? filterScoresNumbersArrayByIndex(scores, indexes) : scores;
			const dateValueArray = [];

			forEach(scoresFilteredByIndexes, (score: Score) => {
				const calculatedValue = (score.numbers as string).split(',').reduce((acc, next) => acc + +next, 0);
				dateValueArray.push([ TimeService.formatDate(score.date), calculatedValue ]);
			});

			return dateValueArray;

		} catch (e) {
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
