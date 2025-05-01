const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary.config");

// Konfigurasi penyimpanan Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// Middleware upload
// filepath: src/utils/multer.config.js
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
    fileFilter: (req, file, cb) => {
        if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
            return cb(new Error("Only .jpg and .png files are allowed"));
        }
        cb(null, true);
    }
});

module.exports = upload;
