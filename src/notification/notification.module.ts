import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';

@Module({
  providers: [NotificationGateway, NotificationService, NotificationResolver],
})
export class NotificationModule {}
