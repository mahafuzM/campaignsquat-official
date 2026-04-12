import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutMission = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/about-mission').then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <section className="w-full bg-[#02050A] py-16 md:py-24 font-poppins pt-4 md:pt-6 px- md:px-6">
      <div className="max-w-[1445px] mx-auto px- md:px-12 lg:px-12 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Mission Card */}
          <div className="group bg-white/5 p-8 md:p-12 rounded-[5px] border border-[#02050A] hover:border-[#F7A400] transition-all duration-300">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#02050A] rounded-full flex items-center justify-center border border-[#F7A400]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={data.missionIcon} />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-[22px] md:text-[26px]">{data.missionTitle}</h3>
            </div>
            <p className="text-white text-[16px] md:text-[18px] leading-relaxed">{data.missionDesc}</p>
          </div>

          {/* Vision Card */}
          <div className="group bg-white/5 p-8 md:p-12 rounded-[5px] border border-[#02050A] hover:border-[#F7A400] transition-all duration-300">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#02050A] rounded-full flex items-center justify-center border border-[#F7A400]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={data.visionIcon} />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-[22px] md:text-[26px]">{data.visionTitle}</h3>
            </div>
            <p className="text-white text-[16px] md:text-[18px] leading-relaxed">{data.visionDesc}</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMission;