// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User extends Document {

  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop({ required: true })
  name?: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
