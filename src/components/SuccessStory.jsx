import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

// ✅ ডাইনামিক বেস ইউআরএল সেটআপ
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://api.campaignsquat.com";

const SuccessStory = () => {
  const [data, setData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ হার্ডকোডেড লিঙ্কের বদলে BASE_URL ব্যবহার
        const res = await axios.get(`${BASE_URL}/api/success-story`);
        if (res.data) setData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const stories = useMemo(() => {
    return data?.stories || [];
  }, [data]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = isMobile ? stories.length : Math.ceil(stories.length / 2);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const desktopGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < stories.length; i += 2) {
      groups.push(stories.slice(i, i + 2));
    }
    return groups;
  }, [stories]);

  if (!data) return null;

  return (
    <section
      className="w-full py-12 md:py-20 px-2 md:px-12 font-['Poppins'] overflow-hidden"
      style={{ backgroundColor: data.sectionBg || "#0A0A0A" }}
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[28px] md:text-[36px] lg:text-[45px] font-bold text-white mb-4">
            {data.sectionTitle || "Success Story"}
          </h2>
          <p className="text-white text-[16px] md:text-[20px] max-w-3xl mx-auto px-4">
            {data.sectionSubtitle ||
              "Real Results From The People Who Trust Us Most"}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {isMobile
              ? stories.map((item) => (
                  <div
                    key={item._id}
                    className="w-full shrink-0 px-2 md:px-4"
                    onClick={() => setSelectedVideo(item.videoUrl)}
                  >
                    <Card item={item} accentColor={data.accentColor} />
                  </div>
                ))
              : desktopGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 grid grid-cols-2 gap-6 px-2"
                  >
                    {group.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => setSelectedVideo(item.videoUrl)}
                      >
                        <Card item={item} accentColor={data.accentColor} />
                      </div>
                    ))}
                  </div>
                ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-[#f7a400]" : "w-2 bg-gray-600"
              }`}
              style={
                activeIndex === i
                  ? { backgroundColor: data.accentColor || "#f7a400" }
                  : {}
              }
            />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold z-10 hover:text-[#f7a400]"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <iframe
              className="w-full h-full"
              src={`${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

const Card = ({ item, accentColor }) => (
  <div className="bg-[#02050A] border border-gray-900 flex flex-col md:flex-row items-stretch transition-all duration-300 hover:border-[#f7a400] rounded-[5px] overflow-hidden h-full cursor-pointer group">
    <div className="w-full md:w-[40%] shrink-0 relative overflow-hidden">
      <img
        src={
          item.image
            ? item.image.startsWith("http")
              ? item.image
              // ✅ এখানে BASE_URL ব্যবহার করা হয়েছে
              : `${BASE_URL}${item.image.startsWith("/") ? "" : "/"}${item.image}`
            : ""
        }
        alt={item.name}
        className="w-full h-[220px] md:h-full md:min-h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-all">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-125"
          style={{ backgroundColor: accentColor || "#f7a400" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="black"
            className="md:w-6 md:h-6"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="flex flex-col w-full p-5 md:p-8 justify-center overflow-hidden">
      <div
        className="flex gap-1 mb-2 md:mb-3"
        style={{ color: accentColor || "#f7a400" }}
      >
        {[...Array(item.rating || 5)].map((_, i) => (
          <span key={i} className="text-sm md:text-lg">
            ★
          </span>
        ))}
      </div>

      <p className="text-white text-[14px] md:text-[18px] leading-relaxed mb-4 whitespace-normal break-words overflow-hidden ">
        "{item.feedback}"
      </p>

      <div
        className="w-12 md:w-20 h-[0.5px] mb-4 md:mb-5"
        style={{ backgroundColor: accentColor || "#f7a400" }}
      ></div>
      <div className="overflow-hidden">
        <h4 className="text-white text-[16px] md:text-[18px] font-bold group-hover:text-[#f7a400] transition-colors truncate">
          {item.name}
        </h4>
        <p className="text-white text-[11px] md:text-[14px] font-medium mt-1 tracking-wider break-words opacity-80">
          {item.role} | {item.company}
        </p>
      </div>
    </div>
  </div>
);

export default SuccessStory;