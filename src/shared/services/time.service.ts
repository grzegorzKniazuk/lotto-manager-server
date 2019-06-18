import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class TimeService {
	private static readonly baseDateFormat = 'YYYY-MM-DD';

	public static formatDate(date: string): string {
		return moment(date).format(TimeService.baseDateFormat);
	}

	public static get currentDate(): string {
		return moment().format(TimeService.baseDateFormat);
	}
}
