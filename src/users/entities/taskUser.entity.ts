import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'TaskUser' })
export class TaskUserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({nullable: true})
	tgId: number

	@Column()
	tglogin: string

	@CreateDateColumn()
	dateCreate: Date

	@Column({nullable: true})
	phone?: string | null

	@Column({nullable: true})
	email?: string | null
}
