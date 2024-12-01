import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentSchema } from './schemas/comment.schema/comment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
