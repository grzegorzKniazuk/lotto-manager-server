import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('score')
export class ScoreEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column('date')
	public date: string;

	@Column('varchar')
	public numbers: string;

	@Column('int')
	public bonus_number: number;
}
