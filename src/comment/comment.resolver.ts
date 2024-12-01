import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentGraphQL } from './dto/create-comment.input/create-comment.input';
import { CreateCommentInput } from './dto/create-comment.input/create-comment.input';
import { CurrentUser } from 'src/current-user/current-user.decorator';

@Resolver(() => CommentGraphQL)
export class CommentResolver {
  constructor(private readonly commentsService: CommentService) {}

  @Mutation(() => CommentGraphQL)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser('id') userId: string,
  ): Promise<CommentGraphQL> {
    const comment = await this.commentsService.create(createCommentInput, userId);
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
  async deleteComment(
    @Args('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<boolean> {
    return this.commentsService.deleteComment(id, userId);
  }
}
