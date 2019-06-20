import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class TimeService {
	private static readonly dayNameFormat = 'dddd';
	private static readonly monthNameFormat = 'MMMM';
	private static readonly dayOfMonthFormat = 'D';
	private static readonly monthOfYearFormat = 'M';
	private static readonly baseDateFormat = 'YYYY-MM-DD';
	private static readonly yearQuarterFormat = 'Q';
	private static readonly dayNumberOfYearFormat = 'DDD';
	private static readonly dayNumberOfMonthFormat = 'D';

	public static formatDate(date: string): string {
		return moment(date).format(TimeService.baseDateFormat);
	}

	public static get currentDate(): string {
		return moment().format(TimeService.baseDateFormat);
	}

	public static isSameWeekDayAsToday(date: string): boolean {
		return moment(date).format(TimeService.dayNameFormat) === moment().format(TimeService.dayNameFormat);
	}

	public static isSameMonthAsToday(date: string): boolean {
		return moment(date).format(TimeService.monthNameFormat) === moment().format(TimeService.monthNameFormat);
	}

	public static isOddDay(date: string): boolean {
		return +(moment(date).format(TimeService.dayOfMonthFormat)) % 2 !== 0;
	}

	public static isEvenDay(date: string): boolean {
		return +(moment(date).format(TimeService.dayOfMonthFormat)) % 2 === 0;
	}

	public static isOddMonth(date: string): boolean {
		return +(moment(date).format(TimeService.monthOfYearFormat)) % 2 !== 0;
	}

	public static isEvenMonth(date: string): boolean {
		return +(moment(date).format(TimeService.monthOfYearFormat)) % 2 === 0;
	}

	public static isSameYearQuarter(date: string): boolean {
		return moment(date).format(TimeService.yearQuarterFormat) === moment().format(TimeService.yearQuarterFormat);
	}

	public static isSameYearDayNumber(date: string): boolean {
		return moment(date).format(TimeService.dayNumberOfYearFormat) === moment().format(TimeService.dayNumberOfYearFormat);
	}

	public static isSameMonthDayNumber(date: string): boolean {
		return moment(date).format(TimeService.dayNumberOfMonthFormat) === moment().format(TimeService.dayNumberOfMonthFormat);
	}
}
