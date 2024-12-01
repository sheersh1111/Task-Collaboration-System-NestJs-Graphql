import { ObjectType, Field, PartialType } from '@nestjs/graphql';
import { TaskGraphQL } from '../schemas/task.schema/task.schema';

@ObjectType()
export class PartialTaskGraphQL extends PartialType(TaskGraphQL) {
}
