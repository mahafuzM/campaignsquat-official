import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CaseStudy = () => {
  const [dbData, setDbData] = useState(() => {
    const saved = sessionStorage.getItem("cached_home_projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(dbData.length === 0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (dbData.length === 0) setLoading(true);
        const res = await axios.get(`/api/projects`);

        if (res.data && Array.isArray(res.data)) {
          const sortedData = [...res.data].sort((a, b) =>
            b._id.toString().localeCompare(a._id.toString()),
          );
          setDbData(sortedData);
          sessionStorage.setItem(
            "cached_home_projects",
            JSON.stringify(sortedData),
          );
        }
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [dbData.length]);

  const featuredCases = useMemo(() => {
    if (!dbData.length) return [];
    const getLatestByCategory = (catName, limit = 1) => {
      return dbData.filter((p) => p.category === catName).slice(0, limit);
    };
    const filtered = [
      ...getLatestByCategory("Website Development", 2),
      ...getLatestByCategory("Ecommerce Development", 1),
      ...getLatestByCategory("UI/UX Design", 1),
      ...getLatestByCategory("Software Development", 1),
      ...getLatestByCategory("Mobile App Development", 1),
    ];
    return filtered.length > 0 ? filtered : dbData.slice(0, 6);
  }, [dbData]);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x600?text=No+Image";

    if (img.startsWith("http")) return img;

    const cleanPath = img.replace(/\\/g, "/");
    const fileName = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;

    const finalPath = fileName.startsWith("uploads/")
      ? fileName
      : `uploads/${fileName}`;

    return `/${finalPath}`;
  };

  if (!loading && dbData.length === 0) return null;

  return (
    <section className="w-full bg-[#000000] py-10 md:py-16 font-['Poppins'] overflow-x-hidden border-t border-white/5 relative">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[140px] opacity-30"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00ffd1]/10 rounded-full blur-[160px] opacity-20"></div>
        
        {/* Subtle Dots Background */}
        <div 
          className="absolute inset-0 opacity-[0.2]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(247, 164, 0, 0.4) 1px, transparent 1px)',
            backgroundSize: '35px 35px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 px-2">
          <h2 className="text-[32px] md:text-[45px] lg:text-[50px] font-extrabold tracking-tight leading-tight text-white mb-2">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-[#F7A400] mt-4 rounded-full shadow-[0_0_10px_#F7A400]"></div>
          <p className="text-[#aeb1b8] text-[15px] sm:text-[16px] md:text-[18px] max-w-[95%] md:max-w-3xl mx-auto leading-relaxed font-medium mt-6">
            Where high-end UI/UX Design meets scalable Software Development. We
            build digital products engineered to accelerate your business
            growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-20">
          {featuredCases.map((item, index) => (
            <div
              key={item._id}
              className="group relative bg-[#050505]/60 backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden transition-all duration-500 hover:border-[#00ffd1]/40 rounded-[24px] hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_rgba(0,255,209,0.1)]"
            >
              {/* Inner glowing hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/5 group-hover:to-[#F7A400]/5 transition-colors duration-500 z-0"></div>

              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111] z-10 border-b border-white/5 flex-shrink-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img
                  src={getImageUrl(item.imageUrl || item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  loading={index < 3 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600?text=No+Image+Found";
                  }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#050505]/60 backdrop-blur-md border border-white/20 text-[#00ffd1] text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-8 text-center flex-grow flex flex-col relative z-10">
                <h3 className="text-white text-[20px] md:text-[22px] font-extrabold mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1] transition-all duration-300 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-white/50 group-hover:text-white/70 text-[14px] md:text-[15px] font-medium leading-relaxed line-clamp-3 mb-6 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto relative z-10 p-6 pt-0">
                <Link
                  to={`/projects/${item.fullName}`}
                  className="group/btn relative overflow-hidden w-full bg-white/5 backdrop-blur-sm text-white hover:text-[#000000] text-[14px] md:text-[15px] font-bold py-3.5 border border-white/10 hover:border-[#F7A400] transition-all rounded-[14px] shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Read More <span>→</span>
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#F7A400] to-[#ffd670] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/our-projects">
            <button className="group relative overflow-hidden bg-[#050505] text-[#F7A400] text-[15px] sm:text-[16px] font-bold py-3.5 px-10 rounded-full border border-[#F7A400]/30 transition-all duration-300 hover:border-[#F7A400]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                View All Projects
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-[#F7A400]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer { animation: textShimmer 4s linear infinite; }
      `}</style>
    </section>
  );
};

export default CaseStudy;
