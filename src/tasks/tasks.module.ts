import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskUserEntity } from '../users/entities/taskUser.entity';
import { MomentModule } from '@ccmos/nestjs-moment';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])
          , TypeOrmModule.forFeature([TaskUserEntity])
          , MomentModule.forRoot({ tz: 'Europe/Moscow', }),
        ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}