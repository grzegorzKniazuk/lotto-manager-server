import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { DatabaseErrorMessages } from '../../shared/constants';
import { DatabaseException } from '../../shared/exception-handlers/database.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoreService {

	constructor(
		@InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
	) {
	}

	public async scores(): Promise<Score[]> {
		try {
			const scores = await this.scoreRepository.find();

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
