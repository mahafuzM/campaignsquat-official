import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import StackIcon from "tech-stack-icons";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    heading: "Transforming Ideas into Elite Digital Products",
    paragraph:
      "Elite MERN, PHP, Laravel, Python & Digital Marketing solutions—crafted to scale your business with premium UI/UX.",
    videoUrl: "",
    imageUrl: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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
            videoUrl: res.data.videoUrl || res.data.vimeoId || content.videoUrl,
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

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const techIcons = [
    { name: "react", color: "#61DAFB" },
    { name: "nextjs", color: "#FFFFFF" },
    { name: "figma", color: "#F24E1E" },
    { name: "mongodb", color: "#47A248" },
    { name: "laravel", color: "#FF2D20" },
    { name: "nodejs", color: "#68A063" },
  ];

  const getEmbedUrl = (url, autoplay = false) => {
    if (!url) return '';
    let embedUrl = url;
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('v=')) {
        videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition);
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
        const questionPosition = videoId.indexOf('?');
        if (questionPosition !== -1) videoId = videoId.substring(0, questionPosition);
      }
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com/')) {
      let videoId = url.split('vimeo.com/')[1];
      const questionPosition = videoId.indexOf('?');
      if (questionPosition !== -1) videoId = videoId.substring(0, questionPosition);
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    
    if (autoplay) {
      const separator = embedUrl.includes('?') ? '&' : '?';
      embedUrl += `${separator}autoplay=1&muted=0`;
    }
    return embedUrl;
  };

  return (
    <section 
      className="relative w-full bg-[#000000] pt-4 md:pt-6 pb-4 md:pb-6 font-poppins overflow-hidden"
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
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
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
        
        .circle-icon-root {
          width: 42px; height: 42px;
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

        .video-preview-glow {
          box-shadow: 0 0 20px rgba(247, 164, 0, 0.2), 0 0 60px rgba(0, 255, 209, 0.1);
        }
        .video-preview-glow:hover {
          box-shadow: 0 0 30px rgba(247, 164, 0, 0.4), 0 0 80px rgba(0, 255, 209, 0.2);
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex flex-col items-start sm:items-center text-left sm:text-center relative z-20">
        
        {/* NEW: Announcement Pill */}
        <div className="mb-3 md:mb-4 fade-in-up flex justify-start sm:justify-center" style={{ animationDelay: "0.1s" }}>
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
        <div className="mb-3 md:mb-4 fade-in-up flex flex-col items-start sm:items-center" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-start sm:items-center justify-start sm:justify-center gap-4">
             {/* Trust Badges Wrapper */}
             <div className="flex flex-wrap items-center justify-start sm:justify-center gap-3 sm:gap-6">
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

              <div className="flex flex-col items-start sm:items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 text-[#F7A400] fill-[#F7A400]" />
                    ))}
                  </div>
                  <span className="text-white/80 font-semibold text-[11px] sm:text-sm text-left sm:text-center">Trusted by 150+ Companies Globally</span>
                </div>
              </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-6 mb-3 md:mb-4 fade-in-up" style={{ animationDelay: "0.5s" }}>
          {techIcons.map((icon) => (
            <div key={icon.name} className="circle-icon-root group">
              <div className="w-7 h-7 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <StackIcon name={icon.name} className="w-full h-full" variant="dark" />
              </div>
            </div>
          ))}
        </div>

        {/* Heading Section */}
        <div className="w-full flex justify-start sm:justify-center mb-2 md:mb-3 text-left sm:text-center fade-in-up" style={{ animationDelay: "0.7s" }}>
          <h1 className="font-outfit w-full text-white font-bold tracking-tight text-[26px] sm:text-[32px] md:text-[42px] lg:text-[46px] xl:text-[52px] 2xl:text-[60px] leading-[1.1] max-w-[95%] lg:max-w-[1100px] xl:max-w-[1300px] whitespace-normal">
            {content.heading.includes("&") ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer drop-shadow-sm">{content.heading.split("&")[0]}</span>
                <span className="text-white mx-1.5">&</span>
                <span className="text-white">{content.heading.split("&")[1]}</span>
              </>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F7A400] to-white animate-text-shimmer">{content.heading}</span>
            )}
          </h1>
        </div>

        {/* Paragraph Section */}
        <div className="w-full max-w-[780px] mb-3 md:mb-4 fade-in-up" style={{ animationDelay: "0.9s" }}>
          <p className="text-white/70 text-[14px] sm:text-[16px] md:text-[18px] font-medium text-left sm:text-center leading-[1.5]">
            {content.paragraph}
          </p>
        </div>

        {/* Sweeping CTA Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 fade-in-up" style={{ animationDelay: "1.1s" }}>
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

        {/* Video Preview Display */}
        {content.videoUrl && (
          <div 
            className="w-full max-w-[1200px] mx-auto mt-12 md:mt-16 fade-in-up relative z-30 px-4 group cursor-pointer" 
            style={{ animationDelay: "1.3s" }}
            onClick={toggleModal}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 video-preview-glow bg-black/50 backdrop-blur-md aspect-video transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#F7A400]/30 transform-gpu">
              {/* Thumbnail Placeholder with Suble Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40"></div>
              {content.imageUrl && (
                <img 
                  src={content.imageUrl} 
                  alt="Video thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Play Button UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-8 bg-[#F7A400]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:bg-[#F7A400] group-hover:border-transparent group-active:scale-95">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Label Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-medium text-sm md:text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#F7A400] rounded-full animate-pulse"></span>
                  Watch Our Process in Action
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300">
          {/* Backdrop with extreme blur and dark tint */}
          <div 
            className="absolute inset-0 bg-[#000000]/95 backdrop-blur-2xl animate-[fadeInFast_0.4s_ease-out]" 
            onClick={toggleModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-6xl aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(247,164,0,0.15)] border border-white/10 scale-95 animate-[fadeInFast_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] translate-y-10">
            {/* Close Button */}
            <button 
              onClick={toggleModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/10 hover:bg-[#F7A400] hover:text-black text-white backdrop-blur-md border border-white/20 z-50 transition-all duration-300 transform hover:rotate-90 group"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Iframe with smart loading */}
            <div className="w-full h-full bg-black">
              <iframe
                src={getEmbedUrl(content.videoUrl, true)}
                title="Company video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
