const result = require("dotenv").config();

if (result.error) {
  console.error("❌ .env load korte error hochche:", result.error);
} else {
  console.log("✅ .env theke variable load hoyeche:", Object.keys(result.parsed));
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// ১. মিডলওয়্যার কনফিগারেশন
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://campaignsquat.com",
  "https://www.campaignsquat.com",
  "https://campaignsquat-frontend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy error"), false);
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

// --- 🔑 Admin Login Route ---
app.post("/api/admin-login", async (req, res) => {
  try {
    const inputEmail = req.body.email?.trim().toLowerCase();
    const inputPassword = req.body.password?.trim();

    if (!inputEmail || !inputPassword) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    let admin = await Admin.findOne({ email: inputEmail });
    let isMatch = false;
    if (admin) {
      isMatch = await bcrypt.compare(inputPassword, admin.password);
    } else {
      const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const envPass = process.env.ADMIN_PASSWORD?.trim();
      if (envEmail && envPass && inputEmail === envEmail && inputPassword === envPass) {
        isMatch = true;
      }
    }

    if (isMatch) {
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: "Server Configuration Error: Missing Secret." });
      }
      const token = jwt.sign(
        { role: "admin", email: inputEmail },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.json({ success: true, token, message: "Access Granted! Welcome Back." });
    } else {
      return res.status(401).json({ success: false, message: "Invalid Email or Security Key!" });
    }
  } catch (err) {
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
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

// ৪. এপিআই রাউট ইম্পোর্টস
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

// --- ৫. ফ্রন্টএন্ড সার্ভ করার লজিক (নতুন যোগ করা হয়েছে) ---
// আপনার ফাইল স্ট্রাকচার অনুযায়ী 'dist' ফোল্ডারটি 'server' এর এক লেভেল উপরে আছে।
const frontendDistPath = path.join(__dirname, "../dist");
app.use(express.static(frontendDistPath));

// সব রুটকে index.html এ পাঠানো (SPA Routing এর জন্য)
app.get("*", (req, res) => {
  // যদি API রিকোয়েস্ট না হয়, তবেই ইন্ডেক্স ফাইল পাঠাবে
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  }
});

// ৬. ডাটাবেস কানেকশন
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ DB Error:", err));

// ৭. এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

process.on("uncaughtException", (err) => console.error("Uncaught Error:", err));
process.on("unhandledRejection", (reason) => console.error("Unhandled Rejection:", reason));

// ৮. সার্ভার লিসেনিং (More Stable for Hosting)
const PORT = process.env.PORT || 3000; // হোস্টিংগারের জন্য ৩০০০ বা ৮০০০ পোর্টি বেশি নিরাপদ

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Campaignsquat Backend is Live!`);
    console.log(`✅ Running on Port: ${PORT}`);
    console.log(`🔗 URL: https://campaignsquat.com`);
});