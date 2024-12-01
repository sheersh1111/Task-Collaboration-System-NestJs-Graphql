import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({nullable:true})
  @IsEnum(['todo', 'in-progress', 'completed'])
  status: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @Field()
  @IsString()
  createdBy: string; // User ID
}
