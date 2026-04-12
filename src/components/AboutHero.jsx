import React, { useState, useEffect } from 'react';
import axios from 'axios';
/* ১. স্ট্যাটিক ফলব্যাক ইমেজ (যদি ডাটাবেসে ছবি না থাকে) */
import heroImg from '../assets/images/pexels-fauxels-3184421.jpg';

const AboutHero = () => {
  // ২. ডাইনামিক কন্টেন্ট স্টেট
  const [content, setContent] = useState({
    title: "About Campaignsquat Ltd. \n Empowering Brands Through Digital Innovation",
    description: "we don't just build digital products; we craft experiences that drive growth. We are a full-service digital agency dedicated to transforming complex challenges into seamless, user-centric solutions.",
    imageUrl: heroImg
  });

  // ৩. ডাটাবেস থেকে ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/about-content/hero');
        if (res.data && res.data.title) {
          setContent({
            title: res.data.title,
            description: res.data.description,
            // ইমেজ থাকলে সার্ভারের ফুল পাথ সহ সেট হবে, না থাকলে ফলব্যাক ইমেজ
            imageUrl: res.data.imageUrl ? `http://localhost:5000${res.data.imageUrl}` : heroImg
          });
        }
      } catch (err) {
        console.log("Using static content due to connection issue.");
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section className="w-full bg-[#050505] pt-10 md:pt-16 pb-16 md:pb-20 px- md:px-10 lg:px-16 font-poppins">
      
      {/* ডিজাইন এবং এনিমেশন একদম আগের মতোই আছে */}
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
        }
        .running-border-line {
          position: absolute;
          width: 300%;
          height: 300%;
          top: -100%;
          left: -100%;
          background: conic-gradient(transparent, transparent, transparent, #F7A400);
          animation: rotate-border 4s linear infinite;
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

      <div className="max-w-[1350px] mx-auto flex flex-col items-center">
        
        {/* ৪. ডাইনামিক টাইটেল (whitespace-pre-line ব্যবহার করা হয়েছে যাতে \n কাজ করে) */}
        <h1 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-center mb-10 md:mb-16 max-w-[1000px] leading-[1.2] md:leading-tight ">
          {content.title}
        </h1>

        {/* ৫. ডাইনামিক ডেসক্রিপশন */}
        <p className="text-white text-[16px] md:[18px] lg:text-[20px] text-center mb-10 md:mb-16 max-auto leading-relaxed">
          {content.description}
        </p>

        {/* ৬. ডাইনামিক ইমেজ সেকশন */}
        <div className="w-[100%] md:w-[95%] lg:w-full running-border-wrapper rounded-[10px] shadow-2xl border border-white/10">
          
          <div className="running-border-line"></div>

         <div className="inner-img-box rounded-[5px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
            <img 
              src={content.imageUrl} 
              alt="Campaignsquat Digital"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
              /* ইমেজ লোড না হলে ফলব্যাক দেখানোর জন্য */
              onError={(e) => { e.target.src = heroImg; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;