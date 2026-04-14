import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, X, ArrowRight } from "lucide-react";

const AgencyComparison = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://api.campaignsquat.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/agency-comparison`);
        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !data) return null;

  return (
    <section className="bg-[#02050A] py-16 md:py-24 px-4 md:px-6 font-Inter selection:bg-[#F7A400] selection:text-black overflow-hidden">
      <div className="max-w-[1350px] mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-8 text-center md:text-left">
          <h2 className="text-[22px] md:text-[30px] lg:text-[36px] font-semibold tracking-[tight] leading-[1.2] md:leading-[1.3] text-white">
            {data?.titlePart1 || "What Do You Get By Choosing"} <br />
            <span className="text-[#F7A400]">
              {data?.brandName || "Campaignsquat?"}
            </span>
          </h2>

          <a
            href="/book-meeting"
            className="group inline-flex items-center gap-3 bg-[#F7A400] border-[#F7A400] border-2 text-black hover:text-white font-bold py-3.5 px-8 md:py-4 md:px-10 text-[15px] md:text-[16px] rounded-[5px] transition-all transform hover:bg-transparent active:scale-95 shadow-xl shadow-[#F7A400]/20 w-full md:w-fit justify-center"
          >
            Book an Intro Call
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* --- Comparison Table (Desktop & Tablet) --- */}
        <div className="hidden md:grid grid-cols-12 items-stretch">
          {/* 1. Features Labels - 50% Width with Icons */}
          <div className="col-span-6 flex flex-col">
            <div className="h-24 flex items-center justify-center bg-[#0A0D14] border-b border-white/5 rounded-tl-[10px]">
              <span className="text-white font-semibold text-[18px] md:text-[20px] lh:text-[22px]">
                Features
              </span>
            </div>
            {data?.comparisonList?.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex items-center px-8 py-6 bg-[#0A0D14] border-b border-white/5 last:rounded-bl-[10px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F7A400]" />{" "}
                  {/* Bullet Icon */}
                  <span className="text-white font-semibold text-[16px] lg:text-[18px] leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Your Brand (Center) - 25% Width */}
          <div
            className="col-span-3 flex flex-col relative z-10 scale-y-105 bg-[#EB5324] shadow-[0_20px_50px_rgba(235,83,36,0.3)]"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 92%, 0% 100%)",
            }}
          >
            <div className="h-24 flex items-center justify-center border-b border-black/10">
              <h3 className="text-white font-semibold tracking-tighter text-[18px] lg:text-[22px]">
                {data?.brandName || "Campaignsquat"}
              </h3>
            </div>
            <div className="flex-1 flex flex-col pb-12">
              {data?.comparisonList?.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex items-center justify-center py-6 border-b border-black/10 last:border-b-0"
                >
                  <div className="w-10 h-10  flex items-center justify-center">
                    <Check size={28} className="text-white" strokeWidth={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Competitors - 25% Width */}
          <div className="col-span-3 flex flex-col">
            <div className="h-24 flex items-center justify-center bg-[#0A0D14] border-b border-white/5 rounded-tr-[10px]">
              <span className="text-white font-semibold text-[18px] md:text-[20px] lh:text-[22px]">
                {data?.competitorLabel || "Others"}
              </span>
            </div>
            {data?.comparisonList?.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex items-center justify-center py-6 bg-[#0A0D14] border-b border-white/5 last:rounded-br-[10px]"
              >
                {item.othersHasIt ? (
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Check
                      size={20}
                      className="text-green-500"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <X size={20} className="text-red-500" strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Mobile View (Stack Logic) --- */}
        <div className="md:hidden space-y-6">
          {/* Highlighted Brand Card */}
          <div
            className="bg-[#EB5324] p-8 rounded-[15px] shadow-2xl relative overflow-hidden"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 96%, 0% 100%)",
            }}
          >
            <h3 className="text-black font-black text-center text-[20px] mb-8 pb-4 border-b border-black/10">
              {data?.brandName || "Campaignsquat Ltd"}
            </h3>
            <div className="space-y-6 pb-10">
              {data?.comparisonList?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-black font-bold text-[15px] max-w-[70%]">
                    {item.label}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                    <Check size={20} className="text-black" strokeWidth={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Card */}
          <div className="bg-[#0A0D14] p-8 rounded-[15px] border border-white/5">
            <h3 className="text-white/40 font-black uppercase text-center text-[16px] mb-8 pb-4 border-b border-white/5">
              {data?.competitorLabel || "Others"}
            </h3>
            <div className="space-y-6">
              {data?.comparisonList?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/60 font-medium text-[14px] max-w-[70%]">
                    {item.label}
                  </span>
                  {item.othersHasIt ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Trust Badge --- */}
        <p className="text-center mt-16 md:mt-20 text-[#00B359] text-[12px] md:text-[14px] font-medium tracking-[2px] md:tracking-widest">
          Trusted by Industry Leaders Worldwide
        </p>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
        .font-Inter {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </section>
  );
};

export default AgencyComparison;
