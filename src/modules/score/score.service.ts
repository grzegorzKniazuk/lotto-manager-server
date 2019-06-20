import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScoreEntity } from './score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { BallValuePercentageArray, DateValueArray } from '../../shared/types';
import { TimeService } from '../../shared/services';
import { QueryableScoreField, ScoreNumbersExpression, ScoreQueryType } from '../../shared/enums';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { DatabaseErrorMessages, FIRST_DRAW_DATE, ScoreNumbersExpressionsMap, ScoreNumbersFiltersMap } from '../../shared/constants';
import { flatten, forEach, isNumber, map, mapValues } from 'lodash';

@Injectable()
export class ScoreService {

	constructor(
		@InjectRepository(ScoreEntity) private readonly scoreRepository: Repository<ScoreEntity>,
	) {
	}

	public async scores(): Promise<Score[]> {
		try {
			return this.parseScoresRowDataPackets(await this.scoreRepository.find());
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}

	public async scoresByQueryParams(queryParams: ScoreQueryParams): Promise<any> {
		try {
			return await this.resolveQuery(this.prepareQuery(queryParams.byField), this.prepareScoreQueryParams(queryParams));
		} catch (e) {
			this.catchDatabaseException(e);
		}
	}

	private async resolveQuery(query: string, queryParams: ScoreQueryParams): Promise<DateValueArray | BallValuePercentageArray> {
		const { startDate, endDate, indexes, filter, expression } = queryParams;

		let scores = this.parseScoresRowDataPackets(await this.scoreRepository.query(query, [ startDate, endDate ]));
		scores = this.filterScoresNumbersArrayByIndex(scores, indexes);
		if (filter) {
			scores = scores.filter(ScoreNumbersFiltersMap[filter]);
		}

		if (queryParams.queryType === ScoreQueryType.DATE_VALUE) {
			return this.toDateValueArray(scores, expression);
		} else if (queryParams.queryType === ScoreQueryType.BALL_VALUE_PERCENTAGE) {
			return await this.toBallValuePercentageArray(scores);
		}
	}

	private filterScoresNumbersArrayByIndex(scores: Partial<Score[]>, index: number | number[]): Partial<Score[]> {
		return map(scores, score => ({
			...score,
			numbers: isNumber(index)
				? [ score.numbers[index] ]
				: score.numbers.filter((n: number, i: number) => index.includes(i)),
		}));
	}

	private parseScoresRowDataPackets(scoresRdp: ScoreEntity[]): Score[] {
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

	private catchDatabaseException(e): never {
		throw new DatabaseException({
			code: e.code,
			message: DatabaseErrorMessages[e.code] || e.message,
		}, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private prepareQuery(byField: QueryableScoreField): string {
		return `SELECT date, ${byField} FROM score WHERE date >= ? AND date <= ?`;
	}

	private prepareScoreQueryParams(queryParams: Partial<ScoreQueryParams>): ScoreQueryParams {
		const startDate = queryParams.startDate || FIRST_DRAW_DATE;
		const endDate = queryParams.endDate || TimeService.currentDate;

		return {
			queryType: queryParams.queryType,
			byField: queryParams.byField,
			startDate,
			endDate,
			indexes: queryParams.indexes,
			filter: queryParams.filter,
			expression: queryParams.expression,
		};
	}

	private toDateValueArray(scores: Partial<Score>[], expression: ScoreNumbersExpression): DateValueArray {
		const dateValueArray: DateValueArray = [];

		forEach(scores, (score: Score) => {
			dateValueArray.push([ score.date, ScoreNumbersExpressionsMap[expression](score.numbers) ]);
		});

		return dateValueArray;
	}

	private toBallValuePercentageArray(scores: Partial<Score>[]): BallValuePercentageArray {
		const flatScoresNumbers = this.scoresNumbersArraysToFlatNumbersArray(scores);

		return this.mapNumbersArrayToBallValuePercentage(flatScoresNumbers);
	}

	private scoresNumbersArraysToFlatNumbersArray(scoresNumbers: Partial<Score>[]): number[] {
		return flatten(map(scoresNumbers, this.pickNumbers));
	}

	private pickNumbers(score: Score): number[] {
		return score.numbers;
	}

	private mapNumbersArrayToBallValuePercentage(array: number[] = []): BallValuePercentageArray {
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

	private mapNumberKeyValueObjectToBallValuePercentage(values: { [key: string]: number }): (numberOfElements: number) => BallValuePercentageArray {
		const resultArray = [];

		return (numberOfElements: number): BallValuePercentageArray => {
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
