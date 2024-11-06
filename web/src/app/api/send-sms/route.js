import { NextResponse } from 'next/server';

import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(req) {
    try {
        const { phone, message } = await req.json();
        console.log(phone)

        const messageResponse = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });
        return NextResponse.json({ success: true, messageResponse });
    } 
    catch (error) 
    {
        console.log('Error sending SMS:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}