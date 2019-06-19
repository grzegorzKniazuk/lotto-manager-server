import { HttpStatus, Injectable } from '@nestjs/common';
import { Score, ScoreQueryParams } from '../interfaces';
import { DatabaseErrorMessages, FIRST_DRAW_DATE, ScoreNumbersExpressionsMap } from '../constants';
import { TimeService } from './time.service';
import { forEach, isNumber, map } from 'lodash';
import { ScoreNumbersExpression, SqlQuery } from '../enums';
import { DateValueArray } from '../types';
import { DatabaseException } from '../exception-handlers/database.exception';
import { ScoreEntity } from '../../modules/score/score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BaseScoreService {

	constructor(
		@InjectRepository(ScoreEntity) protected readonly scoreRepository: Repository<ScoreEntity>,
	) {
	}

	protected parseScoresRowDataPackets(scoresRdp: ScoreEntity[]): Score[] {
		const scores: Score[] = [];

		forEach(scoresRdp, (scoresRdp: ScoreEntity) => {
			scores.push({
				...scoresRdp,
				date: TimeService.formatDate(scoresRdp.date),
				numbers: scoresRdp.numbers.split(',').map((number: string) => +number),
			});
		});

		return scores;
	}

	protected catchDatabaseException(e): never {
		throw new DatabaseException({
			code: e.code,
			message: DatabaseErrorMessages[e.code] || e.message,
		}, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	protected prepareScoreQueryParams(queryParams: Partial<ScoreQueryParams>): ScoreQueryParams {
		const startDate = queryParams.startDate || FIRST_DRAW_DATE;
		const endDate = queryParams.endDate || TimeService.currentDate;
		const indexes = queryParams.indexes || [ 0, 1, 2, 3, 4 ];

		return {
			startDate,
			endDate,
			indexes,
		};
	}

	protected toDateValueArray(scores: Partial<Score>[], expression: ScoreNumbersExpression): DateValueArray {
		const dateValueArray: DateValueArray = [];

		forEach(scores, (score: Score) => {
			dateValueArray.push([ score.date, ScoreNumbersExpressionsMap[expression](score.numbers) ]);
		});

		return dateValueArray;
	}

	protected queryToDateValueArray(queryParams: Partial<ScoreQueryParams>): (query: SqlQuery) => (expression: ScoreNumbersExpression) => Promise<DateValueArray> {
		return (query: SqlQuery): (expression: ScoreNumbersExpression) => Promise<DateValueArray> => {
			return async (expression: ScoreNumbersExpression): Promise<DateValueArray> => {
				const { startDate, endDate, indexes } = this.prepareScoreQueryParams(queryParams);
				const scores = this.parseScoresRowDataPackets(await this.scoreRepository.query(query, [ startDate, endDate ]));
				const filteredScores = this.filterScoresNumbersArrayByIndex(scores, indexes);

				return this.toDateValueArray(filteredScores, expression);
			};
		};
	}

	private filterScoresNumbersArrayByIndex(scores: Partial<Score[]>, index: number | number[]): Partial<Score[]> {
		return map(scores, score => ({
			...score,
			numbers: isNumber(index)
				? [ score.numbers[index] ]
				: score.numbers.filter((n: number, i: number) => index.includes(i)),
		}));
	}

}
