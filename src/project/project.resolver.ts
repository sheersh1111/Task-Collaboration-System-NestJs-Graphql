import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input/create-project-input';
import { Project } from './schemas/project.schema/project.schema';
import { UpdateProjectInput } from './dto/create-project.input/update-project-input';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ProjectOwnerGuard } from './guards/project-owner/project-owner.guard';
import { CacheService } from 'src/cache/cache.service';
import { ProjectDTO } from './project-dto/project-dto';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService,
    private readonly cacheService:CacheService
  ) {}

  @Mutation(() => Project)
  @UseGuards(AuthGuard)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<ProjectDTO> {
    const project =  await this.projectService.create(createProjectInput);
    return new ProjectDTO(project)
  }

  @Query(() => [Project])
  @UseGuards(AuthGuard)
  async getAllProjects(
    @Args('createdBy', { nullable: true }) createdBy?: string,
  ): Promise<ProjectDTO[]> {
    const cacheKey = "getAllProjects"+createdBy;
    const cachedProjects = await this.cacheService.getCache(cacheKey);
    if (cachedProjects) {
      console.log('Returning cached projects');
      
      return cachedProjects.map((project)=>new ProjectDTO(project)) // Return cached data
    }

    const projects = await this.projectService.findAll(createdBy);
    await this.cacheService.setCache(cacheKey,projects);
    return projects.map((project)=>new ProjectDTO(project));
  }

  @Query(() => Project)
  @UseGuards(AuthGuard)
  async getProject(@Args('id') id: string): Promise<ProjectDTO> {
    const cacheKey = 'project'+id;
    const cachedProject = await this.cacheService.getCache(cacheKey);
    if (cachedProject) {
      console.log('Returning cached project');
      
      return new ProjectDTO(cachedProject) // Return cached data
    }

    const project = await this.projectService.findOne(id);
    await this.cacheService.setCache(cacheKey,project);
    return new ProjectDTO(project);
  }

  @Mutation(() => Project)
  @UseGuards(AuthGuard,ProjectOwnerGuard)
  async updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<ProjectDTO> {
    const { id, ...fieldsToUpdate } = updateProjectInput;
    this.cacheService.delCache(`project${id}`);
    const project=await this.projectService.update(id, fieldsToUpdate);
    return new ProjectDTO(project);
  }

  @Mutation(() => Project)
  @UseGuards(AuthGuard,ProjectOwnerGuard)
  async removeProject(@Args('projectId') projectId: string): Promise<Project> {
    this.cacheService.delCache(`project${projectId}`);
    return this.projectService.remove(projectId);
  }
}
