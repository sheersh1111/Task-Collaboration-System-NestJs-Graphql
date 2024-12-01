import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from '../create-task.input/create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {}
