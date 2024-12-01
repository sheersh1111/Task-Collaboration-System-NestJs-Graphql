import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentSchema } from './schemas/comment.schema/comment.schema';
import { TaskModule } from 'src/task/task.module';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
TaskModule],
  providers: [CommentService, CommentResolver,NotificationGateway],
  exports: [CommentService],
})
export class CommentModule {}
