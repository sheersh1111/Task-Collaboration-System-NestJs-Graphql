import { Schema, model, Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema/user.schema';

// Define the Mongoose interface for Project
export interface Project extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: Types.ObjectId; // MongoDB ObjectId referencing User
  status: 'todo' | 'in-progress' | 'completed'; // Enum for status
}

// Define the Mongoose Schema
export const ProjectSchema = new Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' }, // Enum for status
});

// Export the Mongoose model
export const ProjectModel = model<Project>('Project', ProjectSchema);

// Define the GraphQL ObjectType for Project
@ObjectType()
export class ProjectGraphQL {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => User)
  createdBy: User; // GraphQL ID referencing the User's ObjectId

  @Field()
  status: string; // GraphQL field for the status
}
