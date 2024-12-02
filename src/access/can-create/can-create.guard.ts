import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AccessService } from 'src/access/access.service';

@Injectable()
export class CanCreateGuard implements CanActivate {
  constructor(private readonly accessService: AccessService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const { projectId } = ctx.getArgs()?.createTaskInput; // Assuming projectId is in the args

    // Check if the user has the 'canCreate' permission
    const access = await this.accessService.getAccess(projectId, user.id);
    return access && access.canCreate;
  }
}
