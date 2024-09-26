import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const logger = new Logger('processing-service');
@Controller()
export class AppController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  async processTask(data: any): Promise<any> {
    logger.log('Procesando tarea:', data);

    // Simulación de procesamiento
    const result = { taskId: data.id, status: 'completed' };

    // Enviar notificación a través del microservicio TCP
    await this.client.send({ cmd: 'task_completed' }, result).toPromise();

    return result;
  }

  // Nuevo método HTTP para testear el procesamiento de tareas
  @Post('tasks/process')
  async processTaskHttp(@Body() data: any) {
    logger.log('Recibiendo solicitud HTTP para procesar tarea:', data);

    // Reutilizar el método de procesamiento
    const result = await this.processTask(data);

    return result;
  }
}
