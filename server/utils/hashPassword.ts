import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPass = await bcrypt.hash(password, salt);

  return encryptedPass;
};

export default hashPassword;
