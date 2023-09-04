import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskUserEntity } from '../users/entities/taskUser.entity';
import { Moment } from '@ccmos/nestjs-moment/dist/moment/interfaces';

@Injectable()
export class TasksService {
  constructor(
		@InjectRepository(TaskEntity)
		private readonly taskRepository: Repository<TaskEntity>,
		@InjectRepository(TaskUserEntity)
		private readonly userRepository: Repository<TaskUserEntity>,
		//private readonly moment: Moment
	) {}

  async getAll(userId: number, dateDoR: Date) {
		//var dateDoRf = moment(dateDoR).format('YYYYMMDD')
		return this.taskRepository.find({
			relations: {
				taskUser: true,
			},
			where: {
				dateDo : dateDoR,
				taskUser: {
					tgId: userId
				}
			},
		})
	}

	async getById(id: number) {
		return this.taskRepository.findOneBy({ id })
	}

	async createTask(userId: number, taskDto: CreateTaskDto) {
		const tUser = await this.userRepository.findOne({
			where: {
				tgId: userId
			},
		})
		if (!tUser) return null
		if(taskDto.orderValue == 0)
		{
			taskDto.orderValue = await this.taskRepository.count({
				relations: {
					taskUser: true,
				},
				where: {
					dateDo : taskDto.doDate,
					taskUser: {
						tgId: userId
					}
				},
			})
		}

		const task = await this.taskRepository.create({ name : taskDto.name, dateDo : taskDto.doDate, taskUser: tUser, orderValue: taskDto.orderValue })

		await this.taskRepository.save(task)
	}

	async doneTask(userId: number, id: number) {
		const task = await this.taskRepository.findOne({
			relations: {
				taskUser: true,
			},
			where: {
				id : id,
				taskUser: {
					tgId: userId
				}
			},
		})
		if (!task) return null

		task.isCompleted = !task.isCompleted
		await this.taskRepository.save(task)
	}

	async editTask(userId: number, id: number, taskDto: UpdateTaskDto) {
		const task = await this.taskRepository.findOne({
			relations: {
				taskUser: true,
			},
			where: {
				id : id,
				taskUser: {
					tgId: userId
				}
			},
		})
		if (!task) return null

		task.name = taskDto.name
		task.orderValue = taskDto.orderValue
		await this.taskRepository.save(task)
	}

	async deleteTask(userId: number, id: number) {
		const task = await this.taskRepository.findOne({
			relations: {
				taskUser: true,
			},
			where: {
				id : id,
				taskUser: {
					tgId: userId
				}
			},
		})
		if (!task) return null

		await this.taskRepository.delete({ id })
	}
}
