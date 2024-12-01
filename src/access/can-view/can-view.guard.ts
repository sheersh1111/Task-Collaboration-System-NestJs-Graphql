import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessService } from 'src/access/access.service';

@Injectable()
export class CanViewGuard implements CanActivate {
  constructor(private readonly accessService: AccessService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req; // Extract user from the request context
    const { projectId } = ctx.getArgs(); // Extract projectId from the arguments (e.g., passed in the query)

    // Check if the user has the 'canView' permission
    const access = await this.accessService.getAccess(projectId, user.id);
    return access && access.canView;
  }
}
