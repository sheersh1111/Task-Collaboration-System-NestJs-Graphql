import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  message: string;

  @Field(() => ID)
  taskId: string; // Reference to the Task ID
}

@ObjectType()
export class CommentGraphQL {
  @Field(() => ID)
  id: string;

  @Field()
  message: string;

  @Field(() => ID)
  createdBy: string; // Reference to the User ID

  @Field(() => ID)
  taskId: string; // Reference to the Task ID

  @Field()
  createdAt: Date;
}
