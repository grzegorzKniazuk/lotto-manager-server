import { ScoreNumbersFilters } from '../enums';
import { TimeService } from '../services';
import { Score } from '../interfaces';

export const ScoreNumbersFiltersMap = {
	[ScoreNumbersFilters.NUMBERS_FREQUENCY]: () => true,
	[ScoreNumbersFilters.SAME_WEEK_DAY_AS_TODAY]: (score: Score) => TimeService.isSameWeekDayAsToday(score.date),
	[ScoreNumbersFilters.SAME_MONTH_AS_TODAY]: (score: Score) => TimeService.isSameMonthAsToday(score.date),
	[ScoreNumbersFilters.ODD_DAY]: (score: Score) => TimeService.isOddDay(score.date),
	[ScoreNumbersFilters.EVEN_DAY]: (score: Score) => TimeService.isEvenDay(score.date),
	[ScoreNumbersFilters.ODD_MONTH]: (score: Score) => TimeService.isOddMonth(score.date),
	[ScoreNumbersFilters.EVEN_MONTH]: (score: Score) => TimeService.isEvenMonth(score.date),
	[ScoreNumbersFilters.SAME_YEAR_QUARTER]: (score: Score) => TimeService.isSameYearQuarter(score.date),
	[ScoreNumbersFilters.SAME_YEAR_DAY_NUMBER]: (score: Score) => TimeService.isSameYearDayNumber(score.date),
	[ScoreNumbersFilters.SAME_MONTH_DAY_NUMBER]: (score: Score) => TimeService.isSameMonthDayNumber(score.date),
};
