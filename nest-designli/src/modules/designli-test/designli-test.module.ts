import { Module } from '@nestjs/common';
import { DesignliTestService } from './services/designli-test.service';
import { DesignliTestController } from './designli-test.controller';
import { EmailMapper } from './providers/email-mapper.provider';
import { EmailParserProvider } from './providers/mail-parser.provider';

@Module({
  providers: [DesignliTestService, EmailMapper, EmailParserProvider],
  controllers: [DesignliTestController],
})
export class DesignliTestModule {}
