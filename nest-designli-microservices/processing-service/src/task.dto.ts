import { ApiProperty } from '@nestjs/swagger';
export class TaskDto {
  @ApiProperty()
  taskId: number;

  @ApiProperty()
  taskDescription: string;
}
