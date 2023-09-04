import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { TaskUserEntity } from '../../users/entities/taskUser.entity'
//import { Transform } from 'class-transformer';

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

	@Column({ type: "date"})
	dateDo: Date

	@ManyToOne(() => TaskUserEntity)
    @JoinColumn()
	taskUser: TaskUserEntity

	@Column({ default: false})
	isExternal: boolean
}
