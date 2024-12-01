import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

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
    // Get token from query parameter (can also use headers depending on your client-side implementation)
    const token: any = client.handshake.query.token;
    
    // If token is invalid or not provided, disconnect the client
    if (!token || !this.validateToken(token)) {
      console.log('Invalid token or no token provided, disconnecting client');
      client.disconnect();
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
      const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Get secret key from environment variable
      const decoded = jwt.verify(token, secretKey); // Verify token with secret key
      return !!decoded;
    } catch (error) {
      console.error('Token validation failed', error);
      return false;
    }
  }

  // Method to emit notifications to a specific client
  sendNotification(clientId: string, message: string) {
    this.server.to(clientId).emit('notification', message);
  }

  // Emit notification to all connected clients
  sendGlobalNotification(message: string) {
    this.server.emit('notification', message);
  }
  @SubscribeMessage('send_message')
  handleMessage(client: Socket, payload: any): void {
    console.log('Received message from client:', payload); // Log the message body received from the client
    client.emit('notification', 'Message received successfully'); // Optionally send a response to the client
  }
}
