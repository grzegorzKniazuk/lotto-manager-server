import { IsDate, IsNumber, Length } from 'class-validator';

export class InsertScoreDto {

	@IsDate()
	public readonly date: Date;

	public readonly numbers: Set<Number>;

	@IsNumber()
	@Length(1, 1)
	public readonly bonus_number: number;
}
