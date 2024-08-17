import bcrypt from "bcrypt";

const comparePassword = async (password: string, userPassword: string) => {
  const encryptedPass = await bcrypt.compare(password, userPassword);

  return encryptedPass;
};

export default comparePassword;
