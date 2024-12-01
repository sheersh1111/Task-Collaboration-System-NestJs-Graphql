import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // or any other JWT validation library

@WebSocketGateway()
@Injectable()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Called when the gateway is initialized
  afterInit(server: Server) {
    console.log('Notification Gateway Initialized');
  }

  // Called when a new client connects
  handleConnection(client: Socket) {
    // Validate the JWT token from the query parameters (or headers)
    const token:any = client.handshake.query.token;
    if (!token || !this.validateToken(token)) {
      console.log('Invalid token or no token provided, disconnecting client');
      client.disconnect(); // Disconnect the client if token is invalid
    } else {
      console.log('Client connected:', client.id);
    }
  }

  // Called when a client disconnects
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Method to validate the JWT token
  private validateToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, 'your_secret_key'); // Use your actual secret key
      return !!decoded;
    } catch (error) {
      console.error('Token validation failed', error);
      return false;
    }
  }

  // Method to emit notifications to clients
  sendNotification(clientId: string, message: string) {
    this.server.to(clientId).emit('notification', message);
  }

  // Emit notification to all clients
  sendGlobalNotification(message: string) {
    this.server.emit('notification', message);
  }
}
