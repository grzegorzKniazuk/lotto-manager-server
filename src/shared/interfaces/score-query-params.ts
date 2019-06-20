import { QueryableScoreField, ScoreNumbersExpression, ScoreNumbersFilter, ScoreQueryType } from '../enums';

export interface ScoreQueryParams {
	queryType: ScoreQueryType;
	byField: QueryableScoreField;
	startDate?: string;
	endDate?: string;
	indexes?: number[];
	filter?: ScoreNumbersFilter,
	expression?: ScoreNumbersExpression;
}
