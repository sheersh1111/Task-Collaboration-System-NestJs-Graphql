import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  // Method to create a notification (in reality, you might store this in a DB)
  createNotification(projectId: string, userId: string, message: string) {
    // Store the notification logic (e.g., save to database)

    // Emit the notification via WebSocket
    this.notificationGateway.sendNotification(userId, message);
  }

  // Method to broadcast a notification to all users
  // broadcastNotification(message: string) {
  //   this.notificationGateway.sendGlobalNotification(message);
  // }
}
