import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskUserEntity } from './entities/taskUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskUserEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
