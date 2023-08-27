import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { TaskUserEntity } from './taskUser.entity'

@Entity({ name: 'Task' })
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

	@Column({ default: false })
	isCompleted: boolean

	@Column()
	orderValue: number

	@CreateDateColumn()
	dateCreate: Date

	@UpdateDateColumn()
	dateUpdate: Date

	@Column()
	dateDo: Date

	@OneToOne(() => TaskUserEntity)
    @JoinColumn()
	taskUser: TaskUserEntity

	@Column({ default: false})
	isExternal: boolean
}
