import { ScoreNumbersExpression } from '../enums';
import { sum, mean, max, min, subtract, median, mad, prod, std, gcd, lcm } from 'mathjs';

export const ScoreNumbersExpressionsMap = {
	[ScoreNumbersExpression.SUM]: (numbers: number[]) => sum(numbers),
	[ScoreNumbersExpression.AVERAGE]: (numbers: number[]) => mean(numbers),
	[ScoreNumbersExpression.MIN_MAX_DIFFERENCE]: (numbers: number[]) => subtract(max(numbers), min(numbers)) as number,
	[ScoreNumbersExpression.MEDIAN]: (numbers: number[]) => median(numbers),
	[ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION]: (numbers: number[]) => mad(numbers),
	[ScoreNumbersExpression.PRODUCT]: (numbers: number[]) => prod(numbers),
	[ScoreNumbersExpression.STANDARD_DEVIATION]: (numbers: number[]) => std(numbers),
	[ScoreNumbersExpression.GREATEST_COMMON_DIVISOR]: (numbers: number[]) => gcd(...numbers),
	// @ts-ignore
	[ScoreNumbersExpression.LEAST_COMMON_MULTIPLE]: (numbers: number[]) => lcm(...numbers),
};
