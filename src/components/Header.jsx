import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // ✅ ReactDOM ইম্পোর্ট করা হয়েছে পোর্টালের জন্য
import axios from "axios";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import headerBgDefault from "../assets/images/124274 (1).jpg";

const Header = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    heading: "Custom Software Engineering & High-End UI/UX Solutions",
    paragraph: "From UI/UX Design that captivates users to full-cycle Website Design & Development using MERN Stack, PHP, and Laravel, Campaignsquat Ltd delivers high-performance solutions.",
    vimeoId: "1153559168",
    imageUrl: "",
  });

  const API_BASE = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://api.campaignsquat.com";

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/hero?t=${new Date().getTime()}`);
        
        if (res.data) {
          const rawImageUrl = res.data.imageUrl || "";
          let finalImageUrl = "";
          if (rawImageUrl) {
            const cleanPath = rawImageUrl.replace(/\\/g, "/");
            finalImageUrl = cleanPath.startsWith('http') 
              ? cleanPath 
              : `${API_BASE}/${cleanPath.replace(/^\//, "")}`;
          }

          setContent({
            heading: res.data.heading || content.heading,
            paragraph: res.data.paragraph || content.paragraph,
            vimeoId: res.data.vimeoId || content.vimeoId,
            imageUrl: finalImageUrl
          });
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [API_BASE]);

  return (
    <section className="relative w-full bg-[#02050A] pt-2 md:pt-6 lg:pt-8 font-poppins overflow-hidden perspective-container">
      {/* --- ৩ডি লিকুইড ব্যাকগ্রাউন্ড লেয়ার --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-20%] md:left-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] bg-[#F7A400]/25 rounded-full blur-[80px] md:blur-[120px] opacity-30 animate-liquid"></div>
        <div className="absolute bottom-[20%] right-[-20%] md:right-[-5%] w-[60vw] md:w-[45vw] h-[60vw] md:h-[45vw] bg-[#F7A400]/20 rounded-full blur-[70px] md:blur-[100px] opacity-30 animate-liquid-reverse"></div>
        <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] opacity-10 animate-liquid-slow"></div>
      </div>

      <style>{`
        @keyframes fadeInFast { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #F7A400; } }
        @keyframes rotate-border { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes liquidMove {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(10%, -15%) scale(1.2) rotate(10deg); }
          66% { transform: translate(-5%, 10%) scale(0.9) rotate(-10deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        .animate-liquid { animation: liquidMove 15s infinite ease-in-out; }
        .animate-liquid-reverse { animation: liquidMove 20s infinite ease-in-out reverse; }
        .animate-liquid-slow { animation: liquidMove 25s infinite ease-in-out; animation-delay: 2s; }
        .perspective-container { perspective: 2000px; }
        .custom-typewriter { display: block; white-space: normal; border-right: 3px solid #F7A400; margin: 0 auto; animation: fadeInFast 1s ease-out forwards, blink-caret .75s step-end infinite; }
        .fade-in-up { animation: fadeInFast 0.8s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .running-border-container { position: relative; padding: 2px; overflow: hidden; display: block; border-radius: 8px; }
        .running-border-line { position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background: conic-gradient(from 0deg, transparent 60%, #F7A400 100%); animation: rotate-border 4s linear infinite; z-index: 0; }
        .inner-content { position: relative; z-index: 10; background: #02050A; border-radius: 6px; overflow: hidden; }
        .hex-shape { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 xl:px-10 flex flex-col items-center text-center relative z-10">
        
        {/* Badge Section */}
        <div className="mb-12 md:mb-16 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="flex -space-x-3 items-center mb-1">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center p-2 shadow-lg z-[3] border border-white/20">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#EA3323] flex items-center justify-center p-2.5 shadow-lg z-[2] border border-white/10">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88c-21 0-38-17-38-38s17-38 38-38 38 17 38 38-17 38-38 38z" />
                    <circle cx="50" cy="50" r="15" />
                  </svg>
                </div>
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#162E44] flex items-center justify-center shadow-lg z-[1] border border-white/10">
                  <span className="text-white font-black text-[10px] md:text-[12px]">GF</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-white">4.9</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-[#F7A400]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/80 text-[10px] md:text-[12px] font-medium tracking-wide">
                  Leading Software Development & UI/UX Design Agency
                </p>
              </div>
            </div>

            {/* Icons Stack */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-8 max-w-[1200px] px-4">
              {/* React Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-[#61DAFB]/10 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-[#61DAFB]/30 hover:border-[#61DAFB]">
                  <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="-11.5 -10.23174 23 20.46348">
                    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
                    <g stroke="#61DAFB" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                </div>
              </div>
              {/* NextJS Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-white/5 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-white/20 hover:border-white">
                  <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 180 180" fill="none">
                    <path d="M149.508 157.52L69.142 54.2027H53.0034V125.797H64.7334V74.1437L134.195 163.784C139.367 161.947 144.57 159.845 149.508 157.52Z" fill="white" />
                    <path d="M109.43 54.2027H97.7V125.797H109.43V54.2027Z" fill="white" />
                  </svg>
                </div>
              </div>
              {/* Figma Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-white/5 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-white/20 hover:border-[#F24E1E]">
                  <svg className="w-10 h-10 md:w-16 md:h-16" viewBox="0 0 38 57" fill="none">
                    <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z" fill="#F24E1E" />
                    <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5C0 33.75 4.25 38 9.5 38H19V19Z" fill="#A259FF" />
                    <path d="M19 38H9.5C4.25 38 0 42.25 0 47.5C0 52.75 4.25 57 9.5 57H19V38Z" fill="#1ABCFE" />
                    <path d="M38 19H28.5C23.25 19 19 23.25 19 28.5V38H28.5C33.75 38 38 33.75 38 28.5C38 23.25 33.75 19 28.5 19Z" fill="#0ACF83" />
                    <path d="M38 0H28.5C23.25 0 19 4.25 19 9.5V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0Z" fill="#FF7262" />
                  </svg>
                </div>
              </div>
              {/* MERN Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-[#61DAFB]/10 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-[#61DAFB]/30 hover:border-[#61DAFB]">
                  <svg className="w-9 h-9 md:w-14 md:h-14" viewBox="0 0 256 256">
                    <g stroke="#61DAFB" strokeWidth="8" fill="none" opacity="0.6">
                      <ellipse cx="128" cy="128" rx="110" ry="40" /><ellipse cx="128" cy="128" rx="110" ry="40" transform="rotate(60 128 128)" /><ellipse cx="128" cy="128" rx="110" ry="40" transform="rotate(120 128 128)" />
                    </g>
                    <rect x="100" y="85" width="56" height="86" rx="6" stroke="#61DAFB" strokeWidth="12" fill="#111" />
                    <circle cx="128" cy="150" r="4" fill="#61DAFB" />
                  </svg>
                </div>
              </div>
              {/* Laravel Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-[#FF2D20]/10 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-[#FF2D20]/30 hover:border-[#FF2D20]">
                  <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24"><path d="M20.042 17.143l-8.042 4.607l-8.042-4.607v-9.286l8.042-4.607l8.042 4.607v9.286zm-1.005-8.106l-7.037-4.032l-7.037 4.032v8.106l7.037 4.032l7.037-4.032v-8.106z" fill="#FF2D20" /></svg>
                </div>
              </div>
              {/* Node Icon */}
              <div className="relative group transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-18 md:w-24 md:h-26 bg-[#68A063]/10 backdrop-blur-sm flex items-center justify-center hex-shape border-2 border-[#68A063]/30 hover:border-[#68A063]">
                  <svg className="w-10 h-10 md:w-16 md:h-16" viewBox="0 0 256 256" fill="none">
                    <path d="M128 20L40 70v100l88 50" fill="#3E863D" /><path d="M128 20l88 50v100l-88 50" fill="#61a05e" /><path d="M128 120L40 70l88-50 88 50-88 50z" fill="#83CD29" /><path d="M128 220V120L40 70v100l88 50z" fill="#3E863D" /><path d="M128 220V120l88-50v100l-88 50z" fill="#4CAF50" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#F7A400] to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Heading Section */}
        <div className="w-full flex justify-center mb-6 md:mb-8 text-center">
          {content.heading ? (
            <h1
              className="font-outfit text-white font-bold tracking-tight leading-[1.1] md:leading-[1.15] text-[28px] sm:text-[38px] md:text-[50px] lg:text-[50px] xl:text-[70px] custom-typewriter px-2 drop-shadow-2xl max-w-[100%] md:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px]"
              dangerouslySetInnerHTML={{ __html: content.heading }}
            />
          ) : (
            <h1 className="text-white opacity-50">Loading Engineering Excellence...</h1>
          )}
        </div>

        {/* Paragraph Section */}
        <div className="w-full px-2 max-w-[1100px] mx-auto mb-6 md:mb-12 fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-white text-[16px] md:text-[20px] lg:text-[20px] font-medium text-center leading-[1.6] md:leading-[1.8]">
            {content.paragraph}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12 md:mb-24 flex justify-center fade-in-up" style={{ animationDelay: "1s" }}>
          <Link to="/contact">
            <button className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <polyline points="12 2 2 7 12 12 22 7 12 2"></polyline>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>Start Your Project</span>
            </button>
          </Link>
        </div>

        {/* Banner Section */}
        <div className="w-full pb-20 fade-in-up" style={{ animationDelay: "1.2s" }}>
          <div className="running-border-container shadow-2xl rounded-xl overflow-hidden relative">
            <div className="running-border-line"></div>
            <div className="inner-content relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
              <img
                src={content.imageUrl || headerBgDefault}
                className="w-full h-auto min-h-[300px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Banner"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                <div className="w-20 h-20 bg-[#F7A400] rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 z-50">
                  <svg viewBox="0 0 24 24" fill="black" className="w-12 h-12 ml-1"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-hidden">
          <div className="relative w-full max-w-7xl aspect-video">
            <button onClick={() => setIsVideoOpen(false)} className="absolute -top-14 right-0 text-white hover:text-[#f7a400] transition-all p-2 z-[10000000] hover:scale-110">
              <X size={44} strokeWidth={2.5} />
            </button>
            <div className="w-full h-full shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/20 bg-black rounded-[5px] overflow-hidden">
              <iframe
                src={`https://player.vimeo.com/video/${content.vimeoId}?autoplay=1&badge=0&autopause=0&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Project Video"
              ></iframe>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 cursor-pointer" onClick={() => setIsVideoOpen(false)}></div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Header;