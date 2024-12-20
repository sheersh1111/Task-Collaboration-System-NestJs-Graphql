import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentGraphQL } from './dto/create-comment.input/create-comment.input';
import { CreateCommentInput } from './dto/create-comment.input/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from 'src/task/task.service';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Resolver(() => CommentGraphQL)
export class CommentResolver {
  constructor(private readonly commentsService: CommentService,
    private readonly taskService: TaskService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Mutation(() => CommentGraphQL)
  @UseGuards(AuthGuard)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Context() context:any
  ): Promise<CommentGraphQL> {
    const userId = context.req.user.id;
    const comment = await this.commentsService.create(createCommentInput, userId);
    this.findMembersOfTask(createCommentInput.taskId)
    return {
        ...comment.toObject(),
        id: comment._id.toString(), 
    }
  }

  

  @Query(() => [CommentGraphQL])
  async getCommentsByTask(@Args('taskId') taskId: string): Promise<CommentGraphQL[]> {
    const comments= await this.commentsService.findAllByTask(taskId);
    return comments.map((item)=>{
        return{
            ...item.toObject(),
            id:item._id.toString()
        }
    })
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteComment(
    @Args('id') id: string,
    @Context() context:any
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return this.commentsService.deleteComment(id, userId);
  }
  public async findMembersOfTask(taskId: string){
    const task = await this.taskService.findOne(taskId);
    let members = task.assignees.map((item:any)=>item._id.toString());
    members = [...members,task.createdBy.toString()];
    
    members.map((member)=>{
      this.notificationGateway.sendNotification(member,`{Someone has commented on task ${task.title}}`)
    })
  }
}
