import React, { useState, useEffect } from "react";
import axios from "axios";
/* ১. স্ট্যাটিক ফলব্যাক ইমেজ */
import heroImg from "../assets/images/pexels-fauxels-3184421.jpg";

const AboutHero = () => {
  // ডাইনামিক বেস ইউআরএল (axios থেকে নেওয়া)
  

  // ২. ডাইনামিক কন্টেন্ট স্টেট
  const [content, setContent] = useState({
    title: "Digital Excellence, Engineered.\nEmpowering Brands Through Innovation",
    description: "We don't merely build software; we engineer scalable digital experiences that drive measurable business growth. As your strategic technology partner, we transform complex challenges into seamless, user-centric solutions that dominate the market.",
    imageUrl: heroImg,
  });

  // ৩. ডাটাবেস থেকে ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // এখানে সরাসরি এন্ডপয়েন্ট ব্যবহার করুন, যেহেতু app.jsx-এ baseURL সেট করা আছে
        const res = await axios.get("/api/about-content/hero");
        
        if (res.data && res.data.title) {
          // ইমেজের পাথ ক্লিনিং (যাতে ডাবল স্লাশ না হয়)
          const rawPath = res.data.imageUrl || "";
          const cleanPath = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;

          setContent({
            title: res.data.title,
            description: res.data.description,
            imageUrl: res.data.imageUrl 
              ? `/${cleanPath}` 
              : heroImg,
          });
        }
      } catch (err) {
        console.error("Backend Error:", err);
        console.log("Using static content due to connection issue.");
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section className="w-full bg-[#050505] pt-10 md:pt-[100px] pb-10 md:pb-16 px-6 md:px-10 lg:px-16 font-poppins overflow-hidden">
      <style>{`
        @keyframes rotate-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .running-border-wrapper {
          position: relative;
          padding: 2px;
          overflow: hidden;
          width: 100%;
          display: flex;
          justify-content: center;
          transition: all 0.5s ease;
        }
        .running-border-line {
          position: absolute;
          width: 300%;
          height: 300%;
          top: -100%;
          left: -100%;
          background: conic-gradient(transparent, transparent, transparent, #F7A400);
          animation: rotate-border 5s linear infinite;
          z-index: 0;
        }
        .inner-img-box {
          position: relative;
          z-index: 1;
          background: #050505;
          width: 100%;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-[1250px] mx-auto flex flex-col items-center">
        {/* ৪. ডাইনামিক টাইটেল - whitespace-pre-line ব্যবহার করা হয়েছে */}
        <h1 className="text-white text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center mb-6 md:mb-10 max-w-[1000px] leading-[1.2] md:leading-tight whitespace-pre-line tracking-tight">
          {content.title}
        </h1>

        {/* ৫. ডাইনামিক ডেসক্রিপশন */}
        <p className="text-white/80 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center mb-8 md:mb-14 max-w-[800px] leading-relaxed">
          {content.description}
        </p>

        {/* ৬. ডাইনামিক ইমেজ সেকশন */}
        <div className="w-full running-border-wrapper rounded-[15px] shadow-[0_25px_60px_-15px_rgba(247,164,0,0.2)] border border-white/5">
          <div className="running-border-line"></div>

          <div className="inner-img-box rounded-[13px] h-[200px] sm:h-[300px] md:h-[450px] lg:h-[550px]">
            <img
              src={content.imageUrl}
              alt="Campaignsquat Digital"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s] ease-in-out"
              onError={(e) => {
                e.target.src = heroImg;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;