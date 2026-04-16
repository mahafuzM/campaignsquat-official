const result = require("dotenv").config(); // <--- Eita ekdom shuru-te thakbe

if (result.error) {
  console.error("❌ .env load korte error hochche:", result.error);
} else {
  // Terminal-e dekhabe ki ki load holo
  console.log("✅ .env theke variable load hoyeche:", Object.keys(result.parsed));
}

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// ১. মিডলওয়্যার কনফিগারেশন (Optimized for Production & Local)
const allowedOrigins = [
  "http://localhost:5173",
  'http://localhost:4173', // Vite preview port (এটি এখন যোগ করুন)
  "https://campaignsquat.com",
  "https://www.campaignsquat.com",
  "https://campaignsquat-frontend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy error"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- 🛡️ Admin Model ---
const Admin = require("./models/Admin");

// ২. অথেনটিকেশন মিডলওয়্যার
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// --- 🔑 Admin Login Route (Database + ENV Hybrid) ---
app.post("/api/admin-login", async (req, res) => {
  try {
    const inputEmail = req.body.email?.trim().toLowerCase();
    const inputPassword = req.body.password?.trim();

    if (!inputEmail || !inputPassword) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    // প্রথমে ডাটাবেসে চেক করবে
    let admin = await Admin.findOne({ email: inputEmail });

    let isMatch = false;
    if (admin) {
      // যদি ডাটাবেসে অ্যাডমিন থাকে, পাসওয়ার্ড ম্যাচ করবে
      isMatch = await bcrypt.compare(inputPassword, admin.password);
    } else {
      // যদি ডাটাবেসে না থাকে, তবে .env এর সাথে চেক করবে
      const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const envPass = process.env.ADMIN_PASSWORD?.trim();

      if (envEmail && envPass && inputEmail === envEmail && inputPassword === envPass) {
        isMatch = true;
      }
    }

    if (isMatch) {
      // Security Check: Ensure JWT_SECRET exists to avoid 500 error
      if (!process.env.JWT_SECRET) {
        console.error("❌ Error: JWT_SECRET is not defined in .env file!");
        return res.status(500).json({ success: false, message: "Server Configuration Error: Missing Secret." });
      }

      const token = jwt.sign(
        { role: "admin", email: inputEmail },
        process.env.JWT_SECRET,
        { expiresIn: "24h" } // Hosting-er jonno time ektu bariye 24h kora holo
      );

      return res.json({
        success: true,
        token,
        message: "Access Granted! Welcome Back.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Security Key!",
      });
    }
  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error: " + err.message });
  }
});

// ৩. স্ট্যাটিক ফোল্ডার ও আপলোড কনফিগারেশন
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

// ৪. রাউট ইম্পোর্টস (সবগুলো এখানে আছে)
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/gtm-config", require("./routes/gtmRoutes"));
app.use("/api/seo-settings", require("./routes/seoRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/industries", require("./routes/industryRoutes"));
app.use("/api/work-process", require("./routes/processRoutes"));
app.use("/api/recent-projects", require("./routes/recentRoutes"));
app.use("/api/success-story", require("./routes/successStory"));
app.use("/api/faqs", require("./routes/faqRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/about-content", require("./routes/aboutContentRoutes"));
app.use("/api/about-vision", require("./routes/aboutvisionRoutes"));
app.use("/api/about-gallery", require("./routes/aboutGalleryRoutes"));
app.use("/api/about-mission", require("./routes/aboutMissionRoutes"));
app.use("/api/about-features", require("./routes/aboutFeatureRoutes"));
app.use("/api/about-recognition", require("./routes/aboutRecognitionRoutes"));
app.use("/api/about-team", require("./routes/aboutTeamRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/jobs", require("./routes/careerRoutes"));
app.use("/api/case-studies", require("./routes/caseStudyRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/megamenu", require("./routes/megaMenuRouter"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/contact-menu", require("./routes/contactMenuRoutes"));
app.use("/api/other-pages", require("./routes/otherPageRouter"));
app.use('/api/admin', require('./routes/adminRoute'));
app.use("/api/pricing", require("./routes/pricingRoutes")); 
app.use("/api/creative-services", require("./routes/creativeServiceRoutes"));
app.use('/api/technical-edge', require('./routes/technicalEdgeRoutes'));
app.use('/api/projects', require('./routes/projectAllruter'));
app.use("/api/agency-comparison", require("./routes/agencyComparisonRoutes"));

// ৫. ডাটাবেস কানেকশন (With timeout for hosting)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ DB Error:", err));

// ৬. এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

process.on("uncaughtException", (err) => console.error("Uncaught Error:", err));
process.on("unhandledRejection", (reason) => console.error("Unhandled Rejection:", reason));

// ৭. সার্ভার লিসেনিং
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});