import { Schema, model, Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Access extends Document {
  @Field(() => ID)
  projectId: Types.ObjectId;

  @Field(() => ID)
  createdBy: Types.ObjectId;

  @Field(() => ID)
  forUser: Types.ObjectId;

  @Field()
  canCreate: boolean;

  @Field()
  canAssign: boolean;

  @Field()
  canView: boolean;
}

export const AccessSchema = new Schema<Access>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  forUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  canCreate: { type: Boolean, required: true },
  canAssign: { type: Boolean, required: true },
  canView: { type: Boolean, default: true },
});

export const AccessModel = model<Access>('Access', AccessSchema);
