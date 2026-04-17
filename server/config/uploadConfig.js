const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Centralized Multer Configuration for Hostinger Environment
 * Saves images to public_html/uploads for direct LiteSpeed serving
 */

/**
 * Bulletproof Multi-Server Upload Directory Resolution (Lifetime Fix)
 */
let uploadDir;

if (process.env.UPLOAD_DIR_PATH) {
  // 1. Highest Priority: Explicit .env path (Works for AWS/VPS/Custom)
  uploadDir = path.resolve(process.env.UPLOAD_DIR_PATH);
} else {
  // 2. Probing for Shared Hosting (Hostinger / cPanel Architecture)
  // Backtracking from `nodejs/server/config` -> `nodejs/server` -> `nodejs` -> `domain_root`
  const sharedHostingRoot = path.resolve(__dirname, "../../../public_html");
  
  if (fs.existsSync(sharedHostingRoot)) {
    // If public_html exists exactly 3 levels up, use it automatically!
    uploadDir = path.join(sharedHostingRoot, "uploads");
  } else {
    // 3. Fallback: Local Development / Standard Docker Environment
    // Saves to `server/uploads`
    uploadDir = path.resolve(__dirname, "../uploads");
  }
}

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: prefix-timestamp-random.ext
    const prefix = req.baseUrl.split("/").pop() || "upload";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpg, png, webp, svg) are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
module.exports.upload = upload;
module.exports.uploadDir = uploadDir;
