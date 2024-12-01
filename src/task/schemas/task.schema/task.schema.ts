import { Schema, model, Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema/user.schema';

export interface Task extends Document {
  title: string;
  description: string;
  status: string; // e.g., "todo", "in-progress", "completed"
  createdBy: Schema.Types.ObjectId; // MongoDB ObjectId referencing User
  assignees: Schema.Types.ObjectId[]; // Array of MongoDB ObjectIds referencing Users
  projectId: Schema.Types.ObjectId; // MongoDB ObjectId referencing Project
}

export const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
});

export const TaskModel = model<Task>('Task', TaskSchema);

@ObjectType()
export class TaskGraphQL {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field(() => ID)
  createdBy: string; // Or use `UserGraphQL` if populated

  @Field(() => [User], { nullable: true })
  assignees: User[]; // Populate as users

  @Field(() => ID)
  projectId: string; // Or use `ProjectGraphQL` if populated
}
