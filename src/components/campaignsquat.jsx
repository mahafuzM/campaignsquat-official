import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Globe, Code2, Earth, MapPin, Palette, Smartphone } from "lucide-react";
import defaultAboutBanner from "../assets/images/h2-about-banner.webp";

const Counter = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(endValue);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue]);
  return <span>{count}+</span>;
};

const CampaignSquat = () => {
  const [aboutData, setAboutData] = useState({
    imageUrl: defaultAboutBanner,
    title: "We Don’t Just Code, We Engineer Growth.",
    description:
      "Campaignsquat Ltd is a premier tech agency where technical complexity meets aesthetic excellence. We specialize in Software Development, UI/UX Design, and scalable Website Design & Development.",
  });
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`/api/about`);
        if (res.data) setAboutData(res.data);
      } catch (err) {
        console.error("About data fetch error", err);
      }
    };

    const fetchFeatures = async () => {
      try {
        const res = await axios.get(`/api/about-features`);
        if (res.data && Array.isArray(res.data)) {
          setFeatures(res.data);
        }
      } catch (err) {
        console.error("Features fetch error", err);
      }
    };

    fetchAbout();
    fetchFeatures();
  }, []);

  const stats = [
    {
      value: "250",
      label: "Website Development",
      icon: <Globe className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
    {
      value: "170",
      label: "Software Development",
      icon: <Code2 className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
    {
      value: "150",
      label: "International Client Served",
      icon: <Earth className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
    {
      value: "90",
      label: "Local Client Served",
      icon: <MapPin className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
    {
      value: "50",
      label: "Product Design",
      icon: <Palette className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
    {
      value: "20",
      label: "App Development",
      icon: <Smartphone className="w-14 h-14 text-white" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="relative w-full bg-[#000000] pt-12 md:pt-16 pb-6 md:pb-8 overflow-hidden font-poppins">
      
      {/* Refined Brand Color Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-[#00ffd1]/10 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-[#F7A400]/10 rounded-full blur-[160px] opacity-30"></div>
        
        {/* Subtle Amber Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(247, 164, 0, 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-32">
          
          {/* Image Display */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.8)] aspect-[4/3] lg:aspect-auto lg:h-[600px]">
              <img
                src={
                  aboutData.imageUrl &&
                  aboutData.imageUrl.startsWith("/uploads")
                    ? `/api${aboutData.imageUrl}`
                    : aboutData.imageUrl || defaultAboutBanner
                }
                alt="About Us"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = defaultAboutBanner;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* Glowing Years Badge */}
            <div className="hidden lg:block absolute bottom-12 -left-12 z-20 bg-[#050505]/80 backdrop-blur-3xl border border-white/10 px-8 py-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(247,164,0,0.15)] animate-float">
              <div className="flex items-center gap-6">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] to-[#ffd670] text-7xl font-black drop-shadow-sm">
                  6<span className="text-4xl text-[#00ffd1]">+</span>
                </div>
                <div className="text-white/90 text-[15px] font-bold leading-snug uppercase tracking-widest border-l-2 border-[#00ffd1]/40 pl-4 py-1">
                  Years of <br /> Industry <br /> Mastery
                </div>
              </div>
            </div>

            {/* Decorative Dots Pattern overlapping image */}
            <div className="hidden lg:block absolute -top-8 -right-8 w-32 h-32 opacity-40 bg-[radial-gradient(#00ffd1_2px,transparent_2px)] [background-size:16px_16px] animate-pulse"></div>

            {/* Mobile Small Badge inside image */}
            <div className="lg:hidden absolute bottom-4 left-4 z-20 bg-[#050505]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] to-[#ffd670] text-3xl font-black">6<span className="text-xl text-[#00ffd1]">+</span></div>
                <div className="text-white/90 text-[10px] font-bold leading-tight uppercase tracking-widest border-l border-[#00ffd1]/40 pl-2">
                  Years of <br /> Mastery
                </div>
              </div>
            </div>
          </div>

          {/* Text & Content Block */}
          <div className="flex flex-col space-y-8 order-1 lg:order-2">
            
            {/* Glowing Established Pill */}
            <div className="relative group cursor-pointer inline-flex w-fit">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
              <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#050505] border border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffd1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ffd1]"></span>
                </span>
                <span className="text-[#F7A400] text-[13px] font-bold tracking-wide">Established 2021</span>
              </div>
            </div>

            {/* Title with highlighted Shimmering keywords */}
            <h2
              className="text-white text-[32px] md:text-[45px] lg:text-[55px] font-extrabold leading-[1.15] tracking-tight"
              dangerouslySetInnerHTML={{ 
                __html: aboutData.title.replace(
                  'Engineer Growth', 
                  '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto] inline-block">Engineer Growth</span>'
                ).replace(
                  'Engineer Growth.', 
                  '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto] inline-block">Engineer Growth.</span>'
                )
              }}
            ></h2>

            <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed max-w-2xl font-medium">
              {aboutData.description}
            </p>

            {/* Service Highlight Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {(features.length > 0 ? features : [
                { title: "Future-Proof Tech", desc: "Scalable solutions only." },
                { title: "User-First Design", desc: "UI that converts." },
              ]).map((item, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col gap-3 p-6 rounded-[20px] bg-[#050505]/60 backdrop-blur-xl border border-white/10 hover:border-[#00ffd1]/40 transition-all duration-500 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/5 group-hover:to-[#F7A400]/5 transition-colors duration-500"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#F7A400] to-[#00ffd1] font-black text-2xl drop-shadow-sm">0{i + 1}.</span>
                    <h4 className="text-white text-[17px] font-extrabold tracking-wide">
                      {item.title || item.t}
                    </h4>
                  </div>
                  <p className="text-white/60 text-[14px] md:text-[15px] relative z-10 leading-relaxed font-medium">
                    {item.desc || item.d}
                  </p>
                </div>
              ))}
            </div>

            {/* Modern CTA Button */}
            <div className="pt-6">
              <Link to="/about-us">
                <button className="group relative overflow-hidden bg-[#F7A400] text-black font-bold py-3.5 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(247,164,0,0.2)] hover:shadow-[0_0_40px_rgba(247,164,0,0.4)] transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2 text-[14px] md:text-[16px] tracking-wide">
                    Explore More
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-white/30 -translate-x-full group-hover:animate-[sweep_0.75s_forwards] skew-x-12 z-0"></div>
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* Stats Grid */}
        {/* Stats Grid */}
        <div className="mt-16 lg:mt-24">
          <div className="max-w-[1440px] mx-auto relative">
            {/* Ambient Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#F7A400]/30 to-transparent"></div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pt-12 md:pt-16 pb-6 px-3 sm:px-4 md:px-0">
              {stats.map((stat, index) => (
                <div
                   key={index}
                   className="flex flex-col xl:flex-row items-start xl:items-center gap-3 sm:gap-5 group p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-[24px] bg-[#050505]/60 backdrop-blur-xl border border-white/5 hover:bg-white/[0.04] hover:border-[#00ffd1]/20 transition-all duration-500 shadow-lg hover:shadow-[0_10px_40px_rgba(0,255,209,0.05)]"
                >
                  <div className="flex-shrink-0 p-3 sm:p-4 rounded-[14px] sm:rounded-2xl bg-[#000] border border-white/5 group-hover:border-[#00ffd1]/30 relative overflow-hidden transition-all duration-500 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/20 group-hover:to-[#F7A400]/10 transition-colors duration-500"></div>
                    {React.cloneElement(stat.icon, {
                      className: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#F7A400] relative z-10 transition-colors duration-500 group-hover:text-[#00ffd1]",
                      strokeWidth: 1.5
                    })}
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-white text-[22px] sm:text-[32px] md:text-[40px] font-black leading-none mb-1 sm:mb-1.5 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1]">
                       <Counter endValue={stat.value} />
                    </h3>
                    <p className="text-white/60 group-hover:text-white/80 text-[10px] sm:text-[12px] md:text-[14px] font-bold leading-tight uppercase tracking-wider transition-colors duration-300">
                       {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{` 
        @keyframes float { 
          0% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
          100% { transform: translateY(0px); } 
        } 
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sweep {
          100% { transform: translateX(100%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; } 
        .animate-text-shimmer { animation: textShimmer 4s linear infinite; }
      `}</style>
    </section>
  );
};

export default CampaignSquat;
