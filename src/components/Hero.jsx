import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StackIcon from "tech-stack-icons";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    heading: "Transforming Ideas into Elite Digital Products",
    paragraph:
      "Elite MERN, PHP, Laravel, Python & Digital Marketing solutions—crafted to scale your business with premium UI/UX.",
    vimeoId: "1153559168",
    imageUrl: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get(
          `/api/hero?t=${new Date().getTime()}`,
        );

        if (res.data) {
          const rawImageUrl = res.data.imageUrl || "";
          let finalImageUrl = "";
          if (rawImageUrl) {
            const cleanPath = rawImageUrl.replace(/\\/g, "/");
            finalImageUrl = cleanPath.startsWith("http")
              ? cleanPath
              : `/${cleanPath.replace(/^\//, "")}`;
          }

          setContent({
            heading: res.data.heading || content.heading,
            paragraph: res.data.paragraph || content.paragraph,
            vimeoId: res.data.vimeoId || content.vimeoId,
            imageUrl: finalImageUrl,
          });
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const techIcons = [
    { name: "react", color: "#61DAFB" },
    { name: "nextjs", color: "#FFFFFF" },
    { name: "figma", color: "#F24E1E" },
    { name: "mongodb", color: "#47A248" },
    { name: "laravel", color: "#FF2D20" },
    { name: "nodejs", color: "#68A063" },
  ];

  return (
    <section 
      className="relative w-full bg-[#000000] pt-[50px] md:pt-[60px] xl:pt-[70px] pb-4 md:pb-6 font-poppins overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Mouse Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(247, 164, 0, 0.06), transparent 40%)`
        }}
      />

      {/* --- Trending Background Layer --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sophisticated Animated Infinite Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.25] animate-grid-scroll" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            maskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        ></div>

        {/* Dynamic Refined Aurora Blobs (Mint Cyan & Amber) */}
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-[#00ffd1]/15 rounded-[40%] blur-[100px] md:blur-[150px] opacity-40 animate-liquid z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] bg-[#F7A400]/15 rounded-full blur-[110px] md:blur-[140px] opacity-35 animate-liquid-reverse z-0"></div>
        <div className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] bg-[#00ffd1]/10 rounded-full blur-[120px] opacity-30 animate-liquid-slow z-0"></div>
      </div>

      <style>{`
        @keyframes fadeInFast { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes liquidMove {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(5%, -10%) scale(1.1) rotate(5deg); }
          66% { transform: translate(-5%, 5%) scale(0.95) rotate(-5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes backgroundMove {
          0% { background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
          100% { background-position: 0px 100px, 0px 100px, 0px 20px, 0px 20px; }
        }
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sweep {
          100% { transform: translateX(100%); }
        }

        .animate-liquid { animation: liquidMove 15s infinite ease-in-out; }
        .animate-liquid-reverse { animation: liquidMove 20s infinite ease-in-out reverse; }
        .animate-liquid-slow { animation: liquidMove 25s infinite ease-in-out; animation-delay: 2s; }
        .animate-grid-scroll { animation: backgroundMove 4s linear infinite; }
        
        .animate-text-shimmer { 
          background-size: 200% auto;
          animation: textShimmer 4s linear infinite; 
        }

        .fade-in-up { animation: fadeInFast 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; opacity: 0; }
        
        /* Trust Circle Icons */
        .circle-icon-root {
          width: 50px; height: 50px;
          @media (min-width: 768px) { width: 75px; height: 75px; }
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .circle-icon-root:hover {
          transform: translateY(-8px) scale(1.1);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(247, 164, 0, 0.5);
          box-shadow: 0 10px 40px -10px rgba(247, 164, 0, 0.3);
        }

      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 xl:px-10 flex flex-col items-center text-center relative z-20">
        
        {/* NEW: Announcement Pill */}
        <div className="mb-3 md:mb-4 fade-in-up flex justify-center" style={{ animationDelay: "0.1s" }}>
          <div className="relative group cursor-pointer inline-flex">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] rounded-full blur opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
            <div className="relative px-5 py-2 bg-[#050505] rounded-full border border-white/10 flex items-center gap-2">
              <span className="text-base leading-none">✨</span>
              <span className="text-white/90 text-[12px] sm:text-[14px] font-medium tracking-wide">
                Award-Winning Software Agency
              </span>
              <svg className="w-4 h-4 text-[#F7A400] ml-1 font-bold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </div>

        {/* Rating & Badge */}
        <div className="mb-3 md:mb-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-center justify-center gap-4">
             {/* Trust Badges Wrapper */}
             <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                {/* Google Badge */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                   <StackIcon name="google" className="w-4 h-4" />
                   <div className="flex flex-col items-start leading-none">
                      <span className="text-[#F7A400] text-[10px] sm:text-[12px] font-bold">5.0 RATING</span>
                      <span className="text-white/60 text-[8px] sm:text-[10px] uppercase tracking-wider">On Google</span>
                   </div>
                </div>

                {/* Avatars Center */}
                <div className="flex -space-x-2 sm:-space-x-3 items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 rounded-full bg-white border border-[#02050A] overflow-hidden flex items-center justify-center shadow-lg">
                      <img src={`https://i.pravatar.cc/100?u=cs${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 sm:w-10 rounded-full bg-[#F7A400] text-black font-bold flex items-center justify-center border border-[#02050A] text-[9px] sm:text-[11px] shadow-lg">
                    150+
                  </div>
                </div>

                {/* Trustpilot Badge */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                   <div className="w-4 h-4 bg-[#00b67a] rounded-sm flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                   </div>
                   <div className="flex flex-col items-start leading-none">
                      <span className="text-white text-[10px] sm:text-[12px] font-bold">EXCELLENT</span>
                      <span className="text-[#00b67a] text-[8px] sm:text-[10px] uppercase tracking-wider">Trustpilot</span>
                   </div>
                </div>
             </div>

             <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 sm:w-4 text-[#F7A400]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/80 font-semibold text-[11px] sm:text-sm">Trusted by 150+ Companies Globally</span>
                </div>
              </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-3 md:mb-4 fade-in-up px-4" style={{ animationDelay: "0.5s" }}>
          {techIcons.map((icon) => (
            <div key={icon.name} className="circle-icon-root group scale-90 sm:scale-100">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <StackIcon name={icon.name} className="w-full h-full" variant="dark" />
              </div>
            </div>
          ))}
        </div>

        {/* NEW: Heading Section with Shimmer Gradient */}
        <div className="w-full flex justify-center mb-2 md:mb-3 text-center fade-in-up" style={{ animationDelay: "0.7s" }}>
          <h1 className="font-outfit w-full text-white font-bold tracking-tight text-[19px] sm:text-[36px] md:text-[46px] lg:text-[50px] xl:text-[56px] 2xl:text-[65px] leading-[1.1] px-2 max-w-[95%] lg:max-w-[1100px] xl:max-w-[1300px] whitespace-normal">
            {content.heading.includes("&") ? (
              <>
                <span className="text-white">{content.heading.split("&")[0]}</span>
                <span className="text-white mx-1.5">&</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer drop-shadow-sm">{content.heading.split("&")[1]}</span>
              </>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F7A400] to-white animate-text-shimmer">{content.heading}</span>
            )}
          </h1>
        </div>

        {/* Paragraph Section */}
        <div className="w-full px-6 max-w-[780px] mx-auto mb-3 md:mb-4 fade-in-up" style={{ animationDelay: "0.9s" }}>
          <p className="text-white/70 text-[14px] sm:text-[16px] md:text-[18px] font-medium text-center leading-[1.5]">
            {content.paragraph}
          </p>
        </div>

        {/* NEW: Sweeping CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6 fade-in-up" style={{ animationDelay: "1.1s" }}>
          <Link to="/contact">
            <button className="group relative overflow-hidden bg-[#F7A400] text-black text-[15px] sm:text-[18px] font-bold py-3.5 px-8 sm:px-14 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(247,164,0,0.2)] hover:shadow-[0_0_50px_rgba(247,164,0,0.5)] transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Project
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/30 -translate-x-full group-hover:animate-[sweep_0.75s_forwards] skew-x-12 z-0"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
