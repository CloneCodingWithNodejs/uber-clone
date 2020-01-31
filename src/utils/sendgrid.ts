import Sendgrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

Sendgrid.setApiKey(process.env.SENDGRID_KEY || '');

const sendMsg = (to: string, subject: string, text: string, html: string) => {
  console.log(`휴... ${process.env.SENDGRID_KEY}`);
  const msg = {
    to,
    from: 'gudwnsdl8@nave.com',
    subject,
    text,
    html
  };
  try {
    Sendgrid.send(msg);
  } catch (error) {
    console.log(`에러 ${error.message}`);
  }
};

export default sendMsg;
