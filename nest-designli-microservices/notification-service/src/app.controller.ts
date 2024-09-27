import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';

const logger = new Logger('notification-controller');
@Controller()
export class AppController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @MessagePattern({ cmd: 'task_completed' })
  handleTaskCompleted(data: any) {
    logger.debug('Notification from microservice PROCESSING-SERVICE:', data);

    // Enviar la notificación a los clientes conectados
    this.notificationGateway.sendNotification({
      message: `La tarea ${data.taskId} ha sido completada.`,
      status: data.status,
    });
  }
}
