import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class EmailParserProvider {
  async parseEmail(filePath: string): Promise<any> {
    const emailContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
    return await simpleParser(emailContent);
  }

  extractAttachment(parsedEmail: any) {
    if (parsedEmail.attachments.length > 0) {
      const jsonAttachment = parsedEmail.attachments.find(
        (attachment: { filename: string }) =>
          attachment.filename.endsWith('.json'),
      );
      return jsonAttachment;
    }
    return null;
  }

  extractJsonLink(body: string): string | null {
    const jsonLinkRegex = /https?:\/\/[^\s]+\.json/;
    const matches = body.match(jsonLinkRegex);
    return matches ? matches[0] : null;
  }

  async fetchJsonFromUrl(url: string) {
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      return {
        message: 'valid url: ' + url + ' but can not extract informacion using axios.get'
      }
    }

  }
}
