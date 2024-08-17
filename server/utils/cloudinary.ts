import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const Cloud = cloudinary.v2;

Cloud.config({
  api_key: process.env.CLOUDINARY_APIKEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export default Cloud;
