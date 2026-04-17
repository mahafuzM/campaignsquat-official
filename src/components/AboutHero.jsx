import React, { useState, useEffect } from "react";
import axios from "axios";
/* ১. স্ট্যাটিক ফলব্যাক ইমেজ */
import heroImg from "../assets/images/pexels-fauxels-3184421.jpg";

const AboutHero = () => {
  // ডাইনামিক বেস ইউআরএল (axios থেকে নেওয়া)
  

  // ২. ডাইনামিক কন্টেন্ট স্টেট
  const [content, setContent] = useState({
    title: "About Campaignsquat Ltd. \n Empowering Brands Through Digital Innovation",
    description: "We don't just build digital products; we craft experiences that drive growth. We are a full-service digital agency dedicated to transforming complex challenges into seamless, user-centric solutions.",
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
    <section className="w-full bg-[#050505] pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-10 lg:px-16 font-poppins overflow-hidden">
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
        <h1 className="text-white text-[28px] md:text-[40px] lg:text-[48px] font-bold text-center mb-10 md:mb-14 max-w-[1000px] leading-[1.2] md:leading-tight whitespace-pre-line tracking-tight">
          {content.title}
        </h1>

        {/* ৫. ডাইনামিক ডেসক্রিপশন */}
        <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] text-center mb-12 md:mb-20 max-w-8xl leading-relaxed">
          {content.description}
        </p>

        {/* ৬. ডাইনামিক ইমেজ সেকশন */}
        <div className="w-full running-border-wrapper rounded-[15px] shadow-[0_25px_60px_-15px_rgba(247,164,0,0.2)] border border-white/5">
          <div className="running-border-line"></div>

          <div className="inner-img-box rounded-[13px] h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
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