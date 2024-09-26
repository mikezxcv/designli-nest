import { Injectable, Param } from '@nestjs/common';
import { EmailEventDto } from '../dto/email-event.dto';
import { EmailMapper } from '../providers/email-mapper.provider';
import { EmailParserProvider } from '../providers/mail-parser.provider';

@Injectable()
export class DesignliTestService {
  constructor(
    private readonly emailMapper: EmailMapper,
    private readonly emailParserProvider: EmailParserProvider,
  ) {}

  mapEvent(emailEventDto: EmailEventDto) {
    return this.emailMapper.mapEventToResponse(emailEventDto);
  }

  async parseEmail(filePath: string) {
    const parsedEmail = await this.emailParserProvider.parseEmail(filePath);

    // Intentar obtener el archivo JSON adjunto
    const attachment = this.emailParserProvider.extractAttachment(parsedEmail);
    if (attachment) {
      return JSON.parse(attachment.content.toString('utf-8'));
    }

    // Intentar obtener el enlace dentro del cuerpo del correo
    const linkToJson = this.emailParserProvider.extractJsonLink(parsedEmail.text);
    if (linkToJson) {
      const jsonFromUrl = await this.emailParserProvider.fetchJsonFromUrl(linkToJson);
      return jsonFromUrl;
    }

    return { message: 'No se encontró ningún archivo JSON adjunto ni enlace en el correo.' };
  }
}
