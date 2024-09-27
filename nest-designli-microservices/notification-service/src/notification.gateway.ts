import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const logger= new Logger('WebSocket Logger')
@WebSocketGateway({
  cors: {
    origin: '*', // Permitir CORS para todos los orígenes
  },
})
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // Emitir mensaje cuando un cliente se conecte
  handleConnection(client: Socket) {
    logger.warn(`Cliente conectado: ${client.id}`);
  }

  sendNotification(data: any) {
    logger.warn(`Emitiendo evento WebSocket: notification`);
    this.server.emit('notification', data);
  }
}
