import { Schema, Document, model } from 'mongoose';

export interface Comment extends Document {
  message: string;
  createdBy: Schema.Types.ObjectId;
  taskId: Schema.Types.ObjectId;
  createdAt: Date;
}

export const CommentSchema = new Schema<Comment>(
  {
    message: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const CommentModel = model<Comment>('Comment', CommentSchema);
