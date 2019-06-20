import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EkstraPremiaEntity } from './ekstra-premia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EkstraPremiaService {
	constructor(
		@InjectRepository(EkstraPremiaEntity) private readonly scoreRepository: Repository<EkstraPremiaEntity>,
	) {
	}
}
