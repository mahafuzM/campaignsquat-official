import React, { useState, useEffect } from 'react'; // useEffect যোগ করা হয়েছে
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // মেনু ওপেন-ক্লোজ স্টেট
  const [isHomeOpen, setIsHomeOpen] = useState(false); 
  const [isAboutOpen, setIsAboutOpen] = useState(false); 
  const [isProductOpen, setIsProductOpen] = useState(false); 
  const [isBlogOpen, setIsBlogOpen] = useState(false); 
  const [isCareerOpen, setIsCareerOpen] = useState(false); 
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false); // Pricing এর জন্য নতুন স্টেট
  const [isTechEdgeOpen, setIsTechEdgeOpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false); // এটা আছে কি না দেখুন
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

 //// 🛡️ অটো-লগআউট ও সেশন চেক লজিক (২ ঘণ্টা/১০ সেকেন্ড ইন্টারভাল)
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          // JWT টোকেনের Payload অংশ ডিকোড করা
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiryTime = payload.exp * 1000; 
          const currentTime = Date.now();

          // যদি সেশনের সময় পার হয়ে যায়
          if (currentTime > expiryTime) {
            console.log("Session expired. Logging out...");
            handleLogout();
            alert("Security Alert: Your 12h session has expired! Please login again.");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      } else {
        // টোকেন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট
        navigate('/admin-login');
      }
    };

    // ✅ প্রতি ১০ সেকেন্ড পর পর চেক করবে (পারফরম্যান্স ফ্রেন্ডলি)
    const interval = setInterval(checkTokenExpiration, 10000); 

    // ক্লিনিং ফাংশন: কম্পোনেন্ট আনমাউন্ট হলে টাইমার বন্ধ হবে
    return () => clearInterval(interval);
  }, [navigate]);

  // 🛡️ লগআউট ফাংশন
  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); 
    localStorage.removeItem('adminToken'); 
    navigate('/admin-login'); 
  };

  const isActive = (path) => location.pathname === path ? "bg-[#F7A400] text-black" : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="flex min-h-screen bg-[#02050A] text-white font-poppins selection:bg-[#F7A400] selection:text-black">
      
      {/* ১. প্রফেশনাল সাইডবার */}
      <aside className="w-72 bg-black border-r border-gray-800 p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="mb-10 px-2">
          <h2 className="text-[#F7A400] text-3xl font-bold tracking-tighter">AGENCY CMS</h2>
          <p className="text-[16px] text-white">Control Panel</p>
        </div>
        
        <nav className="flex-grow space-y-2">
          {/* --- Home Page Parent Menu --- */}
          <div>
            <button 
              onClick={() => setIsHomeOpen(!isHomeOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center text-[16px] gap-3">
                <span>🏠</span> Home Page
              </div>
              <span className={`transition-transform duration-300 ${isHomeOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isHomeOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-white">
                <Link to="/admin/home/hero" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all  ${isActive('/admin/home/hero')}`}>Header Section</Link>
                <Link to="/admin/home/brands" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/brands')}`}>Brand Logos</Link>
                <Link to="/admin/home/about" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/about')}`}>About/Campaign</Link>
                <Link to="/admin/home/industries" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/industries')}`}>Industries Cards</Link>
                <Link to="/admin/home/work-process" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/work-process')}`}>Work Process</Link>
                <Link to="/admin/home/recent-projects" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/recent-projects')}`}>Recent Projects</Link>
                <Link to="/admin/home/success-stories" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/success-stories')}`}>Success Stories</Link>
                <Link to="/admin/home/faqs" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/faqs')}`}>Questions/FAQ</Link>
               <Link to="/admin/home/footer" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/home/footer')}`}>Footer Management</Link>
              </div>
            )}
          </div>

          {/* ✅ ২. About Page Parent Menu */}
          <div>
            <button 
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center gap-3 text-[16px]">
                <span>ℹ️</span> About Page
              </div>
              <span className={`transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isAboutOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
                <Link to="/admin/about/hero" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/hero')}`}>About Hero</Link>
                <Link 
  to="/admin/about/vision" 
  className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/vision') ? 'bg-[#F7A400] text-black font-bold' : 'hover:bg-white/10'}`}
>
  <span className="w-2 h-2 rounded-full bg-[#F7A400]"></span> {/* ছোট একটি ডট স্টাইলের জন্য */}
  About Vision
</Link>
                <Link to="/admin/about/gallery" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/gallery')}`}>About Gallery</Link>
                <Link to="/admin/about/mission" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/mission')}`}>Mission & Vision</Link>
                <Link to="/admin/about/features" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/features')}`}>About Features</Link>
                <Link to="/admin/about/recognition" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/recognition')}`}>Global Recognition</Link>
                <Link to="/admin/about/team" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/about/team')}`}>CEO Message Edit</Link>
              </div>
            )}
          </div>

              
          {/* --- 🚀 Mega Menu (ড্রপডাউন স্টাইল) --- */}
          <div>
            <button 
              onClick={() => setIsProjectOpen(!isProjectOpen)} 
              className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center text-[16px] gap-3">
                <span>⚡</span> Mega Menu
              </div>
              <span className={`transition-transform duration-300 ${isProjectOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isProjectOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-white/20">
                <Link 
                  to="/admin/mega-menu" 
                  className={`flex items-center gap-3 p-2 pl-6 text-[12px] rounded-r-lg transition-all ${isActive('/admin/mega-menu')}`}
                >
                  Manage Mega Menu
                </Link>
              </div>
            )}
          </div>

          {/* ✅ ৩. Career Page Parent Menu */}
          <div>
            <button 
              onClick={() => setIsCareerOpen(!isCareerOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center gap-3 text-[16px]">
                <span>💼</span> Career Page
              </div>
              <span className={`transition-transform duration-300 ${isCareerOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isCareerOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
                <Link to="/admin/careers" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/careers')}`}>Manage Openings</Link>
              </div>
            )}
          </div>

          {/* ✅ ৪. Blog Page Parent Menu */}
          <div>
            <button 
              onClick={() => setIsBlogOpen(!isBlogOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center gap-3 text-[14px]">
                <span>📝</span> Blog Page
              </div>
              <span className={`transition-transform duration-300 ${isBlogOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isBlogOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
                <Link to="/admin/blogs" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/blogs')}`}>Manage Blogs</Link>
              </div>
            )}
          </div>

          {/* ✅ ৫. Product Page Parent Menu */}
          <div>
            <button 
              onClick={() => setIsProductOpen(!isProductOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center gap-3 text-[14px] text-white">
                <span>📦</span> Product Page
              </div>
              <span className={`transition-transform duration-300 ${isProductOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isProductOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
                <Link to="/admin/product" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/product')}`}>Manage Products</Link>
              </div>
            )}
          </div>

          {/* ✅ ৬. Portfolio/Project Page Parent Menu */}
          <div>
            <button 
              onClick={() => setIsProjectOpen(!isProjectOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
            >
              <div className="flex items-center gap-3 text-[14px]">
                <span>💼</span> Portfolio Page
              </div>
              <span className={`transition-transform duration-300 ${isProjectOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isProjectOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
                <Link to="/admin/projects" className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all ${isActive('/admin/projects')}`}>Manage Projects</Link>
              </div>
            )}
          </div>

