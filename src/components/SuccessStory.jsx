import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const SuccessStory = () => {
  const [data, setData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/success-story`);
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
    <section className="relative w-full bg-[#000000] py-10 md:py-16 font-['Poppins'] overflow-hidden border-t border-white/5">
      {/* Ambient Background Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] bg-[#00ffd1]/10 rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[160px] opacity-20"></div>
        
        {/* Subtle Dots Background */}
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(0, 255, 209, 0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1350px] mx-auto relative z-10 px-4">
        <div className="text-center mb-12 md:mb-16 px-2 flex flex-col items-center">
          <h2 className="text-[32px] md:text-[45px] lg:text-[50px] font-extrabold tracking-tight leading-tight text-white mb-2">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">Story</span>
          </h2>
          <div className="w-24 h-1 bg-[#F7A400] mt-4 rounded-full shadow-[0_0_10px_#F7A400]"></div>
          <p className="text-white/60 text-[15px] sm:text-[16px] md:text-[18px] mt-6 max-w-[95%] md:max-w-3xl leading-relaxed font-medium">
            {data.sectionSubtitle ||
              "Real Results From The People Who Trust Us Most"}
          </p>
        </div>

        <div className="relative overflow-hidden w-[100vw] xl:w-full -ml-4 xl:ml-0">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {isMobile
              ? stories.map((item) => (
                  <div
                    key={item._id}
                    className="w-full shrink-0 px-4 py-4"
                    onClick={() => setSelectedVideo(item.videoUrl)}
                  >
                    <Card item={item} accentColor={data.accentColor} />
                  </div>
                ))
              : desktopGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 grid grid-cols-2 gap-8 px-4 xl:px-0 py-4"
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

        <div className="flex justify-center items-center gap-3 mt-12 bg-[#050505]/50 backdrop-blur-md rounded-full w-fit mx-auto px-6 py-3 border border-white/5">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                activeIndex === i ? "w-10 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] shadow-[0_0_10px_rgba(247,164,0,0.5)]" : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[24px] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,255,209,0.15)]">
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-[#f7a400] bg-black/50 p-3 rounded-full border border-white/10 hover:border-[#f7a400]/50 transition-colors z-[10000]"
              onClick={() => setSelectedVideo(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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

const Card = ({ item, accentColor }) => (
  <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-stretch transition-all duration-500 hover:border-[#00ffd1]/40 rounded-[24px] overflow-hidden h-full cursor-pointer group hover:shadow-[0_20px_40px_rgba(0,255,209,0.1)] hover:-translate-y-2 relative">
    
    {/* Inner glowing hover effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/5 group-hover:to-[#F7A400]/5 transition-colors duration-500 z-0"></div>

    <div className="w-full md:w-[45%] shrink-0 relative overflow-hidden bg-black z-10 border-b md:border-b-0 md:border-r border-white/5">
      <img
        src={
          item.image
            ? item.image.startsWith("http")
              ? item.image
              : `${(axios.defaults.baseURL || "")}${item.image.startsWith("/") ? "" : "/"}${item.image}`
            : ""
        }
        alt={item.name}
        className="w-full h-[250px] md:h-full md:min-h-[300px] object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-all duration-500">
        <div className="relative">
          {/* Ping glow behind play button */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] rounded-full animate-ping opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300"></div>
          
          <div
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110 bg-gradient-to-br from-[#F7A400] to-[#ffd670] border border-white/20"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              className="md:w-7 md:h-7 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col w-full p-6 md:p-8 justify-center overflow-hidden relative z-10">
      <div
        className="flex gap-1.5 mb-4"
      >
        {[...Array(item.rating || 5)].map((_, i) => (
          <span key={i} className="text-[16px] md:text-[20px] text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] to-[#ffd670] drop-shadow-[0_0_5px_rgba(247,164,0,0.5)]">
            ★
          </span>
        ))}
      </div>

      <p className="text-white/80 group-hover:text-white text-[15px] md:text-[16px] leading-relaxed mb-6 whitespace-normal break-words overflow-hidden font-medium italic transition-colors duration-300">
        "{item.feedback}"
      </p>

      <div className="mt-auto">
        <div
          className="w-12 h-1 mb-5 rounded-full bg-gradient-to-r from-[#F7A400] to-[#00ffd1]"
        ></div>
        <div className="overflow-hidden">
          <h4 className="text-white text-[18px] md:text-[20px] font-extrabold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1] transition-all duration-300 truncate">
            {item.name}
          </h4>
          <p className="text-white/60 text-[13px] md:text-[14px] font-semibold mt-1.5 tracking-wider break-words uppercase">
            {item.role} <span className="text-[#F7A400] mx-1">•</span> {item.company}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SuccessStory;
