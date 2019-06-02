import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column('date')
	public date: string;

	@Column('varchar')
	public numbers: string | number[];

	@Column('int')
	public bonus_number: number;
}
