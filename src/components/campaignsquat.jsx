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
      "Campaignsquat Ltd is a premier tech agency where technical complexity meets aesthetic excellence.",
  });

  // ✅ ১. স্মার্ট এপিআই ইউআরএল সেটআপ
  const API_BASE =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        // ✅ এক্সিওস এখন লোকাল বা লাইভ চিনে ডাটা আনবে
        const res = await axios.get(`${API_BASE}/api/about`);
        if (res.data) setAboutData(res.data);
      } catch (err) {
        console.error("About data fetch error", err);
      }
    };
    fetchAbout();
  }, [API_BASE]);

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
    <section className="relative w-full bg-[#050505] py-6 md:py-10 overflow-hidden font-poppins">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F7A400]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-[1440px] mx-auto px-2 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <div className="relative group order-2 lg:order-1">
            {/* ✅ ইমেজটি এখন শুধু ডেস্কটপে শো করবে */}
            <div className="hidden md:block relative z-10 rounded-[5px] overflow-hidden border border-white/10 aspect-[4/5] md:aspect-auto">
              <img
                src={
                  aboutData.imageUrl &&
                  aboutData.imageUrl.startsWith("/uploads")
                    ? `/api${aboutData.imageUrl}`
                    : aboutData.imageUrl || defaultAboutBanner
                }
                alt="About Us"
                className="w-full h-full min-h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = defaultAboutBanner;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* ✅ ৬+ বছরের এক্সপেরিয়েন্স কার্ডটিও শুধু ডেস্কটপে শো করবে */}
            <div className="hidden md:block absolute bottom-6 left-4 md:bottom-12 md:-left-2 z-20 bg-white/5 backdrop-blur-xl border border-white/20 p-5 md:p-8 rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float">
              <div className="flex items-center gap-4">
                <div className="text-[#F7A400] text-4xl md:text-6xl font-black">
                  6<span className="text-xl md:text-2xl">+</span>
                </div>
                <div className="text-white text-[11px] md:text-[15px] font-semibold leading-tight">
                  Years of <br /> Industry <br /> Mastery
                </div>
              </div>
            </div>

            {/* ✅ ফুঁটা ফুঁটা ডিজাইনটিও এখন শুধু ডেস্কটপে শো করবে (hidden md:block) */}
            <div className="hidden md:block absolute -top-10 -right-10 w-32 h-32 opacity-20 bg-[radial-gradient(#F7A400_2px,transparent_2px)] [background-size:16px_16px]"></div>
          </div>

          <div className="flex flex-col space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-[5px] bg-[#F7A400]/10 border border-[#F7A400]/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7A400] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7A400]"></span>
              </span>
              <span className="text-[#F7A400] font-bold">Established 2021</span>
            </div>

            <h2
              className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.2] md:leading-[1.3] tracking-tight "
              dangerouslySetInnerHTML={{ __html: aboutData.title }}
            ></h2>

            <p className="text-white text-[16px] md:text-[18px] leading-relaxed max-w-4xl ">
              {aboutData.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "Future-Proof Tech", d: "Scalable solutions only." },
                { t: "User-First Design", d: "UI that converts." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 p-4 rounded-[5px] bg-white/5 border border-white/5 hover:border-[#F7A400]/30 transition-all"
                >
                  <span className="text-[#F7A400] font-bold">0{i + 1}.</span>
                  <h4 className="text-white text-[16px] md:text-[18px] font-semibold">
                    {item.t}
                  </h4>
                  <p className="text-white text-[12px] md:text-[14px] ">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link to="/about-us">
                <button className="group relative px-8 py-2 bg-[#F7A400] border-2 border-[#F7A400] rounded-[5px] font-semibold text-black transition-all duration-300 hover:text-white hover:bg-[#02050A] active:scale-95 text-[12px] md:text-[15px]">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore More
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300 group-hover:translate-x-2"
                    >
                      <path
                        d="M5 12h14"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16 -mt-24 md:mt-10">
          <div className="max-w-[1440px] mx-auto px- md:px-16 lg:px-22">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 md:gap-x-12 lg:gap-x-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center sm:flex-row sm:items-center gap-3 md:gap-6 group"
                >
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {React.cloneElement(stat.icon, {
                      className: "w-10 h-10 md:w-14 md:h-14 text-[#f7A400]",
                    })}
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="text-white transition-colors duration-300 group-hover:text-[#F7A400] text-[22px] sm:text-[32px] lg:text-[40px] font-bold leading-none mb-1 sm:mb-3">
                      <Counter endValue={stat.value} />
                    </h3>
                    <p className="text-white text-[16px] sm:text-[16px] lg:text-[20px] font-medium leading-tight tracking-widesm:capitalize">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{` @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } } .animate-float { animation: float 6s ease-in-out infinite; } `}</style>
    </section>
  );
};

export default CampaignSquat;
