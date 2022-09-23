import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(task);
    return task;
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({where: {id}});

    if (task === null) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({where: {id}});

    if (task === null) {
      throw new NotFoundException();
    }

    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException({updated: false}, "You did not provide something to update the object with.")
    }

    try {
      const updatedResult = await this.taskRepository.update(id, updateTaskDto);

      if(!!updatedResult.affected) {
        return {
          updated: true
        }
      }
    } catch (e) {
      throw new BadRequestException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
