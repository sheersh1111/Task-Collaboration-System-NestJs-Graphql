import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsEnum(['todo', 'in-progress', 'completed'])
  @IsOptional()
  status?: string;

  @Field(() => ID,{nullable:true})
  createdBy: string;

  @Field(() => [ID], { nullable: true })
  @IsArray()
  @IsOptional()
  assignees?: string[];

  @Field(() => ID)
  @IsNotEmpty()
  projectId: string;
}
