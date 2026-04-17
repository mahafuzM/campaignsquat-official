if (
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import TagManager from "react-gtm-module";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";

// // ✅ বিকল্প পদ্ধতি (সবচেয়ে সেফ)
axios.defaults.baseURL =
  window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "https://campaignsquat.com/api";
    
// 🛡️ Axios Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Global Components */
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

/* Loading Spinner */
const PageLoader = () => (
  <div className="min-h-screen bg-[#02050A] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/* --- Admin Components (Lazy Loaded) --- */
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const HomeDashboard = lazy(() => import("./admin/pages/home/HomeDashboard"));
const HeroEdit = lazy(() => import("./admin/pages/home/HeroEdit"));
const AboutEdit = lazy(() => import("./admin/pages/home/CampaignEdit"));
const BrandEdit = lazy(() => import("./admin/pages/home/BrandEdit"));
const IndustryAdd = lazy(() => import("./admin/pages/home/IndustryAdd"));
const AdminWorkProcess = lazy(
  () => import("./admin/pages/home/AdminWorkProcess"),
);
const RecentEdit = lazy(() => import("./admin/pages/home/RecentEdit"));
const SuccessStoryAdmin = lazy(
  () => import("./admin/pages/home/SuccessStoryAdmin"),
);
const FaqAdmin = lazy(() => import("./admin/pages/home/FaqAdmin"));
const ContactAdmin = lazy(() => import("./admin/pages/home/ContactAdmin"));
const AboutHeroEdit = lazy(() => import("./admin/pages/about/AboutHeroEdit"));
const AboutVisionEdit = lazy(
  () => import("./admin/pages/about/AboutVisionEdit"),
);
const AboutGalleryEdit = lazy(
  () => import("./admin/pages/about/AboutGalleryEdit"),
);
const AboutMissionEdit = lazy(
  () => import("./admin/pages/about/AboutMissionEdit"),
);
const AboutFeaturesEdit = lazy(
  () => import("./admin/pages/about/AboutFeaturesEdit"),
);
const AboutRecognitionEdit = lazy(
  () => import("./admin/pages/about/AboutRecognitionEdit"),
);
const AboutTeamEdit = lazy(() => import("./admin/pages/about/AboutTeamEdit"));
const ProductManager = lazy(
  () => import("./admin/pages/product/ProductManager"),
);
const BlogManager = lazy(() => import("./admin/pages/blog/BlogManager"));
const CareerManager = lazy(() => import("./admin/pages/careears/AdminCareers"));
const ProjectManager = lazy(() => import("./admin/pages/project/AdminProject"));
const AdminApplications = lazy(
  () => import("./admin/pages/careears/AdminApplications"),
);
const MegaMenuAdmin = lazy(
  () => import("./admin/pages/megamanu/MegaMenuAdmin"),
);
const AgencyComparisonAdmin = lazy(
  () => import("./admin/pages/PricingPlans/AgencyComparisonAdmin"),
);
const ServiceEcosystemAdmin = lazy(
  () => import("./admin/pages/PricingPlans/ServiceEcosystemadmin"),
);
const TechnicalEdgeAdmin = lazy(
  () => import("./admin/pages/Technical/TechnicalEdgeAdmin"),
);
const AdminFooter = lazy(() => import("./admin/pages/home/AdminFooter"));
const PricingManager = lazy(
  () => import("./admin/pages/PricingPlans/PricingManager"),
);
const ApplicationDetails = lazy(
  () => import("./admin/pages/careears/ApplicationDetails"),
);

// ✅ SEO Manager (অন্যান্য পেজের জন্য)
// ✅ এটি একদম নিখুঁত ফরম্যাট
const OtherPageManager = lazy(
  () => import("./admin/pages/OtherPages/OtherPageManager"),
);

const AdminPasswordChange = lazy(
  () => import("./admin/pages/settings/AdminPasswordChange"),
);

// ✅ GTM & SEO Management Added
const GtmManagement = lazy(() => import("./admin/pages/GTM/GtmManagement"));
const SEOManagement = lazy(() => import("./admin/pages/GTM/SEOManagement"));

/* --- Main Website Pages (Lazy Loaded) --- */
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobdetailsPage = lazy(() => import("./pages/JobdetailsPage"));
const ApplyjobPage = lazy(() => import("./pages/ApplyjobPage"));
const BookMeeting = lazy(() => import("./pages/BookMeeting"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const DynamicSeoPage = lazy(() => import("./pages/DynamicPage/DynamicSeoPage"));
// App.jsx এর একদম উপরে যেখানে lazy import করছেন সেখানে এটি দিন:
const FloatingContactAdmin = lazy(
  () => import("./admin/pages/ContuctPopup/FloatingContactAdmin"),
);

/* ✅ সার্ভিস ক্যাটাগরি পেজ */
const UiUxDesign = lazy(() => import("./UIUXServices/UiUxDesign"));
const WebDesignDevPage = lazy(
  () => import("./WebDevServices/WebDesignDevelopment"),
);
const SoftwareDevelopment = lazy(
  () => import("./SoftwareServices/SoftwareDevelopment"),
);
const MobileAppDev = lazy(() => import("./MobileAppDev/MobileAppDevelopment"));

// 🛡️ প্রোটেক্টেড রুট গার্ড
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin-login" replace />;
  return children;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const [seoConfig, setSeoConfig] = useState({
    id: "",
    googleCode: "",
    active: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // ✅ SEO & Tag Manager Initializer (Campaignsquat Ltd Standard)
  useEffect(() => {
    const fetchAllSEOData = async () => {
      try {
        const [gtmRes, seoRes] = await Promise.all([
          axios.get("/api/gtm-config"),
          axios.get("/api/seo-settings"),
        ]);

        const gtmData = gtmRes.data;
        const seoData = seoRes.data;

        if (seoData || gtmData) {
          // ডাটা অবজেক্ট বা অ্যারে যাই হোক, এটি সঠিকটি খুঁজে নেবে
          const fetchedGoogleCode =
            (Array.isArray(seoData)
              ? seoData[0]?.googleVerificationCode
              : seoData?.googleVerificationCode) || "";
          const fetchedGtmId =
            (Array.isArray(gtmData) ? gtmData[0]?.gtmId : gtmData?.gtmId) || "";
          const fetchedIsActive =
            (Array.isArray(gtmData)
              ? gtmData[0]?.isActive
              : gtmData?.isActive) || false;

          setSeoConfig({
            googleCode: fetchedGoogleCode,
            id: fetchedGtmId,
            active: fetchedIsActive,
          });

          // GTM ইনিশিয়ালাইজেশন
          if (fetchedIsActive && fetchedGtmId && !window.gtmInitialized) {
            TagManager.initialize({ gtmId: fetchedGtmId });
            window.gtmInitialized = true;
          }
        }
      } catch (err) {
        console.error("❌ SEO Fetch Error:", err);
      }
    };

    fetchAllSEOData();
  }, []); // এখানে মাত্র একটি সেমিকোলন থাকবে

  const isBookingPage = pathname === "/book-meeting";
  const isAdminPage =
    pathname.startsWith("/admin") || pathname === "/admin-login";
  const hideLayout = isBookingPage || isAdminPage;

  return (
    <div className="min-h-screen bg-[#02050A] flex flex-col font-poppins text-white">
      <Helmet key={seoConfig.googleCode || "campaignsquat-seo"}>
        {/* ডাইনামিক টাইটেল */}
        <title>Campaignsquat Ltd - Custom Software & UI/UX Agency</title>

        {/* ✅ Google Search Console Verification */}
        {seoConfig.googleCode && seoConfig.googleCode.trim() !== "" && (
          <meta
            name="google-site-verification"
            content={seoConfig.googleCode}
          />
        )}

        {/* ✅ Noscript GTM Backup */}
        {seoConfig.active && seoConfig.id && (
          <noscript>
            {`<iframe src="https://www.googletagmanager.com/ns.html?id=${seoConfig.id}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}
          </noscript>
        )}
      </Helmet>

      {/* ✅ নোটিফিকেশন টোস্টার */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />

      {!hideLayout && <Navbar />}
      {!isAdminPage && <FloatingContact />}

      <Suspense fallback={<PageLoader />}>
        <main className={`flex-grow ${hideLayout ? "pt-0" : "pt-24 md:pt-28"}`}>
          <Routes>
            {/* --- 🔑 Admin Routes --- */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomeDashboard />} />
              <Route path="home" element={<HomeDashboard />} />
              <Route path="home/hero" element={<HeroEdit />} />
              <Route path="home/about" element={<AboutEdit />} />
              <Route path="home/brands" element={<BrandEdit />} />
              <Route path="home/industries" element={<IndustryAdd />} />
              <Route path="home/work-process" element={<AdminWorkProcess />} />
              <Route path="home/recent-projects" element={<RecentEdit />} />
              <Route
                path="home/success-stories"
                element={<SuccessStoryAdmin />}
              />
              <Route path="home/faqs" element={<FaqAdmin />} />
              <Route path="home/contacts" element={<ContactAdmin />} />
              <Route path="about/hero" element={<AboutHeroEdit />} />
              <Route path="about/vision" element={<AboutVisionEdit />} />
              <Route path="about/gallery" element={<AboutGalleryEdit />} />
              <Route path="about/mission" element={<AboutMissionEdit />} />
              <Route path="about/features" element={<AboutFeaturesEdit />} />
              <Route
                path="about/recognition"
                element={<AboutRecognitionEdit />}
              />
              <Route path="about/team" element={<AboutTeamEdit />} />
              <Route path="product" element={<ProductManager />} />
              <Route path="blogs" element={<BlogManager />} />
              <Route path="careers" element={<CareerManager />} />
              <Route path="job-applications" element={<AdminApplications />} />
              <Route path="application/:id" element={<ApplicationDetails />} />
              <Route path="projects" element={<ProjectManager />} />
              <Route path="mega-menu" element={<MegaMenuAdmin />} />
              <Route path="pricing" element={<PricingManager />} />
              <Route path="technical-edge" element={<TechnicalEdgeAdmin />} />
              <Route
                path="service-ecosystem"
                element={<ServiceEcosystemAdmin />}
              />
              <Route
                path="agency-comparison"
                element={<AgencyComparisonAdmin />}
              />
              <Route path="home/footer" element={<AdminFooter />} />
              <Route
                path="home/floating-contact"
                element={<FloatingContactAdmin />}
              />

              <Route path="other-pages" element={<OtherPageManager />} />
              <Route path="gtm-management" element={<GtmManagement />} />
              <Route path="seo-management" element={<SEOManagement />} />
              <Route
                path="settings/change-password"
                element={<AdminPasswordChange />}
              />
            </Route>

            {/* --- 🌐 Main Website Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/our-projects" element={<ProjectsPage />} />
            <Route path="/our-product" element={<ProductPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:url" element={<BlogDetails />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/job-details/:id" element={<JobdetailsPage />} />
            <Route path="/apply-job" element={<ApplyjobPage />} />
            <Route path="/book-meeting" element={<BookMeeting />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/service-details/:id" element={<ServiceDetails />} />

            {/* ✅ সার্ভিস ক্যাটাগরি রাউট */}
            <Route path="/service/ui-ux-design" element={<UiUxDesign />} />
            <Route
              path="/service/web-design-development"
              element={<WebDesignDevPage />}
            />
            <Route
              path="/service/software-development"
              element={<SoftwareDevelopment />}
            />
            <Route
              path="/service/mobile-app-development"
              element={<MobileAppDev />}
            />

            {/* ✅ ডাইনামিক SEO পেজ রুট Added Perfectly */}
            <Route path="/p/:slug" element={<DynamicSeoPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Suspense>

      {!hideLayout && (
        <>
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
