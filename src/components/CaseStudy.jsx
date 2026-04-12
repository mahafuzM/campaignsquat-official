import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CaseStudy = () => {
  // ১. ইনস্ট্যান্ট ডাটা: সেশন স্টোরেজ থেকে ডাটা নিয়ে শুরু করা
  const [dbData, setDbData] = useState(() => {
    const saved = sessionStorage.getItem('cached_home_projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  // যদি আগে থেকে ডাটা থাকে, তবে লোডিং দেখাবে না (০ সেকেন্ড ল্যাগ)
  const [loading, setLoading] = useState(dbData.length === 0);
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // যদি মেমরিতে ডাটা না থাকে শুধু তখনই লোডিং ট্রু হবে
        if (dbData.length === 0) setLoading(true);
        
        const res = await axios.get(`${BASE_URL}/api/projects`); 
        
        if (res.data && Array.isArray(res.data)) {
          // লেটেস্ট ডাটা সবার আগে রাখার জন্য সর্টিং
          const sortedData = [...res.data].sort((a, b) => 
            b._id.toString().localeCompare(a._id.toString())
          );
          
          setDbData(sortedData);
          sessionStorage.setItem('cached_home_projects', JSON.stringify(sortedData));
        }
      } catch (err) {
        console.error("Error loading projects on Home Page:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ২. ফিল্টারিং লজিক (Memoized for speed)
  const featuredCases = useMemo(() => {
    if (!dbData.length) return [];

    const getLatestByCategory = (catName, limit = 1) => {
      return dbData.filter(p => p.category === catName).slice(0, limit);
    };

    return [
      ...getLatestByCategory("Website Development", 2),
      ...getLatestByCategory("Ecommerce Development", 1),
      ...getLatestByCategory("UI/UX Design", 1),
      ...getLatestByCategory("Software Development", 1),
      ...getLatestByCategory("Mobile App Development", 1)
    ];
  }, [dbData]);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x600?text=Campaignsquat";
    if (img.startsWith('http')) return img;
    const path = img.startsWith('/uploads') ? img : `/uploads/${img}`;
    return `${BASE_URL}${path}`;
  };

  // ডাটা না থাকা অবস্থায় খালি সেকশন না রেখে অন্তত ডিজাইনটা ধরে রাখা
  if (!loading && dbData.length === 0) return null;

  return (
    <section className="w-full bg-[#02050A] pt-12 pb-12 md:pb-24 md:px-16 font-['Poppins'] overflow-x-hidden">
      <div className="max-w-[1350px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-6 md:mb-8 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-white text-[16px] md:text-[18px] max-w-full md:max-w-6xl mx-auto leading-relaxed font-normal px-2">
            Where high-end UI/UX Design meets scalable Software Development. We build digital products engineered to accelerate your business growth.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 md:mb-20 px-2 sm:px-0">
          {/* ডাটা যদি লোড হতে থাকে তবে স্কেলিটন বা নাল না দেখিয়ে ক্যাশ ডাটা দেখাবে */}
          {featuredCases.map((item, index) => (
            <div 
              key={item._id}
              className="group bg-[#0A0A0A] border border-gray-900 flex flex-col overflow-hidden transition-all duration-500 hover:border-[#f7a400] rounded-[5px] hover:-translate-y-2 shadow-2xl"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111]">
                <img 
                  src={getImageUrl(item.imageUrl || item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  // ১ম ৩টা ইমেজ দ্রুত লোড হওয়ার জন্য eager লজিক
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#F7A400] text-black text-[10px] font-semibold px-3 py-1 rounded-sm ">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-8 text-center flex-grow flex flex-col">
                <h3 className="text-white text-[20px] md:text-[22px] font-semibold mb-4 tracking-tighter group-hover:text-[#F7A400] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-white text-[14px] md:text-[15px] leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto">
                <Link
                  to={`/projects/${item.fullName}`} 
                  className="bg-[#F7A400] text-black hover:bg-[#02050a] hover:text-white font-semibold py-3 text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 w-full tracking-tighter border-2 border-[#f7a400]"
                >
                  Read More <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Link to="/our-projects">
            <button className="bg-[#F7A400] rounded-[5px] text-black hover:bg-[#02050a] hover:text-white font-semibold py-2 px-8 md:px-10 text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 w-full tracking-tighter border-2 border-[#f7a400]">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;