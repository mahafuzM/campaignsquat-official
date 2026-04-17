import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutTeam = () => {
  const [data, setData] = useState(null);

  // app.jsx থেকে আসা বেইজ URL
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // সরাসরি এন্ডপয়েন্ট ব্যবহার করা হয়েছে
        const res = await axios.get("/api/about-team");
        if (res.data) setData(res.data);
      } catch (err) {
        console.error("Error fetching CEO data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  // ইমেজ পাথ হ্যান্ডলিং
  const cleanImagePath = data.image?.startsWith('/') ? data.image : `/${data.image}`;
  const fullImageUrl = data.image?.startsWith('http') ? data.image : `${(axios.defaults.baseURL || "")}${cleanImagePath}`;

  return (
    <section className="w-full py-16 md:py-24 font-poppins overflow-hidden">
      {/* Container with max-w, dark background, and rounded corners */}
      <div className="max-w-[1350px] mx-auto bg-[#02050A]/60 border border-white/5 rounded-[5px] px-6 md:px-16 lg:px-24 py-10 md:py-16 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Image Section */}
          <div className="relative w-full max-w-[340px] md:max-w-[400px] shrink-0 pt-10 pl-10">
            {/* 1. Background Accent Shape */}
            <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#F7A400]/10 border border-[#F7A400]/20 rounded-[5px] z-0"></div>

            {/* 2. Main CEO Image with Border */}
            <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-[5px] border border-white/10 shadow-xl">
              <img
                src={fullImageUrl}
                alt={data.ceoName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x500?text=CEO+Profile";
                }}
              />
            </div>

            {/* 3. Floating Experience Badge */}
            <div className="absolute bottom-6 -right-4 bg-[#0A0A0A] px-6 py-4 rounded-[5px] shadow-[0_20px_50px_rgba(247,164,0,0.15)] z-20 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-10 bg-[#F7A400] rounded-[5px]"></div>
                <div>
                  <p className="text-[12px] text-white/70 font-semibold leading-none mb-1">
                    Experience
                  </p>
                  <p className="text-[12px] md:text-[18px] font-semibold text-white leading-none">
                    {data.experienceType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content Section */}
          <div className="flex-1 text-left">
            <div className="inline-block bg-[#F7A400]/10 text-[#F7A400] border border-[#F7A400]/20 px-6 py-2 rounded-[5px] text-[12px] md:text-[14px] font-semibold mb-6">
              {data.badgeText}
            </div>

            <h2 className="text-white text-[22px] md:text-[30px] lg:text-[32px] font-bold leading-tight mb-6">
              {data.mainTitle}{" "}
              <span className="text-[#F7A400]"> {data.highlightTitle}</span>
            </h2>

            <div className="mb-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 border-b border-white/10 pb-6">
              <span className="text-white font-semibold text-[18px] md:text-[20px]">
                {data.ceoName}
              </span>
              <span className="text-white/60 font-medium text-[12px] md:text-[14px] ">
                {data.ceoDesignation}
              </span>
            </div>

            {/* Main message with line break support */}
            <p className="text-white/80 text-[12px] md:text-[16px] leading-relaxed mb-10 max-w-[850px] whitespace-pre-line">
              {data.ceoMessage}
            </p>

            <div className="pt-2">
              <p className="text-white font-bold text-[14px] md:text-[18px] mt-2 md:mt-6 leading-none">
                {data.closingTitle}
              </p>
              <p className="text-white/70 text-[12px] md:text-[14px] mt-3 md:mt-6">
                {data.closingSub}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;