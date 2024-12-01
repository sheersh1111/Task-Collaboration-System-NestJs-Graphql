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
    return this.taskModel.find({ projectId }).populate('assignees').exec();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('assignees').exec();
  }

  async findOne(id: string): Promise<Task> {
    const task= await this.taskModel.findById(id).populate('assignees') .exec();
    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskInput, { new: true }).populate('assignees')
      .exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
