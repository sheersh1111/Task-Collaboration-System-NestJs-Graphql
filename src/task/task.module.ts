import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TaskSchema } from './schemas/task.schema/task.schema';
import { ProjectModule } from 'src/project/project.module';
import { AccessModule } from 'src/access/access.module';
import { UserSchema } from 'src/user/schemas/user.schema/user.schema';
import { ProjectSchema } from 'src/project/schemas/project.schema/project.schema';
import { UserModule } from 'src/user/user.module';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: 'Task', schema: TaskSchema },
  ]),
  CacheModule,
  forwardRef(() => UserModule), // Use forwardRef() here
  forwardRef(() => ProjectModule),
AccessModule],
  providers: [TaskResolver, TaskService,NotificationGateway],
  exports:[TaskService]
})
export class TaskModule {}
