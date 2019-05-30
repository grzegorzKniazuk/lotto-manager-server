import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
	public date: string;

	@Column('varchar', { length: 45 })
	public username: string;

	@Column('varchar', { length: 45 })
	public password: string;
}
