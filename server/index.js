require('dotenv').config(); // এটি সবার উপরে থাকতে হবে

// ... বাকি কোড
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// ১. এনভায়রনমেন্ট লোড (Try loading from multiple possible locations)
const envPaths = [
  path.join(__dirname, ".env"),
  path.join(__dirname, "..", ".env"),
  path.resolve(process.cwd(), ".env")
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

console.log("🔗 DB URI status:", !!process.env.MONGO_URI);

const app = express();

// ২. মিডলওয়্যার কনফিগারেশন (CORS Error Fix)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://campaignsquat.com",
  "https://www.campaignsquat.com",
  "http://campaignsquat.com",
  "https://campaignsquat-frontend.vercel.app",
  "https://paleturquoise-mallard-445229.hostingersite.com" // আপনার এই প্রিভিউ ডোমেইনটি অ্যাড করলাম
];

app.use(
  cors({
    origin: function (origin, callback) {
      // origin না থাকলেও (যেমন মোবাইল অ্যাপ বা পোস্টম্যান) এলাও করবে
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // ডোমেইন লিস্টে না থাকলেও ডেভেলপমেন্ট পিরিয়ডে ব্লক করবে না (টেস্টিং এর জন্য)
      // প্রোডাকশনে চাইলে এটা কড়া করতে পারেন
      return callback(null, true); 
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- 🛡️ Admin Model ---
const Admin = require("./models/Admin");

// ৩. অথেনটিকেশন মিডলওয়্যার
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

// --- 🔑 Admin Login Route ---
// --- 🔑 Admin Login Route ---
app.post("/api/admin-login", async (req, res) => {
  console.log("📥 Login attempt received for:", req.body.email); // ডিবাগ লগ
  try {
    const inputEmail = req.body.email?.trim().toLowerCase();
    const inputPassword = req.body.password?.trim();

    if (!inputEmail || !inputPassword) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    // ১. ডাটাবেসে চেক করা
    // ১. প্রথমে ডাটাবেসে চেক করুন
let admin = await Admin.findOne({ email: inputEmail });
let isMatch = false;

if (admin) {
  // ডাটাবেসে ইউজার থাকলে পাসওয়ার্ড চেক করবে
  isMatch = await bcrypt.compare(inputPassword, admin.password);
} else {
  // ২. ডাটাবেসে ইউজার না থাকলে .env থেকে চেক করবে (এটি আপনার ব্যাকআপ)
  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD?.trim();

  if (envEmail && inputEmail === envEmail && inputPassword === envPass) {
    isMatch = true;
    console.log("⚠️ Logging in using Environment Credentials");
  }
}

    if (isMatch) {
      if (!process.env.JWT_SECRET) {
        console.error("❌ MISSING JWT_SECRET IN ENVIRONMENT!");
        return res.status(500).json({ success: false, message: "Server Configuration Error." });
      }
      
      const token = jwt.sign(
        { role: "admin", email: inputEmail },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.json({ success: true, token, message: "Access Granted!" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (err) {
    console.error("❌ Login Route Error:", err);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// ৪. স্ট্যাটিক ফোল্ডার ও আপলোড কনফিগারেশন
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));
app.use("/api/uploads", express.static(uploadDir)); // Fix for Vite proxy requests

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

// 💖 Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy and running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ৫. এপিআই রাউট ইম্পোর্টস
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

// --- ৬. ফ্রন্টএন্ড সার্ভ করার লজিক ---
const frontendDistPath = path.resolve(__dirname, "..", "dist");
app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  } else {
    res.status(404).json({ success: false, message: "API route not found" });
  }
});

// ৭. ডাটাবেস কানেকশন
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 20000, // Increase to 20s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    connectTimeoutMS: 30000, // Give up initial connection after 30s
    family: 4 // Force IPv4 to avoid hostinger DNS/IPv6 issues if any
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ DB Error:", err));

// ৮. এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

process.on("uncaughtException", (err) => console.error("Uncaught Error:", err));
process.on("unhandledRejection", (reason) => console.error("Unhandled Rejection:", reason));

// ৯. সার্ভার লিসেনিং
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Campaignsquat Backend is Live!`);
    console.log(`✅ Running on Port: ${PORT}`);
    console.log(`🔗 URL: https://campaignsquat.com`);
});