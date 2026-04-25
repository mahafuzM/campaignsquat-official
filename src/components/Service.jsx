import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Corrected Image Imports
import img1 from '../assets/images/uiux design.png';
import img2 from '../assets/images/web development.png';
import imgMobile from '../assets/images/mobile app development.png';
import imgSoftware from '../assets/images/software development.png';

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      description:
        "Crafting intuitive and user-centered interfaces that make digital interaction effortless and delightful.",
      image: img1,
      btnText: "Explore More",
      link: "/service/ui-ux-design",
    },
    {
      title: "Web Design & Development",
      description:
        "Building high-performance, future-proof websites designed to grow alongside your business.",
      image: img2,
      btnText: "Explore More",
      link: "/service/web-design-development",
    },
    {
      title: "Software Solutions",
      description:
        "Turning complex business challenges into simple, custom-built software solutions that drive efficiency.",
      image: imgSoftware,
      btnText: "Explore More",
      link: "/service/software-development",
    },
    {
      title: "Mobile App Development",
      description:
        "Creating seamless, high-speed mobile applications that provide a premium experience on both Android and iOS.",
      image: imgMobile,
      btnText: "Explore More",
      link: "/service/mobile-app-development",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("right");
  const [visibleCount, setVisibleCount] = useState(3);

  /* responsive visible count */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* auto slide with bounce */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (direction === "right") {
        if (currentIndex >= services.length - visibleCount) {
          setDirection("left");
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      } else {
        if (currentIndex <= 0) {
          setDirection("right");
        } else {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, direction, isPaused, services.length, visibleCount]);

  return (
    <section className="relative w-full bg-[#000000] py-10 md:py-16 font-poppins overflow-hidden border-t border-white/5">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#F7A400]/10 rounded-full blur-[140px] opacity-30"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00ffd1]/10 rounded-full blur-[160px] opacity-20"></div>
        
        {/* Subtle Dots Background */}
        <div 
          className="absolute inset-0 opacity-[0.2]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(247, 164, 0, 0.4) 1px, transparent 1px)',
            backgroundSize: '35px 35px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1445px] mx-auto px-4 sm:px-6 md:px-12 lg:px-14 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-white text-[32px] md:text-[45px] lg:text-[50px] font-extrabold tracking-tight leading-tight">
            Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] via-[#ffd670] to-[#00ffd1] animate-text-shimmer bg-[length:200%_auto]">We Provide</span>
          </h2>
          <div className="w-24 h-1 bg-[#F7A400] mt-5 rounded-full shadow-[0_0_10px_#F7A400]"></div>
          <p className="text-white/60 text-[15px] md:text-[18px] mt-6 max-w-2xl leading-relaxed font-medium">
            Simplifying the complex through elite engineering and user-centric design
          </p>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {/* Slider Container */}
          <div
            className="w-full lg:max-w-[1300px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {services.map((item, index) => (
                <div
                  key={index}
                  className="px-3 md:px-4 flex-shrink-0"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                >
                  <div className="group relative mx-auto flex flex-col items-center bg-[#050505]/60 backdrop-blur-xl border border-white/5 overflow-hidden w-full h-[480px] md:h-[540px] transition-all duration-500 hover:border-[#00ffd1]/30 hover:bg-white/[0.04] hover:-translate-y-2 rounded-[24px] shadow-xl hover:shadow-[0_20px_40px_rgba(0,255,209,0.1)]">
                    
                    {/* Inner glowing hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffd1]/0 to-[#F7A400]/0 group-hover:from-[#00ffd1]/5 group-hover:to-[#F7A400]/5 transition-colors duration-500 z-0"></div>

                    {/* Image Section */}
                    <div className="w-full h-[240px] md:h-[300px] overflow-hidden border-b border-white/5 relative z-10 flex-shrink-0">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col items-center justify-between flex-grow text-center w-full p-6 md:p-8 relative z-10">
                      <div>
                        <h3 className="text-white text-[20px] md:text-[22px] font-extrabold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F7A400] group-hover:to-[#00ffd1] transition-all duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/50 group-hover:text-white/70 text-[13px] md:text-[14px] line-clamp-3 leading-relaxed transition-colors duration-300 font-medium tracking-wide">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Button */}
                      <Link to={item.link} className="w-full mt-6 block">
                        <button className="group/btn relative overflow-hidden w-full bg-white/5 backdrop-blur-sm text-white hover:text-[#000000] text-[14px] md:text-[15px] font-bold py-3.5 border border-white/10 hover:border-[#F7A400] transition-all rounded-[14px] shadow-sm">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                             {item.btnText}
                          </span>
                          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#F7A400] to-[#ffd670] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2.5 mt-10 md:mt-12">
            {[...Array(Math.max(1, services.length - visibleCount + 1))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentIndex === i 
                  ? "w-8 bg-gradient-to-r from-[#F7A400] to-[#00ffd1] shadow-[0_0_10px_rgba(247,164,0,0.5)]" 
                  : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link to="/service">
            <button className="group relative overflow-hidden bg-[#050505] text-[#F7A400] text-[15px] sm:text-[16px] font-bold py-3.5 px-10 rounded-full border border-[#F7A400]/30 transition-all duration-300 hover:border-[#F7A400]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore All Services
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-[#F7A400]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sweep {
          100% { transform: translateX(100%); }
        }
        .animate-text-shimmer { animation: textShimmer 4s linear infinite; }
      `}</style>
    </section>
  );
};

export default Services;