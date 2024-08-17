import Cloud from "../utils/cloudinary";
import { pLimit } from "./pLimit";

async function uploadImages(
  upload_preset: string,
  limit: number,
  images: any[]
) {
  const l = pLimit(limit);

  const imagesToUpload = images.map((image: any) => {
    return l(async () => {
      const result = await Cloud.uploader.upload(image, { upload_preset });
      return result;
    });
  });

  const uploadRes = await Promise.all(imagesToUpload);

  return uploadRes;
}

export default uploadImages;
