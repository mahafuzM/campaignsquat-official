import React, { useState, useEffect } from "react";
import axios from "axios";
import { Play, X } from "lucide-react";

const Recent = () => {
  const [data, setData] = useState({ title: "", subtitle: "", projects: [] });
  const [activeVideo, setActiveVideo] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ শুধু এন্ডপয়েন্ট ব্যবহার করা হয়েছে
        const res = await axios.get("/api/recent-projects");
        if (res.data) setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative w-full bg-[#000000] py-10 md:py-16 font-poppins overflow-hidden border-t border-white/5">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] bg-[#00ffd1]/10 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[160px] opacity-30"></div>
        
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(0, 255, 209, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1350px] mx-auto text-center px-4 relative z-10">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <h2 className="text-white text-[32px] md:text-[45px] lg:text-[50px] font-extrabold tracking-tight leading-tight">
            Our Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">Project Videos</span>
          </h2>
          <div className="w-24 h-1 bg-[#F7A400] mt-5 rounded-full shadow-[0_0_10px_#F7A400]"></div>
          <p className="text-white/60 text-[15px] md:text-[18px] mt-6 max-w-3xl leading-relaxed font-medium">
            {data.subtitle ||
              "Turning complex visions into high-performance reality. Watch our latest work in action."}
          </p>
        </div>

        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {data.projects &&
            data.projects.map((project, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-[24px] border border-white/10 aspect-[16/10] md:aspect-[16/9.5] lg:aspect-[16/10] bg-[#050505]/60 backdrop-blur-xl shadow-xl hover:shadow-[0_20px_50px_rgba(247,164,0,0.15)] hover:border-[#F7A400]/40 transition-all duration-500"
                onClick={() => setActiveVideo(project)} 
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
                
                <img
                  // ✅ ডাইনামিক ইমেজ পাথ লজিক
                  src={
                    project.image
                      ? project.image.startsWith("http")
                        ? project.image
                        : `${axios.defaults.baseURL || ''}${project.image.startsWith("/") ? "" : "/"}${project.image}`
                      : `https://vumbnail.com/${project.videoId}.jpg`
                  }
                  alt={project.alt || "Recent Project"}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-[1.03] z-0"
                />
                
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  {/* Ping Animation behind button */}
                  <div className="absolute w-16 h-16 md:w-24 md:h-24 bg-[#F7A400]/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="relative w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#F7A400] to-[#ffd670] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(247,164,0,0.5)] transform group-hover:scale-110 transition-transform duration-500 border border-white/20">
                    <Play
                      fill="black"
                      color="black"
                      size={28}
                      className="md:size-10 ml-1 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </div>

                {/* Bottom Title Bar (Optional subtle gradient text info if needed, keeping it minimal) */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                   <span className="text-white/90 font-medium text-[14px] tracking-wide inline-flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#00ffd1] animate-pulse"></span>
                     Watch Case Study
                   </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- ফুল স্ক্রিন ভিডিও মোডাল (পপআপ) --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 text-white/50 hover:text-[#f7a400] transition-colors z-[10000] bg-black/50 p-2 rounded-full border border-white/10 hover:border-[#f7a400]/50"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video relative shadow-[0_0_50px_rgba(247,164,0,0.2)] rounded-[24px] border border-white/20 overflow-hidden bg-black">
            <iframe
              src={`https://player.vimeo.com/video/${activeVideo.videoId}?autoplay=1&badge=0&autopause=0`}
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Modal Background Click to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setActiveVideo(null)}
          ></div>
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

export default Recent;