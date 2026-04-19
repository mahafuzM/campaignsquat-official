import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Info, Zap, Briefcase, FileText, Package, LayoutDashboard, 
  Settings, Globe, MessageSquare, LogOut, ChevronDown, PhoneCall, 
  ScrollText, DollarSign, Layers, Users, CircleDot, Settings2, Activity
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2.5 px-3 py-1.5 text-[12px] transition-all duration-200 group ${
      isActive 
        ? 'text-[#F7A400] font-medium bg-[#F7A400]/5 rounded-md' 
        : 'text-gray-400 hover:text-gray-100 hover:bg-[#1a1a1a] rounded-md'
    }`}
  >
    {Icon ? (
      <Icon size={14} className={isActive ? "text-[#F7A400]" : "text-gray-500 group-hover:text-gray-300"} />
    ) : (
      <CircleDot size={8} className={`ml-1 ${isActive ? "text-[#F7A400]" : "text-gray-600 group-hover:text-gray-400"}`} />
    )}
    <span className="truncate">{children}</span>
  </Link>
);

const SidebarGroup = ({ title, icon: Icon, isOpen, toggle, children }) => (
  <div className="mb-0.5">
    <button 
      onClick={toggle}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 ${
        isOpen ? 'bg-[#111] text-white' : 'text-gray-300 hover:bg-[#1a1a1a]'
      }`}
    >
      <div className="flex items-center gap-3 text-[13px] font-medium tracking-wide">
        <Icon size={16} className={isOpen ? "text-[#F7A400]" : "text-gray-500"} />
        {title}
      </div>
      <ChevronDown size={14} className={`transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
      <div className="ml-7 pl-1 space-y-0.5 border-l border-[#222]">
        {children}
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // User Profile State
  const [user, setUser] = useState({
    name: "System Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  });

  // Menu Open States
  const [openMenus, setOpenMenus] = useState({
    home: true,
    about: false,
    mega: false,
    career: false,
    blog: false,
    product: false,
    portfolio: false,
    pricing: false,
    seo: false,
    settings: false,
  });

  const toggleMenu = (key) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 🛡️ Auto-Logout & Session Check (10s interval)
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));

          // Update user state from token payload
          setUser({
            name: payload.name || "System Admin",
            avatar: payload.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          });

          const expiryTime = payload.exp * 1000; 
          const currentTime = Date.now();

          // Role Validation Check
          if (payload.role !== "admin" && payload.role !== "moderator") {
            console.warn("Security Alert: Non-admin token detected. Booting user...");
            handleLogout();
            return;
          }

          if (currentTime > expiryTime) {
            console.log("Session expired. Logging out...");
            handleLogout();
            alert("Security Alert: Your session has expired! Please login again.");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      } else {
        navigate('/admin-login');
      }
    };

    checkTokenExpiration(); // Initial check
    const interval = setInterval(checkTokenExpiration, 10000); 
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); 
    localStorage.removeItem('adminToken'); 
    navigate('/admin-login'); 
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-poppins selection:bg-[#F7A400] selection:text-black">
      
      {/* ERP Style Premium Compact Sidebar */}
      <aside className="w-[260px] bg-[#0a0a0a] border-r border-[#151515] flex flex-col sticky top-0 h-screen shadow-2xl">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-[#151515] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7A400] to-[#c78500] flex items-center justify-center shadow-[0_0_15px_rgba(247,164,0,0.2)]">
            <LayoutDashboard size={18} className="text-black" />
          </div>
          <div>
            <h2 className="text-white text-[14px] font-bold tracking-tight">CAMPAIGNSQUAT</h2>
            <p className="text-[9px] text-[#F7A400] uppercase tracking-[0.2em] font-bold">Admin Console</p>
          </div>
        </div>
        
        {/* Scrollable Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          
          <Link to="/admin" className={`flex items-center gap-3 px-3 py-2.5 mb-2 rounded-md transition-all duration-200 text-[13px] font-medium border border-transparent ${isActive('/admin') ? 'bg-[#F7A400]/10 text-[#F7A400] border-[#F7A400]/30 shadow-sm' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}>
            <Activity size={16} className={isActive('/admin') ? 'text-[#F7A400]' : 'text-gray-500'} />
            System Overview
          </Link>

          <SidebarGroup title="Home Page" icon={Home} isOpen={openMenus.home} toggle={() => toggleMenu('home')}>
            <SidebarLink to="/admin/home/hero" isActive={isActive('/admin/home/hero')}>Header Section</SidebarLink>
            <SidebarLink to="/admin/home/brands" isActive={isActive('/admin/home/brands')}>Brand Logos</SidebarLink>
            <SidebarLink to="/admin/home/about" isActive={isActive('/admin/home/about')}>About/Campaign</SidebarLink>
            <SidebarLink to="/admin/home/industries" isActive={isActive('/admin/home/industries')}>Industries Cards</SidebarLink>
            <SidebarLink to="/admin/home/work-process" isActive={isActive('/admin/home/work-process')}>Work Process</SidebarLink>
            <SidebarLink to="/admin/home/recent-projects" isActive={isActive('/admin/home/recent-projects')}>Recent Projects</SidebarLink>
            <SidebarLink to="/admin/home/success-stories" isActive={isActive('/admin/home/success-stories')}>Success Stories</SidebarLink>
            <SidebarLink to="/admin/home/faqs" isActive={isActive('/admin/home/faqs')}>Questions/FAQ</SidebarLink>
            <SidebarLink to="/admin/home/footer" isActive={isActive('/admin/home/footer')}>Footer Management</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="About Page" icon={Info} isOpen={openMenus.about} toggle={() => toggleMenu('about')}>
            <SidebarLink to="/admin/about/hero" isActive={isActive('/admin/about/hero')}>About Hero</SidebarLink>
            <SidebarLink to="/admin/about/vision" isActive={isActive('/admin/about/vision')}>About Vision</SidebarLink>
            <SidebarLink to="/admin/about/gallery" isActive={isActive('/admin/about/gallery')}>About Gallery</SidebarLink>
            <SidebarLink to="/admin/about/mission" isActive={isActive('/admin/about/mission')}>Mission & Vision</SidebarLink>
            <SidebarLink to="/admin/about/features" isActive={isActive('/admin/about/features')}>About Features</SidebarLink>
            <SidebarLink to="/admin/about/recognition" isActive={isActive('/admin/about/recognition')}>Global Recognition</SidebarLink>
            <SidebarLink to="/admin/about/team" isActive={isActive('/admin/about/team')}>CEO Message Edit</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Mega Menu" icon={Layers} isOpen={openMenus.mega} toggle={() => toggleMenu('mega')}>
            <SidebarLink to="/admin/mega-menu" isActive={isActive('/admin/mega-menu')}>Manage Mega Menu</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Career Page" icon={Briefcase} isOpen={openMenus.career} toggle={() => toggleMenu('career')}>
            <SidebarLink to="/admin/careers" isActive={isActive('/admin/careers')}>Manage Openings</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Blog Page" icon={FileText} isOpen={openMenus.blog} toggle={() => toggleMenu('blog')}>
            <SidebarLink to="/admin/blogs" isActive={isActive('/admin/blogs')}>Manage Blogs</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Product Page" icon={Package} isOpen={openMenus.product} toggle={() => toggleMenu('product')}>
            <SidebarLink to="/admin/product" isActive={isActive('/admin/product')}>Manage Products</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Portfolio Page" icon={ScrollText} isOpen={openMenus.portfolio} toggle={() => toggleMenu('portfolio')}>
            <SidebarLink to="/admin/projects" isActive={isActive('/admin/projects')}>Manage Projects</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Pricing Strategy" icon={DollarSign} isOpen={openMenus.pricing} toggle={() => toggleMenu('pricing')}>
            <SidebarLink to="/admin/pricing" isActive={isActive('/admin/pricing')}>Manage Pricing</SidebarLink>
            <SidebarLink to="/admin/technical-edge" isActive={isActive('/admin/technical-edge')}>Technical Edge</SidebarLink>
            <SidebarLink to="/admin/service-ecosystem" isActive={isActive('/admin/service-ecosystem')}>Service Ecosystem</SidebarLink>
            <SidebarLink to="/admin/agency-comparison" isActive={isActive('/admin/agency-comparison')}>Agency Comparison</SidebarLink>
          </SidebarGroup>

          <div className="my-3 border-t border-[#151515]"></div>

          <SidebarGroup title="SEO Dynamic" icon={Globe} isOpen={openMenus.seo} toggle={() => toggleMenu('seo')}>
            <SidebarLink to="/admin/other-pages" isActive={isActive('/admin/other-pages')}>Manage SEO Pages</SidebarLink>
          </SidebarGroup>

          <SidebarGroup title="Settings & Setup" icon={Settings2} isOpen={openMenus.settings} toggle={() => toggleMenu('settings')}>
            <SidebarLink to="/admin/gtm-management" isActive={isActive('/admin/gtm-management')}>GTM Tracking</SidebarLink>
            <SidebarLink to="/admin/seo-management" isActive={isActive('/admin/seo-management')}>Search Console</SidebarLink>
            <SidebarLink to="/admin/settings/change-password" isActive={isActive('/admin/settings/change-password')}>Change Credentials</SidebarLink>
          </SidebarGroup>

          <div className="my-3 border-t border-[#151515]"></div>

          <Link to="/admin/home/floating-contact" className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-[13px] font-medium border border-transparent ${isActive('/admin/home/floating-contact') ? 'bg-[#F7A400]/10 text-[#F7A400] border-[#F7A400]/30 shadow-sm' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}>
            <PhoneCall size={16} className={isActive('/admin/home/floating-contact') ? 'text-[#F7A400]' : 'text-gray-500'} />
            Floating Contact
          </Link>
          
          <Link to="/admin/home/contacts" className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-[13px] font-medium border border-transparent ${isActive('/admin/home/contacts') ? 'bg-[#F7A400]/10 text-[#F7A400] border-[#F7A400]/30 shadow-sm' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}>
            <MessageSquare size={16} className={isActive('/admin/home/contacts') ? 'text-[#F7A400]' : 'text-gray-500'} />
            Client Messages
          </Link>

          <Link to="/admin/job-applications" className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-[13px] font-medium border border-transparent ${isActive('/admin/job-applications') ? 'bg-[#F7A400]/10 text-[#F7A400] border-[#F7A400]/30 shadow-sm' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}>
            <Users size={16} className={isActive('/admin/job-applications') ? 'text-[#F7A400]' : 'text-gray-500'} />
            Job Applications
          </Link>

          <Link to="/admin/services" className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-[13px] font-medium border border-transparent ${isActive('/admin/services') ? 'bg-[#F7A400]/10 text-[#F7A400] border-[#F7A400]/30 shadow-sm' : 'text-gray-300 hover:bg-[#1a1a1a]'}`}>
            <Zap size={16} className={isActive('/admin/services') ? 'text-[#F7A400]' : 'text-gray-500'} />
            All Modules
          </Link>
          
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#151515] shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111] hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-md transition-all duration-300 text-[13px] font-medium border border-[#222] hover:border-red-500/30 group"
          >
            <LogOut size={16} className="group-hover:text-red-500 transition-colors" />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafafa]">
        <header className="bg-white border-b border-gray-200 p-4 px-6 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Console /</span>
            <span className="text-black text-sm font-bold capitalize">
              {location.pathname.split('/').pop().replace(/-/g, ' ') || 'Overview'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 tracking-tight">{user.name}</p>
              <div className="flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">Online</p>
              </div>
            </div>
            <img 
              src={user.avatar} 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-lg shadow-md border border-[#eee] object-cover bg-gray-100"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-0"> 
          <div className="w-full min-h-full h-auto text-black">
            <Outlet /> 
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;