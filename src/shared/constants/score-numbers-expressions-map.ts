import { ScoreNumbersExpression } from '../enums';

export const ScoreNumbersExpressionsMap = {
	[ScoreNumbersExpression.SUM]: (numbers: number[]) => numbers.reduce((acc, next) => acc + +next, 0),
	/*
	[ExpressionScore.AVERAGE]: average,
	[ExpressionScore.MIN_MAX_DIFFERENCE]: minMaxDifference,
	[ExpressionScore.MEDIAN]: medianArray,
	[ExpressionScore.MEDIAN_ABSOLUTE_DEVIATION]: medianAbsoluteDeviation,
	[ExpressionScore.PRODUCT]: product,
	[ExpressionScore.STANDARD_DEVIATION]: standardDeviation,
	[ExpressionScore.GREATEST_COMMON_DIVISOR]: greatestCommonDivisor,
	[ExpressionScore.LEAST_COMMON_MULTIPLE]: leastCommonMultiple,
	 */
};
