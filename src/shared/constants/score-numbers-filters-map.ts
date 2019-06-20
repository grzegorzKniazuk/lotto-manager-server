import { ScoreNumbersFilter } from '../enums';
import { TimeService } from '../services';
import { Score } from '../interfaces';

export const ScoreNumbersFiltersMap = {
	[ScoreNumbersFilter.NUMBERS_FREQUENCY]: () => true,
	[ScoreNumbersFilter.SAME_WEEK_DAY_AS_TODAY]: (score: Score) => TimeService.isSameWeekDayAsToday(score.date),
	[ScoreNumbersFilter.SAME_MONTH_AS_TODAY]: (score: Score) => TimeService.isSameMonthAsToday(score.date),
	[ScoreNumbersFilter.ODD_DAY]: (score: Score) => TimeService.isOddDay(score.date),
	[ScoreNumbersFilter.EVEN_DAY]: (score: Score) => TimeService.isEvenDay(score.date),
	[ScoreNumbersFilter.ODD_MONTH]: (score: Score) => TimeService.isOddMonth(score.date),
	[ScoreNumbersFilter.EVEN_MONTH]: (score: Score) => TimeService.isEvenMonth(score.date),
	[ScoreNumbersFilter.SAME_YEAR_QUARTER]: (score: Score) => TimeService.isSameYearQuarter(score.date),
	[ScoreNumbersFilter.SAME_YEAR_DAY_NUMBER]: (score: Score) => TimeService.isSameYearDayNumber(score.date),
	[ScoreNumbersFilter.SAME_MONTH_DAY_NUMBER]: (score: Score) => TimeService.isSameMonthDayNumber(score.date),
};
