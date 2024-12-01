import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectService, // Inject ProjectService
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request from GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req; // Extract user from the request context
    const projectId = ctx.getArgs()?.updateProjectInput?.id ??ctx.getArgs()?.createTaskInput?.projectId?? ctx.getArgs()?.projectId; // Extract project ID from the arguments
    
    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (!projectId) {
      throw new UnauthorizedException('Project ID is missing');
    }

    // Verify ownership
    const project = await this.projectService.findOne(projectId);
    
    if (!project) {
      throw new UnauthorizedException('Project not found');
    }
    
    if (project.createdBy._id.toString() !== user.id) {
      return false;
    }

    return true;
  }
}
