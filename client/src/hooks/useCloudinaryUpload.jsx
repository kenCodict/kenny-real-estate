import { useState } from "react";
import axios from "axios";

const useCloudinaryUpload = (cloudName, uploadPreset, type = "auto") => {
  const [imgUrls, setImgUrls] = useState([]); // Stores objects { url, publicId }
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file, updateProgress) => {
    if (!file) return null;

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          updateProgress(event.loaded, event.total);
        },
      });

      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
      };
    } catch (err) {
      setError(err.message || "Upload failed");
      return null;
    }
  };

  const uploadMultipleFiles = async (files) => {
    if (!files || files.length === 0) {
      setError("No files selected.");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    let uploadedSize = 0;
    let totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);

    const updateProgress = (loaded, total) => {
      uploadedSize += loaded;
      const newProgress = Math.min(
        Math.round((uploadedSize / totalSize) * 100),
        100
      );
      setProgress(newProgress);
    };

    const uploadPromises = Array.from(files).map(async (file) => {
      return await uploadFile(file, updateProgress);
    });

    const uploadedResults = await Promise.all(uploadPromises);
    const validUploads = uploadedResults.filter(Boolean);

    setImgUrls(validUploads); // Store the objects with { url, publicId }
    setLoading(false);
    setProgress(100);
  };

  const deleteFile = async (publicId) => {
    if (!publicId) return;

    try {
      const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`;
      await axios.post(cloudinaryDeleteUrl, { token: publicId });

      setImgUrls((prev) => prev.filter((img) => img.publicId !== publicId));
    } catch (err) {
      setError("Failed to delete file");
    }
  };

  const replaceFile = async (oldPublicId, newFile) => {
    if (!oldPublicId || !newFile) return;

    await deleteFile(oldPublicId);

    const uploadedFile = await uploadFile(newFile, (loaded, total) =>
      setProgress(Math.round((loaded / total) * 100))
    );

    if (uploadedFile) {
      setImgUrls((prev) =>
        prev.map((img) => (img.publicId === oldPublicId ? uploadedFile : img))
      );
    }
  };

  return {
    upload: (file) =>
      uploadFile(file, (loaded, total) =>
        setProgress(Math.min(Math.round((loaded / total) * 100), 100))
      ),
    multiUpload: uploadMultipleFiles,
    deleteFile,
    replaceFile,
    progress,
    loading,
    error,
    imgUrls, // Now returns [{ url, publicId }]
  };
};

export default useCloudinaryUpload;
