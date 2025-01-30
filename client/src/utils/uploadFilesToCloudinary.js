import axios from "axios";

/**
 * Upload multiple files to Cloudinary.
 * @param {FileList | File[]} files - The files to upload.
 * @param {string} uploadPreset - The Cloudinary upload preset.
 * @param {string} cloudName - Your Cloudinary cloud name.
 * @returns {Promise<string[]>} - A promise resolving to an array of uploaded file URLs.
 */
export const uploadFilesToCloudinary = async (
  files,
  uploadPreset,
  type,
  cloudName
) => {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload.");
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.secure_url; // Return the uploaded file URL
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  });

  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls.filter((url) => url !== null); // Remove failed uploads
};
