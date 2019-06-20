import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PensjaPremiaEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column('date')
	public date: string;

	@Column('varchar')
	public numbers: string;

	@Column('int')
	public bonus_number: number;
}
