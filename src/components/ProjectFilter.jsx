import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchX } from "lucide-react";

// ✅ Global Axios Setup
axios.defaults.baseURL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://api.campaignsquat.com";

const ProjectFilter = () => {
  const [cases, setCases] = useState(() => {
    try {
      const saved = sessionStorage.getItem("cached_projects");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(cases.length === 0);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeProjectTab") || "All";
  });

  const API_BASE = axios.defaults.baseURL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (cases.length === 0) setLoading(true);
        const res = await axios.get(`/api/projects`, { timeout: 10000 });

        if (res.data && Array.isArray(res.data)) {
          const sortedData = [...res.data].sort((a, b) => 
            b._id.toString().localeCompare(a._id.toString())
          );
          setCases(sortedData);
          setError(null);
          sessionStorage.setItem("cached_projects", JSON.stringify(sortedData));
        }
      } catch (err) {
        console.error("Critical Fetch Error:", err);
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [cases.length]);

  useEffect(() => {
    sessionStorage.setItem("activeProjectTab", activeTab);
  }, [activeTab]);

  const filteredCases = useMemo(() => {
    if (!Array.isArray(cases)) return [];
    return activeTab === "All"
      ? cases
      : cases.filter((item) => item.category === activeTab);
  }, [activeTab, cases]);

  const categories = [
    "All",
    "Website Development",
    "Ecommerce Development",
    "UI/UX Design",
    "Software Development",
    "Mobile App Development",
  ];

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x600?text=No+Image";
    if (img.startsWith("http")) return img;
    const cleanPath = img.replace(/\\/g, "/");
    const fileName = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    const finalPath = fileName.startsWith('uploads/') ? fileName : `uploads/${fileName}`;
    return `${API_BASE}/${finalPath}`;
  };

  if (loading && cases.length === 0) {
    return (
      <section className="w-full bg-[#02050A] pt-20 pb-20 px-4 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-[#0A0A0A] border border-gray-900 rounded-[5px] h-[450px] animate-pulse">
              <div className="w-full h-[250px] bg-gray-800/20" />
              <div className="p-8 space-y-4">
                <div className="h-4 bg-gray-800/40 w-1/4 mx-auto" />
                <div className="h-8 bg-gray-800/40 w-full" />
                <div className="h-12 bg-gray-800/40 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#02050A] pt-10 md:pt-20 font-['Poppins'] pb-20 min-h-screen">
      <div className="max-w-[1445px] mx-auto px-4 md:px-14">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-14 w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 text-[12px] md:text-[14px] font-semibold transition-all border rounded-[2px] ${
                activeTab === category
                  ? "bg-[#F7A400] border-[#F7A400] text-black shadow-[0_10px_20px_rgba(247,164,0,0.2)]"
                  : "bg-transparent border-gray-800 text-white hover:border-[#F7A400]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid - CaseStudy Style Applied */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCases.map((item, index) => (
              <div 
                key={item._id} 
                className="group bg-[#0A0A0A] border border-gray-900 flex flex-col overflow-hidden transition-all duration-500 hover:border-[#f7a400] rounded-[5px] hover:-translate-y-2 shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111]">
                  <img
                    src={getImageUrl(item.imageUrl || item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    loading={index < 3 ? "eager" : "lazy"}
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found"; 
                    }}
                  />
                  {/* Category Badge - Top Left like CaseStudy */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F7A400] text-black text-[10px] font-semibold px-3 py-1 rounded-sm ">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section - Text Center like CaseStudy */}
                <div className="p-8 text-center flex-grow flex flex-col">
                  <h3 className="text-white text-[20px] md:text-[22px] font-semibold mb-4 tracking-tighter group-hover:text-[#F7A400] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-white text-[14px] md:text-[15px] leading-relaxed line-clamp-3 mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Button Section - Full Width Read More */}
                <div className="mt-auto">
                  <Link
                    to={`/projects/${item.fullName}`}
                    className="bg-[#F7A400] text-black hover:bg-[#02050a] hover:text-white font-semibold py-2 text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 w-full tracking-tighter border-2 border-[#f7a400]"
                  >
                    Read More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-800 rounded-lg bg-[#0A0A0A]/50">
            <SearchX size={60} className="text-gray-600 mb-6" />
            <p className="text-white text-xl font-medium">
              {error ? "Server connection failed!" : "No projects found in this category."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectFilter;