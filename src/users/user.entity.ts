import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column('date')
	public date: Date;

	@Column({ name: 'username', length: 45, nullable: false })
	public username: string;

	@Column({ name: 'password', length: 45, nullable: false })
	public password: string;
}
