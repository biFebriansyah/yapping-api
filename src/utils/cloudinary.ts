import { v2 as cloudinary } from 'cloudinary';

export async function UploadedFile(filepath: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: process.env.CLOUD_FDNAME,
    });
    return result.url;
  } catch (error) {
    throw error;
  }
}
