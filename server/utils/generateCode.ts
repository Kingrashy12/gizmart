const generateCode = (length: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return code;
};

export default generateCode;

export function generateNumber(length: number) {
  const numbers = "1234567890";
  let number = "";

  for (let i = 0; i < length; i++) {
    number += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return number;
}
