import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AccessService } from 'src/access/access.service';

@Injectable()
export class CanAssignGuard implements CanActivate {
  constructor(private readonly accessService: AccessService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { projectId } = request.body; // Extract projectId and forUser from the request body
    const { user } = request;

    // Check if the user has the 'canAssign' permission
    const access = await this.accessService.getAccess(projectId, user.id);
    return access && access.canAssign;
  }
}
