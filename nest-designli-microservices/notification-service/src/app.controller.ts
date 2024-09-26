import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';

const logger = new Logger('processing-service');
@Controller()
export class AppController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @MessagePattern({ cmd: 'task_completed' })
  handleTaskCompleted(data: any) {
    logger.log('Notificación recibida:', data);

    // Enviar la notificación a los clientes conectados
    this.notificationGateway.sendNotification({
      message: `La tarea ${data.taskId} ha sido completada.`,
      status: data.status,
    });
  }
}
