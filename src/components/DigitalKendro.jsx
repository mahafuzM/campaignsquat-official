import React, { useState, useEffect } from 'react';
import { Shield, Zap, Target, Activity } from 'lucide-react';

// ইমেজ ইমপোর্ট
import img1 from '../assets/images/Amar Vote Kendra app 01.webp';
import img2 from '../assets/images/Amar Vote Kendra app 02.webp';
import img3 from '../assets/images/Amar Vote Kendra app 03.webp';
import img4 from '../assets/images/Amar Vote Kendra app 04.webp';
import img5 from '../assets/images/Amar Vote Kendra app 05.webp';

const DigitalKendro = () => {
  const images = [img1, img2, img3, img4, img5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    { 
      title: "Real-Time Intelligence", 
      icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />, 
      desc: "Centrally monitoring the security pulse of every polling station in real-time." 
    },
    { 
      title: "Tactical Response", 
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, 
      desc: "Engineered ultra-fast communication bridges for lightning-speed reactions." 
    },
    { 
      title: "Bank-Grade Security", 
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, 
      desc: "Military-grade encryption ensuring electoral data integrity and security." 
    }
  ];

  return (
    <section className="relative w-full bg-[#000000] text-white py-16 md:py-24 overflow-hidden font-poppins border-t border-white/5">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-[#00ffd1]/10 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[160px] opacity-30"></div>
        
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(0, 255, 209, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-24 relative z-10">
        
        {/* Partnership Header */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7A400]/10 border border-[#F7A400]/20 text-[#F7A400] text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(247,164,0,0.1)]">
              <Target className="w-3.5 h-3.5" /> Strategic Case Study
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffd1]/10 border border-[#00ffd1]/20 text-[#00ffd1] text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,209,0.1)]">
              <Shield className="w-3.5 h-3.5" /> Official Gov-Tech Integration
            </div>
          </div>
          
          <h2 className="text-[28px] sm:text-[40px] md:text-[50px] lg:text-[55px] font-extrabold leading-[1.1] mb-5 tracking-tight">
            Partnering with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto] inline-block">
              Jhenaidah District Police
            </span>
          </h2>
          <p className="text-[15px] sm:text-[18px] text-white/70 leading-relaxed max-w-3xl mb-8 font-medium">
            A pioneering digital transformation securing democratic processes through real-time intelligence and mission-critical response technology.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 sm:py-4 px-5 rounded-[14px] bg-[#050505]/60 backdrop-blur-md border border-white/10 w-fit shadow-xl">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            </div>
            <p className="text-white/80 text-[13px] md:text-[15px] font-semibold leading-tight">
              Successfully secured the <span className="text-[#F7A400]">13th National Election</span> through seamless digital coordination.
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Simplified Feature Highlights */}
          <div className="lg:col-span-12 xl:col-span-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex flex-col gap-3 p-5 sm:p-6 rounded-[20px] bg-[#050505]/60 backdrop-blur-xl border border-white/5 hover:border-[#00ffd1]/40 transition-all duration-500 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/10 group-hover:to-[#F7A400]/5 transition-colors duration-500"></div>
                  
                  <div className="flex items-start sm:items-center gap-4 relative z-10">
                    <div className="flex-shrink-0 p-3 sm:p-4 rounded-xl bg-[#000] border border-white/5 group-hover:border-[#F7A400]/40 text-[#F7A400] group-hover:text-[#00ffd1] transition-all duration-500 shadow-inner relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-[#F7A400]/0 to-transparent group-hover:from-[#00ffd1]/20 transition-colors duration-500"></div>
                       <span className="relative z-10">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-[17px] sm:text-[19px] font-extrabold text-white mb-1 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1]">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] sm:text-[15px] text-white/50 group-hover:text-white/70 leading-relaxed font-medium transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mockup Display (Slider) */}
          <div className="lg:col-span-12 xl:col-span-6 relative h-[400px] sm:h-[500px] xl:h-[600px] w-full flex items-center justify-center mt-10 lg:mt-0">
            {/* Extremely glowing radial background for the mockup */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(247,164,0,0.15)_0%,rgba(0,255,209,0.05)_50%,transparent_80%)] rounded-full blur-[50px] animate-pulse"></div>
            </div>
            
            <div className="relative h-full w-full flex items-center justify-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center p-2 ${
                    index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.9] pointer-events-none'
                  }`}
                >
                  <img
                    src={img}
                    alt={`App Performance ${index + 1}`}
                    className="w-auto h-full max-h-full object-contain drop-shadow-[0_0_40px_rgba(247,164,0,0.3)] hover:drop-shadow-[0_0_60px_rgba(0,255,209,0.4)] transition-all duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Indicators - Animated Bars */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 sm:h-1.5 transition-all duration-500 rounded-full cursor-pointer ${i === currentIndex ? 'w-8 sm:w-12 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] shadow-[0_0_10px_rgba(247,164,0,0.5)]' : 'w-2 sm:w-3 bg-white/20 hover:bg-white/40'}`}
                  onClick={() => setCurrentIndex(i)}
                ></div>
              ))}
            </div>
          </div>

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

export default DigitalKendro;