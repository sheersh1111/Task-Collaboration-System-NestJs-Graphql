import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema/comment.schema';
import { CreateCommentInput } from './dto/create-comment.input/create-comment.input';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async create(createCommentInput: CreateCommentInput, userId: string): Promise<Comment> {
    const newComment = new this.commentModel({
      ...createCommentInput,
      createdBy: userId,
    });
    await newComment.save();
    return newComment;
  }

  async findAllByTask(taskId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ taskId }).populate('createdBy').exec();
    return comments
  }

  async deleteComment(id: string, userId: string): Promise<boolean> {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
  
    // Ensure the user is authorized to delete this comment
    if (comment.createdBy.toString() !== userId) {
      throw new NotFoundException('You are not authorized to delete this comment');
    }
  
    await comment.deleteOne(); // Correct method for deleting the document
    return true;
  }
}
