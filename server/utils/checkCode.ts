import axios from "axios";

const checkCode = (number: string, code: string) => {
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

  /*
    The code which was sent to the number.
*/
  const CODE = code;

  const SINCH_URL =
    "https://verification.api.sinch.com/verification/v1/verifications/number/" +
    TO_NUMBER;

  const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

  const payload = {
    method: "sms",
    sms: {
      code: CODE,
    },
  };

  const headers = {
    Authorization:
      "Basic " + Buffer.from(basicAuthentication).toString("base64"),
    "Content-Type": "application/json; charset=utf-8",
  };

  axios
    .put(SINCH_URL, payload, { headers })
    .then((response) => console.log("Code verified"))
    .catch((error) => console.error("There was an error!", error));
};

export default checkCode;
