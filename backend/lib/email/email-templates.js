/*
 * @file: email-templates.js
 * @description: It Contain function layer for email-templates.
 * @author: Manpreet Singh
 */

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import objSMTP from './email-constant.js';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: objSMTP.host,
  port: objSMTP.port,
  secureConnection: false,
  auth: {
    user: objSMTP.username,
    pass: objSMTP.password,
  },
});

String.prototype.replaceAll = function(s, r) {
  return this.split(s).join(r);
};

export const SENDEMAIL = async (type,bodyInfo) => {
  const sendToEmail = bodyInfo.email;
  if (sendToEmail) {
    let htmlFile;
    const mailOptions = {
      from: objSMTP.fromEmail, // sender address
    };

    try {
      switch (type) {
        case 'forgot-password':
          htmlFile = fs.readFileSync(path.join(__dirname + '/template/forgot-password.html'), 'utf-8');
          htmlFile = htmlFile
                    .replace('$expireToken', bodyInfo.expireToken)
                    .replaceAll('$email', bodyInfo.email)
          mailOptions.to = sendToEmail;
          mailOptions.subject = 'VNDR Password Reset';
          mailOptions.html = htmlFile;
          return await transporter.sendMail(mailOptions);
          break;

          case 'create-user':
          htmlFile = fs.readFileSync(path.join(__dirname + '/template/create-user.html'), 'utf-8');
          htmlFile = htmlFile
                    .replace('$url', bodyInfo.url)
                    .replaceAll('$email', bodyInfo.email)
          mailOptions.to = sendToEmail;
          mailOptions.subject = 'Welcome Email for VNDR';
          mailOptions.html = htmlFile;
          return await transporter.sendMail(mailOptions);
          break;
      }
    } catch(error) {
         throw error;
    }
  }
  
};