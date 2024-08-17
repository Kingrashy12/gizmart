import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendVerificationCode = (number: string) => {
  /*
    The key from one of your Verification Apps, found here https://dashboard.sinch.com/verification/apps
 */
  const APPLICATION_KEY = process.env.VKEY;

  /*
    The secret from the Verification App that uses the key above, found here https://dashboard.sinch.com/verification/apps
*/
  const APPLICATION_SECRET = process.env.VSECRET;

  /*
    The number that will receive the SMS. Test accounts are limited to verified numbers.
    The number must be in E.164 Format, e.g. Netherlands 0639111222 -> +31639111222
*/
  const TO_NUMBER = number;

  const SINCH_URL =
    "https://verification.api.sinch.com/verification/v1/verifications";

  const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

  const payload = {
    identity: {
      type: "number",
      endpoint: TO_NUMBER,
    },
    method: "sms",
  };

  const headers = {
    Authorization:
      "Basic " + Buffer.from(basicAuthentication).toString("base64"),
    "Content-Type": "application/json; charset=utf-8",
  };

  axios
    .post(SINCH_URL, payload, { headers })
    .then((response) => console.log("Code sent"))
    .catch((error) => console.error("There was an error!", error));
};

export default sendVerificationCode;
