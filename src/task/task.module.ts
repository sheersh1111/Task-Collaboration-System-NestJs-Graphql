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

@Module({
  imports: [ MongooseModule.forFeature([
    { name: 'Task', schema: TaskSchema },
    { name: 'User', schema: UserSchema },  // Add User model here
    { name: 'Project', schema: ProjectSchema }  // Add Project model here
  ]),
  forwardRef(() => UserModule), // Use forwardRef() here
  forwardRef(() => ProjectModule),
AccessModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
