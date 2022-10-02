import { NotFoundException } from "@nestjs/common";

export class TasksNotFoundException extends NotFoundException {
  constructor(taskId: number) {
    super(`Task with id ${taskId} was not found.`);
  }
}