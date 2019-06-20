import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScoreEntity } from './score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Score, ScoreQueryParams } from '../../shared/interfaces';
import { BallValuePercentageArray, DateValueArray } from '../../shared/types';
import { TimeService } from '../../shared/services';
import { QueryableScoreField, ScoreNumbersExpression, ScoreNumbersFilter, ScoreQueryType } from '../../shared/enums';
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

	private catchDatabaseException(e): never {
		throw new DatabaseException({
			code: e.code,
			message: DatabaseErrorMessages[e.code] || e.message,
		}, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private async resolveQuery(query: string, queryParams: ScoreQueryParams): Promise<DateValueArray | BallValuePercentageArray> {
		const { startDate, endDate, indexes, filter, expression } = queryParams;
		const scores = this.parseScoresRowDataPackets(await this.scoreRepository.query(query, [ startDate, endDate ]));
		const filteredScores = this.filterScoresNumbersArray(scores, indexes, filter);

		switch (queryParams.queryType) {
			case ScoreQueryType.DATE_VALUE: {
				return this.toDateValueArray(filteredScores, expression);
			}
			case ScoreQueryType.BALL_VALUE_PERCENTAGE: {
				return await this.toBallValuePercentageArray(filteredScores);
			}
			default: {
				throw new InternalServerErrorException('Niepoprawny parametr "queryType"');
			}
		}
	}

	private filterScoresNumbersArray(scores: Partial<Score>[], index: number | number[], filter: ScoreNumbersFilter): Partial<Score>[] {
		return map(scores, score => ({
			...score,
			numbers: isNumber(index)
				? [ score.numbers[index] ]
				: score.numbers.filter((_, i: number) => index.includes(i)),
		})).filter(ScoreNumbersFiltersMap[filter] || (() => true));
	}

	private parseScoresRowDataPackets(scoresRdp: ScoreEntity[]): Score[] {
		const scores: Score[] = [];

		forEach(scoresRdp, (scoresRdp: ScoreEntity) => {
			scores.push({
				...scoresRdp,
				date: TimeService.formatDate(scoresRdp.date),
				numbers: scoresRdp.numbers ? scoresRdp.numbers.split(',').map((number: string) => +number) : [ scoresRdp.bonus_number ],
			});
		});

		return scores;
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
