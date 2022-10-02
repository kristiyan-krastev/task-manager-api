import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { TasksNotFoundException } from "./exceptions/tasks-not-found.exception";
import { UserNotFoundException } from "../users/exceptions/user-not-found.exception";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly usersService: UsersService
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

  async findOne(id: number, withDetails = false) {
    const task = await this.taskRepository.findOne({where: {id}, relations: {users: withDetails}});

    if (task === null) {
      throw new TasksNotFoundException(id);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException({updated: false}, "You did not provide something to update the object with.")
    }

    let task = await this.taskRepository.findOne({where: {id}});
    if(!task) throw new TasksNotFoundException(id);

    for (let i = 0; i < updateTaskDto.userIds?.length; i++) {
      let user = await this.usersService.findOne(updateTaskDto.userIds[i]);
      if (user == null) throw new UserNotFoundException(updateTaskDto.userIds[i]);

      task.addUser(user);
    }

    try {
      await this.taskRepository.save(task);

      return {
        updated: true
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await this.taskRepository.delete({ id });

      if (!!deleteResult.affected) {
        return {
          deleted: true
        };
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }

    throw new TasksNotFoundException(id);
  }

  async removeUserFromTask(taskId: number, userId: number) {
    const task = await this.findOne(taskId, true);

    if (!task) {
      throw new TasksNotFoundException(taskId);
    }

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UserNotFoundException(userId);
    }

    task.users = task.users.filter(user => user.id !== userId);

    await this.taskRepository.save(task);

    return {
      deleted: true
    }
  }
}
