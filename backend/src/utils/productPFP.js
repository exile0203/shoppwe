import cloudinary from "../config/cloudinaryConfig.js";

export const uploadproductProfile = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`)
          );
        }
        resolve(result);
      }
    ).end(fileBuffer);
  });
};
