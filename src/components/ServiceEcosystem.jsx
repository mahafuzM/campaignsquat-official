import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ রিয়্যাক্ট রাউটার ব্যবহার করলে এটা লাগবে

const ServiceEcosystem = () => {
  const [data, setData] = useState(() => {
    const saved = sessionStorage.getItem('cached_creative_services');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(!data);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/creative-services`);
        if (res.data) {
          setData(res.data);
          sessionStorage.setItem('cached_creative_services', JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ পারফেক্ট লিঙ্ক হ্যান্ডলার ফাংশন
  const renderLink = (service, index) => {
    const url = service.url?.trim() || "#";
    
    // ১. যদি লিঙ্কটি বাইরের হয় (http দিয়ে শুরু হয়)
    const isExternal = url.startsWith('http');
    
    // ২. কমন স্টাইল
    const commonClass = "flex items-center gap-4 group/item transition-all duration-300 hover:translate-x-3 cursor-pointer";

    const content = (
      <>
        <div className="flex-shrink-0">
          <CheckCircle2 
            size={20} 
            className="text-[#F7A400] drop-shadow-[0_0_10px_rgba(247,164,0,0.6)] group-hover/item:scale-125 transition-transform" 
          />
        </div>
        <span className="text-white text-[14px] md:text-[16px] font-semibold tracking-tight group-hover/item:text-white transition-colors">
          {service.name}
        </span>
      </>
    );

    if (isExternal) {
      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={commonClass}>
          {content}
        </a>
      );
    }

    return (
      <Link key={index} to={url} className={commonClass}>
        {content}
      </Link>
    );
  };

  if (!data && loading) return null;

  return (
    <section className="bg-[#02050A] py-24 relative overflow-hidden font-Inter selection:bg-[#F7A400] selection:text-black">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F7A400]/10 rounded-full blur-[140px] pointer-events-none opacity-60"></div>
      
      <div className="max-w-[1440px] mx-auto px-2 md:px-12 lg:px-16 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white tracking-tighter leading-tight mb-4 ">
            {data?.sectionTitle || "All Our Creative Services Included"}
          </h2>
          <div className="h-[2px] w-24 bg-[#F7A400] mx-auto mt-6 rounded-full shadow-[0_0_15px_#F7A400]"></div>
        </div>

        <div className="p-[1px] rounded-[5px] bg-gradient-to-r from-[#F7A400]/60 via-white/20 to-[#F7A400]/40 overflow-hidden group">
          <div className="bg-[#06080E]/95 backdrop-blur-xl rounded-[25px] p-8 md:p-16 lg:p-20 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#F7A400]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#F7A400]/15 transition-all duration-1000"></div>

            {/* ✅ সার্ভিস গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-12 relative z-10">
              {data?.services?.map((service, index) => renderLink(service, index))}
            </div>

            <div className="absolute inset-0  pointer-events-none"
                 style={{ backgroundImage: `radial-gradient(#F7A400 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .font-Inter { font-family: 'Inter', sans-serif; }
      `}} />
    </section>
  );
};

export default ServiceEcosystem;