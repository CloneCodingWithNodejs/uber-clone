/* eslint-disable implicit-arrow-linebreak */
import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClinet = Twilio(process.env.TW_SID, process.env.TW_TOKEN);

// eslint-disable-next-line arrow-body-style
export const sendSMS = (to: string, body: string) => {
  return twilioClinet.messages.create({
    body,
    to,
    from: process.env.TW_NUMBER,
  });
};

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `인증번호는 ${key} 입니다`);
