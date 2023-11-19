const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
    format: async (req, file) => {
      const fileType = file.mimetype;
      switch (fileType) {
        case "image/jpeg":
          return "jpeg";
        case "image/png":
          return "png";
        case "image/webp":
          return "webp";
        case "image/webp":
          return "jfif";
        default:
          return "jpg";
      }
    },
    public_id: (req, file) => "computed-filename-using-request",
  }, // supports promises as well
  
});

module.exports = multer({ storage });
