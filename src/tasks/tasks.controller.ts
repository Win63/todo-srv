import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('user/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('userId') userId: number, @Body()taskDto: CreateTaskDto) {
    return this.tasksService.createTask(userId, taskDto);
  }

  @Get() // обработает GET http://localhost/notes?userId={userId}
  findAll(@Param('userId') userId: number, @Query('doDate') doDate: Date) {
    return this.tasksService.getAll(userId, doDate);
  }

  @Get(':id')
  findOne(@Param('userId') userId: number, @Param('id') id: number) {
    return this.tasksService.getById(id);
  }

  @Patch(':id')
  update(@Param('userId') userId: number, @Param('id') id: number, @Body() updateTaskDto:UpdateTaskDto) {
    return this.tasksService.editTask(userId, id, updateTaskDto);
  }

  @Patch('/done/:id')
  done(@Param('userId') userId: number, @Param('id') id: number) {
    return this.tasksService.doneTask(userId, id);
  }

  @Delete(':id')
  remove(@Param('userId') userId: number, @Param('id') id: number) {
    return this.tasksService.deleteTask(userId, id);
  }
}
