import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema/task.schema';
import { CreateTaskInput } from './dto/create-task.input/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input/update-task.input';
@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = new this.taskModel(createTaskInput);
    return task.save();
  }

  async findAllByProjectId(projectId: string): Promise<Task[]> {
    return this.taskModel.find({ projectId }).exec();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('createdBy assignees projectId').exec();
  }

  async findOne(id: string): Promise<Task> {
    const task= await this.taskModel.findById(id) .exec();
    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskInput, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
