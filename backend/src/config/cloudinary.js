const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    //delete the file from cloudinary
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (error) {
    console.error("Error while deleting from cloudinary", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
