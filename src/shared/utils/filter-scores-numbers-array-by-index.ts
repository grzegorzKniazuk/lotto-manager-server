import { isNumber, map } from 'lodash';
import { Score } from '../interfaces';

export function filterScoresNumbersArrayByIndex(scores: Score[], index: number | number[]): Score[] {
	return map(scores, score => ({
		...score,
		numbers: isNumber(index)
			? [ score.numbers[index] ]
			: score.numbers.filter((n: number, i: number) => (index.includes(i))),
	}));
}
