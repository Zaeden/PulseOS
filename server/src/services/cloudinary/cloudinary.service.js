import cloudinary from "../../configs/cloudinary.js";
import streamifier from "streamifier";

export const uploadFile = ({
  fileBuffer,
  folder,
  fileName,
  resourceType = "auto",
}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: fileName,
        resource_type: resourceType,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          fileUrl: result.secure_url,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format,
        });
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const deleteFile = async (publicId, resourceType = "image") => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};
