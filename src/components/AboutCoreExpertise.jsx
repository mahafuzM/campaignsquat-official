import React from 'react';
import { Layout, Globe, Cpu, Smartphone } from 'lucide-react';

const AboutCoreExpertise = () => {
  const expertiseData = [
    {
      title: "UI/UX Design",
      description: "We bridge the gap between human psychology and digital interfaces, creating designs that are not only beautiful but intuitive and high-converting.",
      icon: <Layout className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-[#f7a400] transition-colors duration-300" />,
    },
    {
      title: "Website Design & Development",
      description: "Whether it’s a landing page or a complex corporate portal, we build responsive, lightning-fast, and SEO-optimized websites tailored to your brand.",
      icon: <Globe className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-[#f7a400] transition-colors duration-300" />,
    },
    {
      title: "Software Development",
      description: "We develop robust, custom software solutions designed to automate your workflows and solve specific business problems.",
      icon: <Cpu className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-[#f7a400] transition-colors duration-300" />,
    },
    {
      title: "Mobile App Development",
      description: "Bringing your ideas to the palm of your hand. We build high-performance iOS and Android applications that users love.",
      icon: <Smartphone className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-[#f7a400] transition-colors duration-300" />,
    }
  ];

  return (
    /* overflow-x-hidden ব্যবহার করা হয়েছে যাতে ডানে-বামে কোনো কিছু স্ক্রিনের বাইরে না যায় */
    <section className="bg-[#0A0A0A] text-white font-['Poppins'] overflow-x-hidden w-full">
      
      {/* 1445px max-width এবং সব ডিভাইসে সমান px-6 (বাম-ডানে ২৪ পিক্সেল) প্যাডিং */}
      <div className="max-w-[1445px] mx-auto px-6 py-16 md:py-24 box-border">
        
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold mb-6 tracking-tight">
            Our Core Expertise
          </h2>
        
          <p className="text-white text-[16px] md:text-[20px] max-w-7xl mx-auto leading-relaxed">
            We specialize in delivering high-quality, scalable, and aesthetically 
            pleasing solutions across four key pillars:
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-8">
          {expertiseData.map((item, index) => (
            <div 
              key={index} 
              className="group p-8 md:p-10 bg-[#02050A] rounded-[5px] border-2 border-white/5 shadow-2xl hover:bg-[#1a1a1a] transition-all duration-500 hover:border-[#f7a400]/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center transition-all">
                   {item.icon}
                </div>
                <h3 className="text-[18px] md:text-[22px] font-semibold text-white group-hover:text-[#f7a400] transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-white text-[14px] md:text-[18px] leading-relaxed group-hover:text-gray-300 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCoreExpertise;