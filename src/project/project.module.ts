import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { ProjectSchema } from './schemas/project.schema/project.schema';
import { ProjectOwnerGuard } from './guards/project-owner/project-owner.guard';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    CacheModule
  ],
  providers: [ProjectService, ProjectResolver,ProjectOwnerGuard],
  exports:[ProjectOwnerGuard]
})
export class ProjectModule {}
