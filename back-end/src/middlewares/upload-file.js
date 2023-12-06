const path = require("path");
const multer = require("multer");
const axios = require("axios");

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadToImgur = async (fileBuffer) => {
  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      fileBuffer,
      {
        headers: {
          Authorization: "Client-ID 0d2876cf7258ff6", // Replace YOUR_CLIENT_ID with your actual Imgur API client ID
          "Content-Type": "application/octet-stream",
        },
      }
    );

    return response.data.data.link;
  } catch (error) {
    console.error("Error uploading to Imgur:", error);
    throw error;
  }
};

const storage = multer.memoryStorage();
// 'image' is the name of our file input field in the HTML form
let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("image");

module.exports = {
  upload,
  uploadToImgur,
};
