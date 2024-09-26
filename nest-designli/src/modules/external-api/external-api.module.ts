import { Module } from '@nestjs/common';
import { ApiSrService } from './api-sr/api-sr.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ApiSrService],
  exports: [ApiSrService],
})
export class ExternalApiModule {}
