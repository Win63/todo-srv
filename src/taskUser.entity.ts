import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'TaskUser' })
export class TaskUserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	tglogin: string

	@CreateDateColumn()
	dateCreate: Date

	@Column()
	phone: string

	@Column()
	email: string
}
