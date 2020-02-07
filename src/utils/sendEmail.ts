import Mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config();

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_KEY || '',
  domain: process.env.MAILGUN_MYDOMAIN || ''
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: '<mailgun@khj-dev.com>',
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

const sendVerificationEmail = (to: string, fullname: string, key: string) => {
  const emailSubject = `안녕하세요! ${fullname}님 이메일을 인증해주세요`;
  const emailBody = `클릭해서 인증하세요 <a href="http://localhost:3000/verify-email/${key}/">클릭</a>`;
  return sendEmail(to, emailSubject, emailBody);
};

export default sendVerificationEmail;
