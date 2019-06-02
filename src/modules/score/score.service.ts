import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { DatabaseException } from 'src/shared/exception-handlers/database.exception';
import { DatabaseErrorMessages } from 'src/shared/constants';

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
			console.log(e.code);
			throw new DatabaseException({
				code: e.code,
				message: DatabaseErrorMessages[e.code] || e.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
