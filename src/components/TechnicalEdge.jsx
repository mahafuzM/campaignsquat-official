import React, { useState, useEffect } from "react";
import axios from "axios";
import * as LucideIcons from "lucide-react";

const TechnicalEdge = () => {
  // ১. মেমোরি থেকে ইনস্ট্যান্ট ডেটা লোড (আপনার লজিক ঠিক আছে)
  const [data, setData] = useState(() => {
    const saved = sessionStorage.getItem("cached_tech_edge");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(!data);

  // ✅ ডাইনামিক বেস ইউআরএল (লোকাল এবং লাইভ দুই জায়গায় কাজ করবে)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/technical-edge`);
        if (res.data) {
          setData(res.data);
          sessionStorage.setItem("cached_tech_edge", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ আইকন রেন্ডার করার পারফেক্ট লজিক
  const DynamicIcon = ({ name, size = 22 }) => {
    if (!name) return <LucideIcons.Box size={size} />;

    const formattedName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

    const IconComponent = LucideIcons[formattedName] || LucideIcons.Box;
    return <IconComponent size={size} strokeWidth={2.5} />;
  };

  // ডেটা না থাকলে কিছুই দেখাবে না
  if (!data && loading) return null;

  return (
    <section className="bg-[#02050A] py-24 relative overflow-hidden font-Inter selection:bg-[#F7A400] selection:text-black">
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] pointer-events-none opacity-30"></div>

      {/* --- Main Sentinel Frame Container (Max Width 1440 with equal padding) --- */}
      <div className="max-w-[1440px] mx-auto px-2 md:px-12 lg:px-16 relative z-10">
        <div className="p-[1px] rounded-[5px] bg-gradient-to-r from-[#F7A400]/60 via-white/20 to-[#F7A400]/40 overflow-hidden group">
          <div className="bg-[#06080E] rounded-[25px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#F7A400]/20 transition-all duration-1000"></div>

            {/* Header Section */}
            <div className="text-center mb-20 relative z-10">
              <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white tracking-tighter mb-4 ">
                {data?.mainHeader || "The Technical Edge"}
              </h2>
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-white to-[#F7A400]/80">
                  {data?.subTitle ||
                    "Strategic Assets included with every partnership"}
                </span>
              </h3>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {data?.assets?.map((asset, index) => (
                <div
                  key={index}
                  className="bg-[#04060B]/90 backdrop-blur-md border border-white p-8 rounded-[5px] flex flex-col transition-all duration-500 hover:border-[#F7A400]/40 group/card min-h-[280px]"
                >
                  {/* Icon Section */}
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#f7a400] mb-10 group-hover/card:text-black group-hover/card:bg-[#F7A400] transition-all duration-500 shadow-[0_0_20px_rgba(247,164,0,0.1)]">
                    <DynamicIcon name={asset.icon} />
                  </div>

                  {/* Single Line Title */}
                  <h4 className="text-[18px] md:text-[22px] font-black text-white leading-tight mb-4 tracking-tight group-hover/card:text-[#F7A400] transition-colors">
                    {asset.title}
                  </h4>

                  {/* Description */}
                  <p className="text-white text-[14px] md:text-[15px] leading-relaxed group-hover/card:text-white transition-colors flex-grow">
                    {asset.description || asset.desc}
                  </p>

                  {/* Bottom Glow Line */}
                  <div className="mt-auto pt-8">
                    <div className="h-[1px] w-0 bg-gradient-to-r from-[#F7A400] via-white to-transparent group-hover/card:w-full transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap");
        .font-Inter {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </section>
  );
};

export default TechnicalEdge;
