import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => String)
  async createNotification(
    @Args('projectId') projectId: string,
    @Args('userId') userId: string,
    @Args('message') message: string,
  ): Promise<string> {
    this.notificationService.createNotification(projectId, userId, message);
    return 'Notification created successfully';
  }

  // @Mutation(() => String)
  // async broadcastNotification(@Args('message') message: string): Promise<string> {
  //   this.notificationService.broadcastNotification(message);
  //   return 'Notification broadcasted successfully';
  // }
}
