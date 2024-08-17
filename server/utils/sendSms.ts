import { SinchClient } from "@sinch/sdk-core";
import dotenv from "dotenv";

dotenv.config();

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_ACCESS_KEY_ID,
  keySecret: process.env.INCH_ACCESS_KEY_SECRET,
});

async function sendSms(number: string, message: string) {
  const response = await sinchClient.sms.batches
    .send({
      sendSMSRequestBody: {
        from: "447441421508",
        to: [number],
        body: message,
        // flash_message: true,
      },
    })
    .then(() => console.log("sms sent successfully"))
    .catch((err) => console.log({ smsError: err.message }));

  return JSON.stringify(response);
}
export default sendSms;
