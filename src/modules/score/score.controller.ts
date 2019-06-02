import { Controller, Get, HttpCode } from '@nestjs/common';
import { ScoreService } from 'src/modules/score/score.service';
import { Score } from 'src/shared/entities';

@Controller('scores')
export class ScoreController {

	constructor(
		private readonly scoreService: ScoreService,
	) {
	}

	@Get()
	@HttpCode(200)
	public async scores(): Promise<Score[]> {
		return await this.scoreService.scores();
	}
}
