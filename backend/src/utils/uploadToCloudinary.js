import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (buffer, folder = "campuskart/products") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id
                    });
                }
            }
        );

        uploadStream.end(buffer);
    });
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Cloudinary deletion error for", publicId, error.message);
        return null;
    }
};

export const extractPublicIdFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
        const parts = url.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1) return null;

        const relevantParts = parts.slice(uploadIndex + 1);
        if (relevantParts[0] && /^v\d+$/.test(relevantParts[0])) {
            relevantParts.shift();
        }
        const fileWithExt = relevantParts.join("/");
        const dotIndex = fileWithExt.lastIndexOf(".");
        return dotIndex !== -1 ? fileWithExt.substring(0, dotIndex) : fileWithExt;
    } catch {
        return null;
    }
};

export default uploadToCloudinary;