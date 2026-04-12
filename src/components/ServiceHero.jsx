import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/images/background-01-copyright (1).jpg';

const SarviceHero = () => {
  return (
    <section className="w-full bg-[#0a0a0a] overflow-hidden ">
      
      <div className="w-full relative">
        
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden shadow-2xl">
          
          {/* 1. Background Image */}
          <div 
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: `url("${heroImg}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.9) contrast(1.1)' 
            }}
          ></div>

          {/* 2. Light Overlay */}
          <div className="absolute inset-0 bg-black/30 z-[1]"></div>

          {/* 3. Content Layer */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-2 md:px-20">
            
            {/* Title */}
            <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-[1000] text-white mb-6 md:whitespace-nowrap tracking-tight leading-tight drop-shadow-lg">
              Digital Product Design & Consulting
            </h1>

            {/* 4. Description (p tag) - Nicely arranged in 2 lines */}
            <p className="text-[18px] md:text-[20px] text-white ">
            Bridging the gap between complex tech and intuitive design. We build scalable, market-ready digital products from your ideas.
            </p>

            

          </div>
        </div>

      </div>
    </section>
  );
};

export default SarviceHero;