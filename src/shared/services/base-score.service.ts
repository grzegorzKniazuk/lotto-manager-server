import { HttpStatus, Injectable } from '@nestjs/common';
import { BallValuePercentage, Score, ScoreQueryParams } from '../interfaces';
import { DatabaseErrorMessages, FIRST_DRAW_DATE, ScoreNumbersExpressionsMap, ScoreNumbersFiltersMap } from '../constants';
import { TimeService } from './time.service';
import { forEach, isNumber, map, filter, flatten, mapValues } from 'lodash';
import { DateValueArray } from '../types';
import { DatabaseException } from '../exception-handlers/database.exception';
import { ScoreEntity } from '../../modules/score/score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreNumbersExpression, ScoreNumbersFilters, SqlQuery } from '../enums';

@Injectable()
export class BaseScoreService {

	constructor(
		@InjectRepository(ScoreEntity) protected readonly scoreRepository: Repository<ScoreEntity>,
	) {
	}

	private filterScoresNumbersArrayByIndex(scores: Partial<Score[]>, index: number | number[]): Partial<Score[]> {
		return map(scores, score => ({
			...score,
			numbers: isNumber(index)
				? [ score.numbers[index] ]
				: score.numbers.filter((n: number, i: number) => index.includes(i)),
		}));
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
				const scoresFilteredByIndexes = this.filterScoresNumbersArrayByIndex(scores, indexes);

				return this.toDateValueArray(scoresFilteredByIndexes, expression);
			};
		};
	}

	protected queryToBallValuePercentageArray(queryParams: Partial<ScoreQueryParams>): (query: SqlQuery) => (scoreFilter: ScoreNumbersFilters) => Promise<BallValuePercentage[]> {
		return (query: SqlQuery): (scoreFilter: ScoreNumbersFilters) => Promise<BallValuePercentage[]> => {
			return async (scoreFilter: ScoreNumbersFilters): Promise<BallValuePercentage[]> => {
				const { startDate, endDate, indexes } = this.prepareScoreQueryParams(queryParams);
				const scores = this.parseScoresRowDataPackets(await this.scoreRepository.query(query, [ startDate, endDate ]));
				const scoresFilteredByIndexes = this.filterScoresNumbersArrayByIndex(scores, indexes);

				return this.toBallValuePercentageArray(scoresFilteredByIndexes, scoreFilter);
			};
		};
	}

	private toBallValuePercentageArray(scores: Partial<Score>[], scoreFilter: ScoreNumbersFilters): BallValuePercentage[] {
		const filteredScores = filter(scores, ScoreNumbersFiltersMap[scoreFilter]);

		const flatScoresNumbers = this.scoresNumbersArraysToFlatNumbersArray(filteredScores);

		return this.mapNumbersArrayToBallValuePercentage(flatScoresNumbers);
	}

	private scoresNumbersArraysToFlatNumbersArray(scoresNumbers: Partial<Score>[]): number[] {
		return flatten(map(scoresNumbers, this.pickNumbers));
	}

	private pickNumbers(score: Score): number[] {
		return score.numbers;
	}

	private mapNumbersArrayToBallValuePercentage(array: number[] = []): BallValuePercentage[] {
		const result = {};

		array.forEach(number => {
			if (result.hasOwnProperty(number)) {
				result[number] = result[number] + 1;
			} else {
				Object.defineProperty(result, number, { value: 1, writable: true, configurable: true, enumerable: true });
			}
		});
		return this.mapNumberKeyValueObjectToBallValuePercentage(result)(array.length);
	}

	private mapNumberKeyValueObjectToBallValuePercentage(values: { [key: string]: number }): (numberOfElements: number) => BallValuePercentage[] {
		const resultArray = [];

		return (numberOfElements: number): BallValuePercentage[] => {
			if (values) {
				mapValues(values, (value, index) => {
					resultArray.push({
						ball: +index,
						value,
						percentage: this.percentage(value, numberOfElements),
					});
				});
			}
			return resultArray;
		};
	}

	private percentage(value: number, total: number): number {
		return (value / total) * 100;
	}
}
