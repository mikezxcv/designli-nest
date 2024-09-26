import { Injectable } from '@nestjs/common';
import { EmailEventDto } from '../dto/email-event.dto';
import { MapEventDto } from '../dto/map-event.dto';

@Injectable()
export class EmailMapper {
  mapEventToResponse(event: EmailEventDto): MapEventDto[] {
    const records = event.Records;

    return records.map((record) => {
      return {
        spam: record.ses.receipt.spamVerdict.status === 'PASS',
        virus: record.ses.receipt.virusVerdict.status === 'PASS',
        dns:
          record.ses.receipt.spfVerdict.status === 'PASS' &&
          record.ses.receipt.dkimVerdict.status === 'PASS' &&
          record.ses.receipt.dmarcVerdict.status === 'PASS',
        mes: new Date(record.ses.mail.timestamp).toLocaleString('es', {
          month: 'long',
        }),
        retrasado: record.ses.receipt.processingTimeMillis > 1000,
        emisor: record.ses.mail.source.split('@')[0],
        receptor: record.ses.mail.destination.map((dest) => dest.split('@')[0]),
      };
    });
  }
}
