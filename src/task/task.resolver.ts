import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input/update-task.input';
import { UseGuards } from '@nestjs/common';
import { ConditionalPermissionGuard } from 'src/access/owner-conditional-guard/owner-conditional-guard.guard';
import { GuardType } from 'src/access/owner-conditional-guard/guards/guard-type.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { PartialTaskGraphQL } from './patial-task-graphql/patial-task-graphql';
import { TaskGraphQL } from './schemas/task.schema/task.schema';

@Resolver(() => TaskGraphQL)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskGraphQL])
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getAllTasks(@Args('projectId') projectId: string): Promise<PartialTaskGraphQL[]> {
    // Assuming the taskService has a method to find tasks by projectId
    const tasks:any = await this.taskService.findAllByProjectId(projectId);
    return tasks;
  }

  @Query(() => TaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getTask(@Args('id') id: string,@Args('projectId') projectIs: string): Promise<PartialTaskGraphQL> {
    const task:any = await this.taskService.findOne(id); 
    return task
  }

  @Mutation(() => TaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput,@Context() context:any): Promise<PartialTaskGraphQL> {
    const userId = context.req.user.id; // Assuming user is attached to the request in context
    const task :any= await this.taskService.create({
      ...createTaskInput,
      createdBy: userId, // Assign the logged-in user's ID
    });
    return task;
  }

  @Mutation(() => TaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canAssign') // Specify the guard type
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @Args('projectId') projectId:string
  ): Promise<PartialTaskGraphQL> {
    const task:any = await this.taskService.update(id, updateTaskInput);
    return task;
  }

  @Mutation(() => TaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async removeTask(@Args('id') id: string): Promise<PartialTaskGraphQL> {
    const task:any = await this.taskService.remove(id);
    return task;
  }
}


