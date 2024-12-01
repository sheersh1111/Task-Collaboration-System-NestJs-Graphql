import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AccessService } from './access.service';
import { Access } from './schemas/access.schema/access.schema';
import { CreateAccessInput } from './dto/create-access.input/create-access.input';
import { UpdateAccessInput } from './dto/update-access.input/update-access.input';

@Resolver(() => Access)
export class AccessResolver {
  constructor(private readonly accessService: AccessService) { }

  @Query(() => Access)
  async getAccess(
    @Args('projectId') projectId: string,
    @Args('forUser') forUser: string,
  ): Promise<Access | null> {
    return this.accessService.getAccess(projectId, forUser);
  }

  @Mutation(() => Access)
  async createAccess(
    @Args('createAccessInput') createAccessInput: CreateAccessInput,
  ): Promise<Access> {
    const { projectId, createdBy, forUser, canCreate, canAssign } =
      createAccessInput;
    return this.accessService.createAccess(
      projectId,
      createdBy,
      forUser,
      canCreate,
      canAssign,
    );
  }

  @Mutation(() => Access)
  async updateAccess(
    @Args('projectId') projectId: string,
    @Args('forUser') forUser: string,
    @Args('updateAccessInput') updateAccessInput: UpdateAccessInput,
  ): Promise<Access> {
    const { canCreate, canAssign, canView } = updateAccessInput;
    return this.accessService.updateAccess(projectId, forUser, canCreate, canAssign, canView);
  }
}
