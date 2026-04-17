import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import axios from "axios";

// --- আপনার আগের সব ইমেজ ইমপোর্ট (একদম সেম থাকবে) ---
import Img1 from "../assets/images/Farmer Care Agriculture Management Dashboard UI Design.webp";
import Img2 from "../assets/images/MediCare Telemedicine and Health Tracking Mobile App Interface.webp";
import Img3 from "../assets/images/Modern Fashion E-commerce Website Landing Page UI UX.webp";
import Img4 from "../assets/images/FarmerCare Agriculture Investment and Finance App Design.webp";
import Img5 from "../assets/images/PulseFit Fitness and Wellness Activity Tracking UI Design.webp";
import Ceo1 from "../assets/images/ceo.webp";
import Ceo2 from "../assets/images/jeremy-mcgilvrey-Mum-4dB0VsE-unsplash.jpg";
import Ceo3 from "../assets/images/christina-wocintechchat-com-m-PlikkWB79qs-unsplash.jpg";
import Ceo4 from "../assets/images/ceo.webp";
import Ceo5 from "../assets/images/clay-elliot-HfMCgqOLTyM-unsplash.jpg";

const Card = ({ item, index, total }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, index === total - 1 ? 1 : 0.96],
  );

 // ইমেজ পাথ হ্যান্ডলিং (সার্ভার বনাম লোকাল)
  const renderImg = (img, fallback) => {
    if (!img) return fallback;

    // যদি ইমেজটি স্ট্রিং হয় এবং /uploads দিয়ে শুরু হয়
    if (typeof img === "string" && img.startsWith("/uploads")) {
      // Axios defaults theke baseURL nibe
      const baseUrl = axios.defaults.baseURL;
      
      // যানি baseURL এর শেষে / না থাকে, তাই আমরা সেটি হ্যান্ডেল করছি
      const cleanBaseUrl = baseUrl.endsWith("/") 
        ? baseUrl.slice(0, -1) 
        : baseUrl;

      return `${cleanBaseUrl}${img}`;
    }
    
    // অন্যথায় সরাসরি ইমেজ রিটার্ন করবে (import করা ইমেজ হলে)
    return img;
  };

  return (
    <div
      ref={container}
      className="w-full sticky top-[10vh] flex justify-center items-start h-[90vh] sm:h-[80vh] md:h-[70vh] lg:h-[65vh] xl:h-[60vh]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, backgroundColor: item.color }}
        className="w-full max-w-[1440px] h-full rounded-[5px] shadow-2xl overflow-hidden relative border border-black/10 flex flex-col"
      >
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-50 cursor-pointer"
          aria-label={`View ${item.title} project`}
        />

        <div className="px-6 sm:px-10 md:px-14 py-4 border-b border-black/5 flex justify-between items-center bg-white/10">
          <span className="text-[14px] md:text-[18px] font-semibold text-black tracking-tighter">
            {item.title}
          </span>
        </div>

        <div className="flex-1 px-6 sm:px-10 md:px-14 py-6 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">
          <div className="space-y-6 text-black">
            <div className="space-y-3">
              <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-semibold text-black leading-[1.1] tracking-tight">
                {item.heading}
              </h2>
              <p className="text-[16px] md:text-[18px] font-medium leading-relaxed text-black max-w-auto">
                {item.description}
              </p>
            </div>
            <div className="flex gap-10 py-2">
              <div>
                <p className="text-[26px] md:text-[30px] font-semibold ">
                  {item.pages}
                </p>
                <p className="text-[14px] text-black md:text-[16px] font-semibold ">
                  Pages in Projects
                </p>
              </div>
              <div>
                <p className="text-[26px] md:text-[30px] font-semibold">
                  {item.growth}
                </p>
                <p className="text-[14px] text-black md:text-[16px] font-semibold">
                  Retention Growth
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-1 sm:p-2 bg-black/10 backdrop-blur-sm rounded-[5px] w-full max-w-[380px] group transition-all border border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-400 rounded-full border-2 border-white/20 overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={renderImg(item.ceoImg)}
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] sm:text-[16px] font-semibold text-black leading-tight">
                    {item.ceoName}
                  </p>
                  <p className="text-[12px] sm:text-[14px] text-black font-medium leading-tight">
                    {item.ceoTitle}
                  </p>
                </div>
              </div>
              <div className="pr-2">
                <ArrowRight
                  size={20}
                  className="text-black/70 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
          <div
            className="relative h-[280px] sm:h-full max-h-[420px] w-full rounded-[5px] overflow-hidden shadow-inner border border-black/5"
            style={{ backgroundColor: item.imgBg }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-10">
              <div className="w-full h-[240px] sm:h-[320px] bg-white/20 backdrop-blur-md rounded-[5px] border border-white/30 flex items-center justify-center shadow-2xl rotate-2 translate-y-2 sm:translate-y-4 overflow-hidden transform-gpu">
                <img
                  src={renderImg(item.projectImg)}
                  alt={item.title}
                  className="w-full h-full object-cover object-top antialiased"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WorkByIndustry = () => {
  const [industries, setIndustries] = useState([]);

  // --- আপনার অরিজিনাল ৫টি ডেমো ডাটা (সেম থাকবে) ---
  const demoData = [
    {
      id: 1,
      title: "FarmerCare",
      heading: "Farmer Care – Modern Agricultural Website UI/UX Design",
      description: "Empowering Farmers...",
      pages: "40+",
      growth: "36%",
      ceoName: "Md. Imtias Islam",
      ceoTitle: "FarmerCare CEO",
      ceoImg: Ceo1,
      color: "#B4F4BC",
      imgBg: "#5bfa6f",
      projectImg: Img1,
      link: "https://...",
    },
    {
      id: 2,
      title: "MediCare",
      heading: "MediCare – Online Healthcare...",
      description: "A digital health suite...",
      pages: "25+",
      growth: "42%",
      ceoName: "Sarah Jenkins",
      ceoTitle: "MediCare CEO",
      ceoImg: Ceo2,
      color: "#8c8fd1",
      imgBg: "#5f60ec",
      projectImg: Img2,
      link: "https://...",
    },
    {
      id: 3,
      title: "E-commerce",
      heading: "RetroLady — Fashion E-commerce...",
      description: "Minimalist landing page...",
      pages: "60+",
      growth: "55%",
      ceoName: "Marcello Vercetti",
      ceoTitle: "RetroLady CEO",
      ceoImg: Ceo3,
      color: "#ffb5c6",
      imgBg: "#f53e82",
      projectImg: Img3,
      link: "https://...",
    },
    {
      id: 4,
      title: "Investment APP",
      heading: "AgroInvest – Smart Financial Platform...",
      description: "Bridging the gap...",
      pages: "35+",
      growth: "28%",
      ceoName: "Md. Imtias Islam",
      ceoTitle: "FarmerCare CEO",
      ceoImg: Ceo4,
      color: "#ffe082",
      imgBg: "#ffb800",
      projectImg: Img4,
      link: "https://...",
    },
    {
      id: 5,
      title: "NextLearn",
      heading: "NextLearn | LMS-eLearning...",
      description: "Transforming Digital Education...",
      pages: "50+",
      growth: "48%",
      ceoName: "Elena Rodriguez",
      ceoTitle: "NextLearn CEO",
      ceoImg: Ceo5,
      color: "#C9FFF7",
      imgBg: "#00EBC2",
      projectImg: Img5,
      link: "https://...",
    },
  ];

useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // Full URL-er dorkar nai, shudhu endpoint dilei hobe
        const res = await axios.get("/api/industries"); 
        
        const rawData = res.data;
        const arr = Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.data)
          ? rawData.data
          : [];

        if (arr.length > 0) {
          setIndustries(arr);
        } else {
          setIndustries(demoData);
        }
      } catch (err) {
        console.error("Connection failed, using demo data.");
        setIndustries(demoData); // Error hole ba backend bondho thakle demo dekhabe
      }
    };
    fetchIndustries();
  }, []);

  return (
    <section className="w-full bg-[#000000] relative overflow-clip pt-12 md:pt-16 pb-20 font-poppins">
      <div className="max-w-[1440px] px- sm:px-10 md:px-16 mx-auto">
        <div className="text-center mb-16 space-y-3 px-4">
          <h2 className="text-white text-[32px] md:text-[40px] lg:text-[46px] font-extrabold tracking-tight leading-[1.2] md:leading-[1.3]">
            Global Excellence — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">Showcased on Behance</span>
          </h2>
          <p className="text-white/60 text-[16px] md:text-[18px] max-w-[500px] md:max-w-[850px] mx-auto font-medium leading-[1.3] pt-2">
            Explore our high-impact UI/UX Design gallery...
          </p>
        </div>

        <div className="flex flex-col relative items-center pb-[15vh] gap-8 md:gap-8 xl:gap:6">
          {industries.map((item, index) => (
            <Card
              key={item._id || item.id}
              item={item}
              index={index}
              total={industries.length}
            />
          ))}
        </div>

        <div className="flex justify-center md:pb-6 -mt-10 md:-mt-6">
          <a
            href="https://www.behance.net/..."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F7A400] hover:bg-[#02050A] border-2 border-[#F7A400] text-black hover:text-white px-6 md:px-8 py-2 rounded-[5px] font-semibold text-[14px] md:text-[15px] flex items-center gap-4 transition-all shadow-xl group active:scale-95"
          >
            Browse Our Behance Portfolio{" "}
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform"
            />
          </a>
        </div>
      </div>
      
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

export default WorkByIndustry;
