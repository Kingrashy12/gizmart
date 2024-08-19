import Cloud from "../utils/cloudinary";

async function uploadImage(upload_preset: string, image: any) {
  const res = await Cloud.uploader.upload(image, { upload_preset });
  return res;
}

export default uploadImage;
