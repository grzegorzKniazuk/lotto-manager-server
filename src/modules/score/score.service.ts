import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { DatabaseErrorMessages } from '../../shared/constants';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreQueryParams } from '../../shared/interfaces/score-query-params';

@Injectable()
export class ScoreService {

	constructor(
		@InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
	) {
	}

	public async scores(queryParams: ScoreQueryParams): Promise<Score[]> {
		const { startDate, endDate } = queryParams;
		console.log(startDate);

		try {
			const scores = await this.scoreRepository.find();
			// const scores = await this.scoreRepository.query(`SELECT * FROM score WHERE date > ?`, [ startDate ]);

			return scores.map((score: Score) => {
				score.numbers = (score.numbers as string).split(',').map((number: string) => +number);

				return score;
			});

		} catch (e) {
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
