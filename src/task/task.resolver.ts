import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input/update-task.input';
import { UseGuards } from '@nestjs/common';
import { ConditionalPermissionGuard } from 'src/access/owner-conditional-guard/owner-conditional-guard.guard';
import { GuardType } from 'src/access/owner-conditional-guard/guards/guard-type.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { Task } from './schemas/task.schema/task.schema';
import { TaskDTO } from './task-dto/task-dto';
import { CacheService } from 'src/cache/cache.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService,
    private readonly notificationGateway: NotificationGateway,
    private readonly cacheService:CacheService
  ) {}

  @Query(() => [Task])
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getAllTasks(@Args('projectId') projectId: string): Promise<TaskDTO[]> {
    // Assuming the taskService has a method to find tasks by projectId
    const cacheKey = 'tasks'+projectId;
    const cachedTasks =await this.cacheService.getCache(cacheKey);
    if(cachedTasks){
      console.log('Fetching cached tasks');
      
      return cachedTasks.map((task)=>new TaskDTO(task))
    }
    const tasks:any = await this.taskService.findAllByProjectId(projectId);
    await this.cacheService.setCache(cacheKey,tasks);
    return tasks.map((task)=>new TaskDTO(task));
  }

  @Query(() => Task)
  @UseGuards(AuthGuard,ConditionalPermissionGuard)
  @GuardType('canView') 
  async getTask(@Args('id') id: string,@Args('projectId') projectId: string): Promise<TaskDTO> {
    const cacheKey = 'task'+id;
    const cachedTask = await this.cacheService.getCache(cacheKey);
    if(cachedTask){
      console.log('Fetching cached task');
      return new TaskDTO(cachedTask)
    }

    const task:any = await this.taskService.findOne(id); 
    await this.cacheService.setCache(cacheKey,task)
    return new TaskDTO(task);
  }

  @Mutation(() => Task)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput,@Context() context:any): Promise<TaskDTO> {
    const userId = context.req.user.id; // Assuming user is attached to the request in context
    const task :any= await this.taskService.create({
      ...createTaskInput,
      createdBy: userId, // Assign the logged-in user's ID
    });
    return new TaskDTO(task);
  }

  @Mutation(() => Task)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canAssign') // Specify the guard type
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @Args('projectId') projectId:string
  ): Promise<TaskDTO> {
    const task:any = await this.taskService.update(id, updateTaskInput);
    task.assignees.map((member)=>{
      this.notificationGateway.sendNotification(member._id.toString(),'You were assigned a task')
    })
    return new TaskDTO(task);
  }

  @Mutation(() => Task)
  @UseGuards(AuthGuard,ConditionalPermissionGuard) // Use the main conditional guard
  @GuardType('canCreate') // Specify the guard type
  async removeTask(@Args('id') id: string): Promise<Task> {
    const task:any = await this.taskService.remove(id);
    return task;
  }
}


