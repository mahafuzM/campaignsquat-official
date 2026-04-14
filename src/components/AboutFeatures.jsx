import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.campaignsquat.com/api/about-features")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="w-full bg-[#0A0A0A] py-16 md:py-24 font-poppins pt-4 md:pt-6">
      <div className="max-w-[1445px] mx-auto px-2 sm:px-10 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="max-w-[900px] mx-auto text-center mb-16">
          <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.2] mb-6">
            What SetsCampaignSquat Apart
          </h2>
          <p className="text-white font-normal leading-relaxed text-[16px] md:text-[18px] lg:text-[20px]">
            We combine technical precision with creative strategy to build
            digital solutions that don't just work—they perform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((item) => (
            <div
              key={item._id}
              className="group p-8 md:p-10 rounded-[5px] bg-[#02050A] border border-white/5 hover:border-[#F7A400] transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center border border-[#F7A400] shrink-0 transition-transform group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F7A400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    {/* ✅ আইকন ডাইনামিক পাথ */}
                    <path d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-[20px] md:text-[22px] lg:text-[24px] leading-tight group-hover:text-[#F7A400] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-white font-normal text-[15px] md:text-[16px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
