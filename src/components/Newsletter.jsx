import React from 'react';
import { Send } from 'lucide-react';
import newsletterBg from '../assets/images/coding.jpg'; 

const Newsletter = () => {
  return (
    <section 
      className="w-full relative overflow-hidden font-poppins py-16 md:py-24"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay - Jate full display image-er upore text clean fute uthe */}
      <div className="absolute inset-0 bg-[#02050A]/80 z-0"></div>

      {/* Main Content Container: max-w-1350px and centered */}
      <div className="max-w-[1350px] mx-auto px-4 md:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Text Content */}
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 tracking-tight">
              Don't Miss Out the Future!
            </h2>
            <p className="text-[#aeb1b8] text-[15px] sm:text-[16px] md:text-[18px] max-w-[95%] md:max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stay updated with our latest insights and innovations.
            </p>
          </div>

          {/* Subscription Form Container */}
          <div className="w-full lg:w-[600px] mt-2 lg:mt-0 px-2 sm:px-0">
            <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 w-full">
              <input 
                type="email" 
                placeholder="Enter email here" 
                className="w-full sm:flex-1 bg-[#02050A]/90 backdrop-blur-md px-5 py-3.5 md:py-4 rounded-[5px] border border-white/10 focus:border-[#f7a400] text-white focus:outline-none placeholder:text-gray-500 text-[15px] md:text-[16px] transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-[#f7a400] w-full sm:w-auto text-black hover:text-white font-semibold px-6 md:px-8 py-3.5 md:py-4 text-[15px] md:text-[16px] rounded-[5px] shrink-0 flex items-center justify-center gap-2 border-2 border-[#F7A400] hover:bg-[#02050A] transition-all duration-300 group"
              >
                Submit Now
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;