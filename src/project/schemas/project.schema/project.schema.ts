import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema/user.schema';

// Define the Project class
@ObjectType()
@Schema()
export class Project extends Document {

  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  endDate: Date;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User; // Reference to User

  @Field()
  @Prop({ enum: ['todo', 'in-progress', 'completed'], default: 'todo' })
  status: 'todo' | 'in-progress' | 'completed'; // Enum for status
}

// Generate the Mongoose schema
export const ProjectSchema = SchemaFactory.createForClass(Project);
