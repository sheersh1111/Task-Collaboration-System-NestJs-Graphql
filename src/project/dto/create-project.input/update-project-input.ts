import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-project-input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => ID)
  id: string;
}
