import React from 'react';
import { Compass, Lightbulb, Handshake, ShieldCheck } from 'lucide-react';

const AboutPartnerWithUs = () => {
  // Vercel deployment trigger comment
  const reasons = [
    {
      title: "Strategy-First Approach",
      description: "We take the time to understand your business goals before we write a single line of code.",
      icon: <Compass className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Cutting-Edge Technology",
      description: "We stay ahead of the curve, utilizing the latest frameworks and design trends to keep you competitive.",
      icon: <Lightbulb className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Transparency & Collaboration",
      description: "We view our clients as partners. You are involved in every step of the process.",
      icon: <Handshake className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Quality Assured",
      description: "Excellence is our standard. Every project undergoes rigorous testing to ensure it is bug-free.",
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />,
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24 font-['Poppins'] overflow-hidden">
      <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Title Section */}
        <div className="mb-16">
          <div className="inline-block px-6 py-2 border border-[#1a3a1f] rounded-[5px] bg-[#051109] mb-6">
            <h2 className="text-[#00ff41] text-[12px] md:text-[14px] font-medium ">
              The Campaignsquat Edge
            </h2>
          </div>
          
          <h3 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white tracking-tighter leading-none block">
            Why Partner With Us?
          </h3>
        </div>

        {/* Interactive Minimalist List */}
        <div className="flex flex-col">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group py-8 md:py-10 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-500 hover:bg-white/[0.03] cursor-default px-2"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="text-white group-hover:text-[#f7a400] transition-colors duration-300">
                  {reason.icon}
                </div>
                <h4 className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-white transition-all duration-500 transform group-hover:translate-x-3">
                  {reason.title}
                </h4>
              </div>

              <div className="max-w-2xl group-hover:opacity-100 transition-all duration-500 lg:group-hover:-translate-x-4">
                <p className="text-white text-[14px] md:text-[16px] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10 w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutPartnerWithUs;