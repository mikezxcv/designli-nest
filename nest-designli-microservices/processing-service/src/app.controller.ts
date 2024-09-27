import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices';
import { TaskDto } from './task.dto';

const logger = new Logger('processing-service');
@Controller()
export class AppController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) { }

  async processTask(data: any): Promise<any> {
    logger.log('Procesando tarea:', data);

    // Simulación de procesamiento
    const result = { taskId: data.taskId, status: 'completed' };

    // Enviar notificación a través del microservicio TCP
    await this.client.send({ cmd: 'task_completed' }, result).toPromise();

    return result;
  }

  // Nuevo método HTTP para testear el procesamiento de tareas
  @ApiOperation({
    summary: 'Use This Endpoint to emit the event: task_completed from PROCESSING_SERVICES and send the event to NOTIFICATION_SERVICE and process the task'
  })
  @Post('tasks/process')
  async processTaskHttp(@Body() data: TaskDto) {
    logger.log('Recibiendo solicitud HTTP para procesar tarea:', data);

    // Reutilizar el método de procesamiento
    const result = await this.processTask(data);

    return result;
  }
}
