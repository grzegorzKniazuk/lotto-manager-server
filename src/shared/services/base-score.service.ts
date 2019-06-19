import { Injectable } from '@nestjs/common';
import { Score, ScoreQueryParams } from '../interfaces';
import { FIRST_DRAW_DATE, ScoreNumbersExpressionsMap } from '../constants';
import { TimeService } from './time.service';
import { forEach, isNumber, map } from 'lodash';
import { ScoreNumbersExpression } from '../enums';
import { DateValueArray } from '../types';

@Injectable()
export class BaseScoreService {

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

	protected filterScoresNumbersArrayByIndex(scores: Partial<Score[]>, index: number | number[]): Partial<Score[]> {
		return map(scores, score => ({
			...score,
			numbers: isNumber(index)
				? [ score.numbers[index] ]
				: score.numbers.filter((n: number, i: number) => index.includes(i)),
		}));
	}

	protected toDateValueArray(scores: Partial<Score>[], expression: ScoreNumbersExpression): DateValueArray {
		const dateValueArray: DateValueArray = [];

		forEach(scores, (score: Score) => {
			dateValueArray.push([ TimeService.formatDate(score.date), ScoreNumbersExpressionsMap[expression](score.numbers) ]);
		});

		return dateValueArray;
	}
}
