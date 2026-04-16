import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutGallery = () => {
  const [dbImages, setDbImages] = useState([]);

  // app.jsx থেকে আসা বেইজ URL
  const API_BASE = axios.defaults.baseURL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // সরাসরি এন্ডপয়েন্ট ব্যবহার করা হয়েছে
        const res = await axios.get("/api/about-gallery");
        
        // ডাটা ফরম্যাট চেক করা
        const imageData = res.data.images || res.data;
        if (Array.isArray(imageData) && imageData.length > 0) {
          setDbImages(imageData);
        }
      } catch (err) {
        console.log("Error fetching gallery images, check API or Server.");
      }
    };
    fetchImages();
  }, []);

  // ইমেজ না থাকলে সেকশনটি দেখাবে না
  if (!dbImages || dbImages.length === 0) return null;

  return (
    <section className="w-full bg-[#0A0A0A] py-16 md:py-24 font-poppins overflow-hidden pt-4 md:pt-6">
      <style>
        {`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-infinite { display: flex; width: max-content; animation: marquee 40s linear infinite; gap: 24px; }
        `}
      </style>

      <div className="max-w-[1445px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee-infinite items-center">
            {/* দুইবার ম্যাপ করা হয়েছে যাতে লুপটা সিমেলেস হয় */}
            {[...dbImages, ...dbImages].map((item, index) => {
              // ইমেজ পাথ হ্যান্ডেলিং
              const imgPath = typeof item === "string" ? item : item.url;
              
              // ক্লিনিং স্লাশ
              const cleanPath = imgPath?.startsWith("/") ? imgPath : `/${imgPath}`;
              
              // ফুল ইউআরএল তৈরি
              const fullUrl = imgPath?.startsWith("http")
                ? imgPath
                : `${API_BASE}${cleanPath}`;

              return (
                <div
                  key={index}
                  className={`shrink-0 overflow-hidden shadow-xl rounded-lg ${
                    index % 2 === 0
                      ? "w-[300px] h-[400px]"
                      : "w-[300px] h-[480px]"
                  }`}
                >
                  <img
                    src={fullUrl}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=Campaignsquat+Image";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGallery;