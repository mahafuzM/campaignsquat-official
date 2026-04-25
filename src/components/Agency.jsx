import React from 'react';
import processImg from '../assets/images/process-img.png';

const Agency = () => {
  return (
    /* pt-0 use kora hoyeche jate upore gap na thake, ebong -mt (negative margin) diye arektu upore tola hoyeche */
    <section className="w-full bg-[#02050A] pt-0 pb-8 md:pb-16 -mt-2 md:-mt-4 flex justify-center items-center overflow-hidden">
      
      {/* Container */}
      <div className="max-w-[1445px] w-full mx-auto px-8 sm:px-14 md:px-20 lg:px-24 flex justify-center">
        
        <div className="w-full flex justify-center items-center">
          <img 
            src={processImg} 
            alt="Agency Process" 
            className="
              w-full 
              h-auto 
              max-w-[1200px] 
              max-h-[350px] md:max-h-full 
              object-contain 
              brightness-110
              transition-transform
              duration-500
              hover:scale-[1.02]
            "
          />
        </div>
        
      </div>
    </section>
  );
};

export default Agency;