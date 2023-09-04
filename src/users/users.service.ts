import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { TaskUserEntity } from './entities/taskUser.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
		@InjectRepository(TaskUserEntity)
		private readonly userRepository: Repository<TaskUserEntity>
	) {}

  async create(userDto: CreateUserDto) {
    const task = await this.userRepository.create({name: userDto.name, tgId : userDto.tgId, tglogin: userDto.tglogin })

		await this.userRepository.save(task);
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ tgId: id })
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id })

		if (!user) return null

		await this.userRepository.delete({ id })
  }
}
