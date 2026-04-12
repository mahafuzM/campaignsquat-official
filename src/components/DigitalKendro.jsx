import React, { useState, useEffect } from 'react';

// ইমেজ ইমপোর্ট (পাথ চেক করে নিন)
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

  return (
    <section className="w-full bg-[#050505] text-white">
      <div className="max-w-[1445px] mx-auto lg:px-20 py-16 md:py-24">
        
        {/* CENTERED HEADER SECTION */}
        <div className="text-center max-w-7xl mx-auto mb-20 ">
          <h1 className="font-semibold leading-tight text-[26px] md:text-[32px] lg:text-[40px] mb-6">
            Campaignsquat Ltd’s Tech-Partnership with <span className="text-[#F7A400]">Jhenaidah District Police</span>
          </h1>
          <p className="text-[16px] lg:text-[20px] leading-relaxed ">
            At Campaignsquat Ltd., we believe technology should serve a greater purpose. Our strategic partnership with the Jhenaidah District Police led to the development of the mobile application—a pioneering digital solution designed to secure the 13th National Election.
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 md:gap-16 lg:gap-18">
          
          {/* Left Side: Features List - মোবাইলে এই পুরো অংশটি হিডেন থাকবে */}
          <div className="hidden lg:block lg:w-[90%] space-y-12">
            <h2 className="text-[20px] md:text-[22px] font-semibold text-white border-b border-white/10 pb-4">
              Key Features of "Amar Vote Kendra"
            </h2>
            
            <div className="space-y-6">
              {[
                { 
                  title: "Live Sentinel Monitoring", 
                  icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />, 
                  desc: "Beyond simple tracking, we built a centralized command center to visualize and monitor the security pulse of every polling station across Jhenaidah’s 4 constituencies in real-time." 
                },
                { 
                  title: "Zero-Lag Response Protocol", 
                  icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, 
                  desc: "We engineered an ultra-fast digital bridge between field officers and headquarters, ensuring that law enforcement can react to any situation with lightning speed." 
                },
                { 
                  title: "Precision Geo-Navigation", 
                  icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z" />, 
                  desc: "No more guessing. Our smart location intelligence provides high-accuracy GPS mapping to guide both citizens and security forces to their exact designated booths effortlessly." 
                },
                { 
                  title: "Ironclad Data Integrity", 
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, 
                  desc: "Security is in our DNA. We implemented military-grade encryption to ensure that sensitive electoral data and tactical protocols remain impenetrable to any digital threat." 
                },
                { 
                  title: "The Commander’s Dashboard", 
                  icon: <path d="M3 9h18M3 15h18M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />, 
                  desc: "A sophisticated, data-driven interface that grants the Superintendent of Police a bird’s-eye view, turning complex ground data into actionable strategic insights instantly." 
                }
              ].map((feature, idx) => (
                <div key={idx}>
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="inline-flex text-[#F7A400]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {feature.icon}
                      </svg>
                    </span>
                    {feature.title}:
                  </h3>
                  <p className="text-[13px] md:text-[15px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image slider */}
<div className="w-full lg:w-[50%] flex flex-col">
  {/* মোবাইলে গ্যাপ দূর করতে এবং ফুল উইডথ পেতে w-screen আর -mx-6 ব্যবহার করা হয়েছে */}
  <div className="relative flex-grow w-screen -mx-6  md:w-full md:mx-0 min-h-[500px] lg:min-h-full overflow-hidden">
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`App Screenshot ${index + 1}`}
        /* object-cover নিশ্চিত করবে যেন ডানে-বামে কোনো সাদা বা খালি জায়গা না থাকে */
        className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out ${
          index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    ))}
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default DigitalKendro;