import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input/create-project-input';
import { Project, ProjectGraphQL } from './schemas/project.schema/project.schema';
import { UpdateProjectInput } from './dto/create-project.input/update-project-input';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ProjectOwnerGuard } from './guards/project-owner/project-owner.guard';
import { CacheService } from 'src/cache/cache.service';

@Resolver(() => ProjectGraphQL)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService,
    private readonly cacheService:CacheService
  ) {}

  @Mutation(() => ProjectGraphQL)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [ProjectGraphQL])
  @UseGuards(AuthGuard)
  async getAllProjects(
    @Args('createdBy', { nullable: true }) createdBy?: string,
  ): Promise<Project[]> {
    const cacheKey = "getAllProjects"+createdBy;
    const cachedProjects = await this.cacheService.getCache(cacheKey);
    if (cachedProjects) {
      console.log('Returning cached projects');
      return cachedProjects; // Return cached data
    }
    
    return await this.projectService.findAll(createdBy);
  }

  @Query(() => ProjectGraphQL)
  @UseGuards(AuthGuard)
  async getProject(@Args('id') id: string): Promise<Project> {
    const cacheKey = 'project'+id;

    return this.projectService.findOne(id);
  }

  @Mutation(() => ProjectGraphQL)
  @UseGuards(AuthGuard,ProjectOwnerGuard)
  async updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    const { id, ...fieldsToUpdate } = updateProjectInput;
    return this.projectService.update(id, fieldsToUpdate);
  }

  @Mutation(() => ProjectGraphQL)
  @UseGuards(AuthGuard,ProjectOwnerGuard)
  async removeProject(@Args('projectId') projectId: string): Promise<Project> {
    return this.projectService.remove(projectId);
  }
}
