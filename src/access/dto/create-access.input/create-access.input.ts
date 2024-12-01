import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateAccessInput {
  @Field()
  @IsString()
  projectId: string;

  @Field()
  @IsString()
  createdBy: string;

  @Field()
  @IsString()
  forUser: string;

  @Field()
  @IsBoolean()
  canCreate: boolean;

  @Field()
  @IsBoolean()
  canAssign: boolean;
}
