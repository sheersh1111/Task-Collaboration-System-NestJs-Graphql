import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { ProjectSchema } from './schemas/project.schema/project.schema';
import { ProjectOwnerGuard } from './guards/project-owner/project-owner.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  providers: [ProjectService, ProjectResolver,ProjectOwnerGuard],
  exports:[ProjectOwnerGuard]
})
export class ProjectModule {}
