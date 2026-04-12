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
      title: "Ui/Ux Design",
      description:
        "Crafting intuitive and user-centered interfaces that make digital interaction effortless and delightful.",
      image: img1,
      btnText: "Explore More",
      link: "/service/ui-ux-design",
    },
    {
      title: "Web design & Development",
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
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, direction, isPaused, services.length, visibleCount]);

  return (
    <section className="w-full bg-[#02050A]  pb-16 md:pb-24 font-poppins overflow-hidden pt-20 md:pt-20">
      <div className="max-w-[1445px] mx-auto px- sm:px-10 md:px-12 lg:px-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold">
            Service we provides
          </h2>
          <p className="text-white text-[16px] md:text-[20px] mt-4 ">
            Simplifying the complex through elite engineering and design
          </p>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {/* Slider */}
          <div
            className="w-full lg:max-w-[1300px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {services.map((item, index) => (
                <div
                  key={index}
                  className="px-1.5 flex-shrink-0"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                >
                  <div className="group mx-auto flex flex-col items-center bg-white/5 border border-white/10 overflow-hidden w-full h-[480px] md:h-[520px] transition-all duration-300 hover:border-[#F7A400]/40 hover:bg-white/[0.08] hover:-translate-y-2">
                    <div className="w-full h-[240px] md:h-[320px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-between flex-grow text-center w-full">
                      <div className="px-6 pt-6">
                        <h3 className="text-white text-[18px] md:text-[22px] font-bold mb-3 ">
                          {item.title}
                        </h3>
                        <p className="text-white text-[13px] md:text-[15px] line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <Link to={item.link} className="w-full">
                        <button className="w-full bg-[#F7A400] text-black hover:text-white text-[14px] md:text-[15px] font-semibold py-2 md:py-2 border-2 border-[#F7A400] hover:bg-transparent transition-all">
                          {item.btnText}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setCurrentIndex(0)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === 0 ? "bg-[#F7A400] scale-125" : "bg-white/20"
              }`}
            />
            <button
              onClick={() => setCurrentIndex(services.length - visibleCount)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === services.length - visibleCount ? "bg-[#F7A400] scale-125" : "bg-white/20"
              }`}
            />
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link to="/service">
            <button className="px-6 md:px-8 py-2 md:py-2 bg-[#F7A400] text-black hover:text-white text-[14px] md:text-[15px] rounded-[5px] font-semibold border-2 border-[#F7A400] hover:bg-transparent transition-all">
              Explore All Service
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;