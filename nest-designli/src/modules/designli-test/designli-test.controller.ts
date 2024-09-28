import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmailEventDto } from './dto/email-event.dto';
import { DesignliTestService } from './services/designli-test.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('designli-test')
export class DesignliTestController {
  constructor(private readonly designliTestService: DesignliTestService) {}

  @Post('map-json')
  mapEvent(@Body() emailEventDto: EmailEventDto) {
    console.log(emailEventDto.Records.length);
    return this.designliTestService.mapEvent(emailEventDto);
  }

  @Get('email-json-attachment')
  @ApiOperation({
    summary:
      'There are two files with attachment, EMAIL_ATTACHMENT_JSON.eml and EMAIL_ATTACHMENT_JSON_WITH_LINK, use any to test, the path for test is: src/designli/filename.eml ',
  })
  @ApiQuery({
    name: 'filePath',
    required: true,
    type: String,
    description: 'The path of the email file to parse',
    example: 'src/designli/EMAIL_ATTACHMENT_JSON.eml',
  })
  async parseEmail(@Query('filePath') filePath: string) {
    return await this.designliTestService.parseEmail(filePath);
  }
}
