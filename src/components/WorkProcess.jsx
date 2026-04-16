import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkProcess = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        // ✅ ফুল ইউআরএল কেটে শুধু এন্ডপয়েন্ট দেওয়া হয়েছে
        const res = await axios.get("/api/work-process");
        setSteps(res.data);
      } catch (err) {
        console.error("Error loading steps:", err);
      }
    };
    fetchSteps();
  }, []);

  return (
    <section className="w-full bg-[#02050A] pt-0 pb-24 md:pb-32 font-poppins overflow-hidden">
      <div className="max-w-[1445px] mx-auto px- sm:px-14 md:px-20 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">
          <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold tracking-tight leading-tight mb-4">
            How We Build Excellence
          </h2>
          <p className="text-[16px] md:text-[18px] text-white max-w-6xl leading-relaxed font-medium">
            Our proven methodology combines innovative design thinking with
            technical precision to deliver high-impact digital solutions that
            scale with your business.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {steps.map((step, index) => (
            <div
              key={step._id || index}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Image Circle Container */}
              <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>

                <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                  {/* ✅ ডাইনামিক ইমেজ ইউআরএল (axios.defaults.baseURL ব্যবহার করা হয়েছে) */}
                  <img
                    src={
                      step.image.startsWith("http")
                        ? step.image
                        : `${axios.defaults.baseURL}${step.image}`
                    }
                    alt={step.title}
                    className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full flex flex-col items-center">
                <h3 className="text-white text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-4 tracking-wide  transition-colors duration-300 group-hover:text-[#F7A400]">
                  {step.title}
                </h3>
                <p className="text-white text-[16px] md:text-[16px] lg:text-[18px] leading-relaxed max-w-[260px] sm:max-w-[240px] md:max-w-none">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;