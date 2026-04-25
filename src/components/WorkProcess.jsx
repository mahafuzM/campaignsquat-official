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
    <section className="relative w-full bg-[#000000] py-10 md:py-16 font-poppins overflow-hidden border-t border-white/5">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-[#00ffd1]/10 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute top-[50%] right-[10%] w-[450px] h-[450px] bg-[#F7A400]/10 rounded-full blur-[160px] opacity-20"></div>
      </div>

      <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <h2 className="text-white text-[32px] md:text-[45px] lg:text-[50px] font-extrabold tracking-tight leading-tight">
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">Build Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-[#F7A400] mt-5 rounded-full shadow-[0_0_10px_#F7A400]"></div>
          <p className="text-white/60 text-[15px] md:text-[18px] mt-6 max-w-3xl leading-relaxed font-medium">
            Innovative design thinking meets technical precision for scalable, high-impact digital solutions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {steps.map((step, index) => (
            <div
              key={step._id || index}
              className="flex flex-col items-center text-center group cursor-pointer relative"
            >
              {/* Connecting Line for Desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-[25%] left-[50%] w-[100%] xl:w-[120%] h-[1px] border-t-2 border-dashed border-white/10 z-0"></div>
              )}
              
              {/* Image Circle Container */}
              <div className="relative mb-8 w-32 h-32 md:w-40 lg:w-48 md:h-40 lg:h-48 flex items-center justify-center">
                <div className="absolute top-0 left-[-10px] w-full h-full rounded-full border-[2px] border-[#F7A400]/40 transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0 opacity-50 group-hover:opacity-100 group-hover:border-[#00ffd1] group-hover:shadow-[0_0_30px_rgba(0,255,209,0.3)]"></div>

                <div className="relative w-full h-full rounded-full bg-[#050505] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400] shadow-xl backdrop-blur-md">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/10 group-hover:to-[#F7A400]/10 transition-colors duration-500"></div>
                  <img
                    src={
                      step.image.startsWith("http")
                        ? step.image
                        : `${axios.defaults.baseURL || ''}${step.image}`
                    }
                    alt={step.title}
                    className="w-14 h-14 md:w-24 lg:w-28 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20 group-hover:sepia group-hover:hue-rotate-[180deg]"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full flex flex-col items-center px-4 md:px-0 relative z-10">
                <h3 className="text-white text-[20px] md:text-[24px] lg:text-[26px] font-extrabold mb-3 tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1]">
                  <span className="text-[#F7A400] mr-2">0{index + 1}.</span> {step.title}
                </h3>
                <p className="text-white/50 group-hover:text-white/70 text-[13px] md:text-[15px] lg:text-[16px] leading-relaxed max-w-[280px] md:max-w-none transition-colors duration-300 font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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

export default WorkProcess;