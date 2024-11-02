// /pages/api/send-sms.js
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phone, message } = req.body;

    try {
      const messageResponse = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER, // seu número Twilio
        to: phone,
      });
      return res.status(200).json({ success: true, messageResponse });
    } catch (error) {
      console.error('Error sending SMS:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
