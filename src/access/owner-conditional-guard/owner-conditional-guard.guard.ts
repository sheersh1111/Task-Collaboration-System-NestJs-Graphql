import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ProjectOwnerGuard } from 'src/project/guards/project-owner/project-owner.guard';// Assumes this is implemented
import { CanViewGuard } from '../can-view/can-view.guard';
import { CanAssignGuard } from 'src/can-assign/can-assign.guard';
import { CanCreateGuard } from 'src/can-create/can-create.guard';
import { GuardType } from './guards/guard-type.decorator'; // Import the custom decorator
import { Reflector } from '@nestjs/core';


@Injectable()
export class ConditionalPermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // Reflector allows us to get metadata from the decorator
    private readonly projectOwnerGuard: ProjectOwnerGuard,
    private readonly canViewGuard: CanViewGuard,
    private readonly canAssignGuard: CanAssignGuard,
    private readonly canCreateGuard: CanCreateGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const { projectId } = ctx.getArgs(); // Assuming projectId is in the args

    // First, check if the user is the project owner
    const isOwner = await this.projectOwnerGuard.canActivate(context);

    if (isOwner) {
      // If the user is the project owner, bypass other guards and allow access
      return true;
    }

    // Retrieve the guard type metadata from the custom decorator
    const guardType = this.reflector.get<string>('guardType', context.getHandler());

    if (!guardType) {
      throw new ForbiddenException('Guard type not specified');
    }

    let guardToApply;
    switch (guardType) {
      case 'canView':
        guardToApply = this.canViewGuard;
        break;
      case 'canAssign':
        guardToApply = this.canAssignGuard;
        break;
      case 'canCreate':
        guardToApply = this.canCreateGuard;
        break;
      default:
        throw new ForbiddenException('Invalid guard type');
    }

    // Now, apply the chosen guard
    return await guardToApply.canActivate(context);
  }
}
