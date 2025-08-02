import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer to store files in memory
const storage = multer.memoryStorage();

// Create a multer instance with the storage option
const upload = multer({ storage });

// Image upload utility function
async function imageUploadUtil(buffer, folder = "profile-images") {
  const base64 = buffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "image",
  });
  return result;
}

async function deleteCloudinaryImage(imageUrl) {
  if (!imageUrl) return;
  const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
  await cloudinary.uploader.destroy(`profile-images/${publicId}`);
}

export { upload, imageUploadUtil, deleteCloudinaryImage  };