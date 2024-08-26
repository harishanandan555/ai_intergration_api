/**
 *        @file email_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary EmailService Class
 * @description Defines function to send Email
 *   @functions - send()
 */

import { Client } from 'postmark';
import { email, exceptionEmailInfo } from '../config';
const nodemailer = require('nodemailer');
const emailTemplate = require('email-templates');

    
const supportmailTransport = nodemailer.createTransport(
  exceptionEmailInfo.auth_smtp
);

export class EmailService {
  
  public config = exceptionEmailInfo.addresses

  public client: any

  constructor() {

    this.client = new emailTemplate({
      message: { from: exceptionEmailInfo.addresses.sender },
      send: true,
      transport: supportmailTransport
    });
    
  }

  public async send(To: string, Subject: string, Tag: string, HtmlBody: string) {

      this.client.send({
        template: ``,
        message: ``,
        locals: {
          From: this.config.from,
          To,
          Tag,
          Subject,
          HtmlBody,
      }
      }).then((response: any) => {
          console.log('Success Response from Mail Server');
          return true;
      })
      .catch((error: any) => {
          console.log('Failure Response from Mail Server');
          console.log(error);
          return false;
      });

  }

}

export default new EmailService()
