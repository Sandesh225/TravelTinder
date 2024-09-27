import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary:", response.url);

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);

        // Log the error for debugging purposes
        console.error("Error uploading file to Cloudinary:", error);

        return null;
    }
};

const deleteFromCloudinary=async(publicId)=>{
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted from Cloudinary:", response.result);
        return response;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error); 
    }
}
export { uploadOnCloudinary , deleteFromCloudinary};
