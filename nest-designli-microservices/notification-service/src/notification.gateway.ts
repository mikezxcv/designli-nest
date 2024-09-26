import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
    console.log(`Cliente conectado: ${client.id}`);
  }

  sendNotification(data: any) {
    this.server.emit('notification', data);
  }
}
