import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema/user.schema';
import { Project } from 'src/project/schemas/project.schema/project.schema';

@ObjectType()
@Schema()
export class Task extends Document {

  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ enum: ['todo', 'in-progress', 'completed'], default: 'todo' })
  status: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User; // Reference to User

  @Field(() => [User], { nullable: true })
  @Prop({ type: [Types.ObjectId], ref: 'User' })
  assignees: User[]; // Array of references to Users

  @Field(() => Project, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Project', required: false })
  projectId: Project; // Reference to Project
}

// Generate the Mongoose schema
export const TaskSchema = SchemaFactory.createForClass(Task);