{/* ✅ ৭. Pricing Page Parent Menu (With Nested Sub-menus) */}
<div>
  <button 
    onClick={() => setIsPricingOpen(!isPricingOpen)}
    className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
  >
    <div className="flex items-center gap-3 text-[14px]">
      <span>💰</span> Pricing Strategy
    </div>
    <span className={`text-[10px] transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`}>
      ▼
    </span>
  </button>

  {isPricingOpen && (
    <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
      
      {/* Sub-menu 1: Manage Pricing */}
      <Link 
        to="/admin/pricing" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/pricing') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span>•</span> Manage Pricing
      </Link>

      {/* Sub-menu 2: Technical Edge */}
      <Link 
        to="/admin/technical-edge" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/technical-edge') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span>•</span> Technical Edge
      </Link>

      {/* Sub-menu 3: Service Ecosystem */}
      <Link 
        to="/admin/service-ecosystem" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/service-ecosystem') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span>•</span> Service Ecosystem
      </Link>

      {/* ✅ Sub-menu 4: Agency Comparison (নতুন অ্যাড করা হলো) */}
      <Link 
        to="/admin/agency-comparison" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/agency-comparison') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span>•</span> Agency Comparison
      </Link>

    </div>
  )}
</div>

{/* ✅ ৮. SEO Dynamic Pages Parent Menu */}
<div className="mt-2">
  <button 
    onClick={() => setIsSEOOpen(!isSEOOpen)}
    className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
  >
    <div className="flex items-center gap-3 text-[14px]">
      <span className="text-[#F7A400]">🌍</span> SEO Dynamic 
    </div>
    <span className={`text-[10px] transition-transform duration-300 ${isSEOOpen ? 'rotate-180' : ''}`}>
      ▼
    </span>
  </button>

  {isSEOOpen && (
    <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
      <Link 
        to="/admin/other-pages" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${location.pathname === '/admin/other-pages' ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span className="opacity-50">•</span> Manage SEO 
      </Link>
    </div>
  )}
</div>

{/* ✅ ৯. Settings & Security Parent Menu */}
<div className="mt-2 border-t border-gray-800 pt-2">
  <button 
    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
    className="w-full flex items-center justify-between p-3 rounded-lg text-white hover:bg-gray-800 transition-all font-semibold"
  >
    <div className="flex items-center gap-3 text-[14px]">
      <span className="text-[#F7A400]">⚙️</span> Settings
    </div>
    <span className={`text-[10px] transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`}>
      ▼
    </span>
  </button>

  {isSettingsOpen && (
    <div className="ml-6 mt-2 space-y-1 border-l border-gray-800">
      
      {/* 📊 GTM Configuration Link */}
      <Link 
        to="/admin/gtm-management" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/gtm-management') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span className={`text-[10px] ${isActive('/admin/gtm-management') ? 'opacity-100' : 'opacity-50'}`}>📊</span> 
        GTM Tracking
      </Link>

      {/* 🔍 Search Console Link */}
      <Link 
        to="/admin/seo-management" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/seo-management') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span className={`text-[10px] ${isActive('/admin/seo-management') ? 'opacity-100' : 'opacity-50'}`}>🔍</span> 
        Search Console
      </Link>

      {/* 🔒 Change Password Link */}
      <Link 
        to="/admin/settings/change-password" 
        className={`flex items-center gap-3 p-2 pl-6 text-[12px] text-white rounded-r-lg transition-all hover:bg-gray-800/50 ${isActive('/admin/settings/change-password') ? 'bg-gray-800 text-[#F7A400] font-bold border-l-2 border-[#F7A400]' : ''}`}
      >
        <span className={`text-[10px] ${isActive('/admin/settings/change-password') ? 'opacity-100' : 'opacity-50'}`}>🔒</span> 
        Change Password
      </Link>

    </div>
    
  )}
  
</div>

{/* ✅ ১০. Floating Contact (সম্পূর্ণ আলাদা মেনু - সেটিংস এর বাইরে) */}
<div className="mt-1">
  <Link 
    to="/admin/home/floating-contact" 
    className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition-all text-[12px] 
      ${location.pathname === '/admin/home/floating-contact' 
        ? 'bg-[#F7A400] text-black shadow-lg shadow-[#F7A400]/20' 
        : 'text-white hover:bg-gray-800 hover:text-[#F7A400]'}`}
  >
    <span className="text-[16px]">🔘</span> 
    Floating Contact
  </Link>
</div>

          <Link to="/admin/home/contacts" className={`flex items-center gap-3 p-3 rounded-lg font-semibold transition-all text-white text-[12px] ${isActive('/admin/home/contacts')}`}>
            <span>📩</span> Client Messages
          </Link>

          <Link to="/admin/job-applications" className={`flex items-center gap-3 p-3 rounded-lg font-semibold transition-all text-white text-[12px] ${isActive('/admin/job-applications')}`}>
            <span>📑</span> Job Applications
          </Link>

          <Link to="/admin/services" className={`flex items-center gap-3 p-3 rounded-lg font-semibold transition-all text-white text-[12px] ${isActive('/admin/services')}`}>
            <span>🛠️</span> All Services
          </Link>
          
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-3 text-[#00f746] hover:bg-red-500/10 rounded-lg transition-all font-bold text-[14px]"
        >
          <span>🚪</span> Logout Session
        </button>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-[#050910]/80 backdrop-blur-md border-b border-gray-800 p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Dashboard /</span>
            <span className="text-[#F7A400] capitalize">
              {location.pathname.split('/').pop().replace('-', ' ') || 'Overview'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[10px] text-green-500">Active Now</p>
            </div>
            <div className="w-10 h-10 bg-[#F7A400] rounded-full flex items-center justify-center text-black font-bold">A</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-0"> 
          <div className="w-full min-h-screen text-black">
            <Outlet /> 
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;