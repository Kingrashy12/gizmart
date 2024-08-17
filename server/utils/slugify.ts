import generateCode from "./generateCode";

const slugify = (name: string) => {
  const convertedName = name
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/\--+/g, "-")
    .replace(/["\/]/g, "-");

  return convertedName + "-" + generateCode(10);
};

export default slugify;
