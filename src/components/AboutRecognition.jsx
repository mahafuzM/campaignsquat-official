import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutRecognition = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ডাটাবেস থেকে সব ডাটা নিয়ে আসা হচ্ছে
    axios.get('http://localhost:5000/api/about-recognition')
      .then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch(err => console.log("Data fetch error:", err));
  }, []);

  // ডাটা না আসা পর্যন্ত যাতে এরর না দেয়
  if (!data) return null;

  return (
    <section className="w-full bg-[#02050A] py-16 md:py-24 font-poppins overflow-hidden pt-4 md:pt-6">
      <div className="max-w-[1445px] mx-auto px-2 sm:px-10 md:px-16 lg:px-24">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Dynamic Image from Backend */}
          <div className="w-full lg:w-[45%]">
            <div className="w-full h-[280px] sm:h-[300px] md:h-[400px] lg:h-[620px] overflow-hidden rounded-[5px] border border-white/10 shadow-2xl">
              <img 
                src={`http://localhost:5000${data.image}`} 
                alt="Our Recognition" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Text Content */}
          <div className="w-full lg:w-[50%] flex flex-col">
            {/* Dynamic Headline (H2) */}
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8 md:mb-12 tracking-tight leading-tight text-center lg:text-left">
              {data.mainTitle}
            </h2>

            <div className="flex flex-col">
              {/* Dynamic List Items (H3 and P) */}
              {data.platforms && data.platforms.map((item, index) => (
                <div 
                  key={index} 
                  className="py-6 md:py-8 border-b border-white last:border-none group"
                >
                  {/* Platform Name (H3) */}
                  <h3 className="text-white font-bold text-[26px] md:text-[36px] lg:text-[44px] mb-2 md:mb-4 tracking-tighter group-hover:text-[#F7A400] transition-all duration-300">
                    {item.platform}
                  </h3>
                  {/* Description (P) */}
                  <p className="text-white font-medium text-[14px] md:text-[16px] lg:text-[18px] leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutRecognition;