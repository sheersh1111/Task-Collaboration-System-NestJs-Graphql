import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
@Injectable()
@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly jwtService: JwtService) {}
  @WebSocketServer() server: Server;

  // Static map that persists across all instances of NotificationGateway
  private static userSocketMap: Map<string, string> = new Map();

  // When a user connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Assuming you are passing the userId via a query parameter, JWT, or in the handshake
    const token:any = client.handshake.query.token; // This is just an example; adapt it to your needs
    console.log(token);
    const user = this.jwtService.verify(token);
    const userId = user.id;
    if (userId) {
      // Map the user ID to their socket ID
      NotificationGateway.userSocketMap.set(userId, client.id);
      console.log(`Mapped user ${userId} to socket ID ${client.id}`);
    }
  }

  // When a user disconnect s
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove the user from the map when they disconnect
    NotificationGateway.userSocketMap.forEach((socketId, userId) => {
      if (socketId === client.id) {
        NotificationGateway.userSocketMap.delete(userId);
      }
    });
  }

  // Send a notification to a specific user by their userId (which maps to socket ID)
  sendNotification(userId: string, message: string) {
    const socketId = NotificationGateway.userSocketMap.get(userId);
    console.log(socketId);

    if (socketId) {
      this.server.to(socketId).emit('notification', message);
    } else {
      console.log(`No socket found for user ${userId}`);
    }
  }
}
