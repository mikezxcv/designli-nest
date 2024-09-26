import { ApiProperty } from "@nestjs/swagger";

export class SpamVerdict {
  @ApiProperty({ example: 'PASS' })
  status: string;
}

export class VirusVerdict {
  @ApiProperty({ example: 'PASS' })
  status: string;
}

export class SpfVerdict {
  @ApiProperty({ example: 'PASS' })
  status: string;
}

export class DkimVerdict {
  @ApiProperty({ example: 'PASS' })
  status: string;
}

export class DmarcVerdict {
  @ApiProperty({ example: 'PASS' })
  status: string;
}

export class Action {
  @ApiProperty({ example: 'SNS' })
  type: string;

  @ApiProperty({ example: 'arn:aws:sns:us-east-1:012345678912:example-topic' })
  topicArn: string;
}

export class Receipt {
  @ApiProperty({ example: '2015-09-11T20:32:33.936Z' })
  timestamp: string;

  @ApiProperty({ example: 222 })
  processingTimeMillis: number;

  @ApiProperty({ example: ['recipient@example.com'] })
  recipients: string[];

  @ApiProperty({ type: SpamVerdict })
  spamVerdict: SpamVerdict;

  @ApiProperty({ type: VirusVerdict })
  virusVerdict: VirusVerdict;

  @ApiProperty({ type: SpfVerdict })
  spfVerdict: SpfVerdict;

  @ApiProperty({ type: DkimVerdict })
  dkimVerdict: DkimVerdict;

  @ApiProperty({ type: DmarcVerdict })
  dmarcVerdict: DmarcVerdict;

  @ApiProperty({ example: 'reject' })
  dmarcPolicy: string;

  @ApiProperty({ type: Action })
  action: Action;
}

export class Header {
  @ApiProperty({ example: 'Return-Path' })
  name: string;

  @ApiProperty({ example: '<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>' })
  value: string;
}

export class CommonHeaders {
  @ApiProperty({ example: '0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com' })
  returnPath: string;

  @ApiProperty({ example: ['sender@example.com'] })
  from: string[];

  @ApiProperty({ example: 'Fri, 11 Sep 2015 20:32:32 +0000' })
  date: string;

  @ApiProperty({ example: ['recipient@example.com'] })
  to: string[];

  @ApiProperty({ example: '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>' })
  messageId: string;

  @ApiProperty({ example: 'Example subject' })
  subject: string;
}

export class Mail {
  @ApiProperty({ example: '2015-09-11T20:32:33.936Z' })
  timestamp: string;

  @ApiProperty({ example: '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com' })
  source: string;

  @ApiProperty({ example: 'd6iitobk75ur44p8kdnnp7g2n800' })
  messageId: string;

  @ApiProperty({ example: ['recipient@example.com'] })
  destination: string[];

  @ApiProperty({ example: false })
  headersTruncated: boolean;

  @ApiProperty({ type: [Header] })
  headers: Header[];

  @ApiProperty({ type: CommonHeaders })
  commonHeaders: CommonHeaders;
}

export class Ses {
  @ApiProperty({ type: Receipt })
  receipt: Receipt;

  @ApiProperty({ type: Mail })
  mail: Mail;
}

export class Record {
  @ApiProperty({ example: '1.0' })
  eventVersion: string;

  @ApiProperty({ type: Ses })
  ses: Ses;

  @ApiProperty({ example: 'aws:ses' })
  eventSource: string;
}

export class EmailEventDto {
  @ApiProperty({
    type: [Record],
    example: [
      {
        eventVersion: '1.0',
        ses: {
          receipt: {
            timestamp: '2015-09-11T20:32:33.936Z',
            processingTimeMillis: 222,
            recipients: ['recipient@example.com'],
            spamVerdict: { status: 'PASS' },
            virusVerdict: { status: 'PASS' },
            spfVerdict: { status: 'PASS' },
            dkimVerdict: { status: 'PASS' },
            dmarcVerdict: { status: 'PASS' },
            dmarcPolicy: 'reject',
            action: {
              type: 'SNS',
              topicArn: 'arn:aws:sns:us-east-1:012345678912:example-topic',
            },
          },
          mail: {
            timestamp: '2015-09-11T20:32:33.936Z',
            source: '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
            messageId: 'd6iitobk75ur44p8kdnnp7g2n800',
            destination: ['recipient@example.com'],
            headersTruncated: false,
            headers: [
              {
                name: 'Return-Path',
                value: '<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>',
              },
              {
                name: 'Received',
                value: 'from a9-183.smtp-out.amazonses.com (a9-183.smtp-out.amazonses.com [54.240.9.183]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id d6iitobk75ur44p8kdnnp7g2n800 for recipient@example.com; Fri, 11 Sep 2015 20:32:33 +0000 (UTC)',
              },
            ],
            commonHeaders: {
              returnPath:
                '0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com',
              from: ['sender@example.com'],
              date: 'Fri, 11 Sep 2015 20:32:32 +0000',
              to: ['recipient@example.com'],
              messageId:
                '<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>',
              subject: 'Example subject',
            },
          },
        },
        eventSource: 'aws:ses',
      },
    ],
  })
  Records: Record[];
}
