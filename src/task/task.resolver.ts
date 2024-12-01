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

@Resolver(() => PartialTaskGraphQL)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [PartialTaskGraphQL])
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getAllTasks(@Args('projectId') projectId: string): Promise<PartialTaskGraphQL[]> {
    // Assuming the taskService has a method to find tasks by projectId
    const tasks = await this.taskService.findAllByProjectId(projectId);
    return tasks.map((task) => this.mapToGraphQL(task));
  }

  @Query(() => PartialTaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getTask(@Args('id') id: string,@Args('projectId') projectIs: string): Promise<PartialTaskGraphQL> {
    const task = await this.taskService.findOne(id);
    return this.mapToGraphQL(task);
  }

  @Mutation(() => PartialTaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput,@Context() context:any): Promise<PartialTaskGraphQL> {
    const userId = context.req.user.id; // Assuming user is attached to the request in context
    const task = await this.taskService.create({
      ...createTaskInput,
      createdBy: userId, // Assign the logged-in user's ID
    });
    return this.mapToGraphQL(task);
  }

  @Mutation(() => PartialTaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canAssign') // Specify the guard type
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @Args('projectId') projectId:string
  ): Promise<PartialTaskGraphQL> {
    const task = await this.taskService.update(id, updateTaskInput);
    console.log(task);
    
    return this.mapToGraphQL(task);
  }

  @Mutation(() => PartialTaskGraphQL)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async removeTask(@Args('id') id: string): Promise<PartialTaskGraphQL> {
    const task = await this.taskService.remove(id);
    return this.mapToGraphQL(task);
  }

  private mapToGraphQL(task: any): PartialTaskGraphQL {
    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdBy: task.createdBy?.toString() || null,
      assignees: task.assignees?.map((assignee: any) => assignee.toString()) || [],
      projectId: task.projectId?.toString() || null,
    };
  }
}
