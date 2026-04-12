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

      {/* Main Content Container: max-w-1440px and centered */}
      <div className="max-w-[1440px] mx-auto px- sm:px-10 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Text Content */}
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight">
              Don't Miss Out the Future!
            </h2>
            <p className="text-white text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Stay updated with our latest insights and innovations.
            </p>
          </div>

          {/* Subscription Form Container */}
          <div className="w-full lg:w-[600px]">
            <form className="flex flex-col sm:flex-row items-center gap-4 bg-[#02050A]/90 backdrop-blur-md p-1 rounded-[5px] border border-white/10 focus-within:border-[#f7a400] transition-all w-full shadow-">
              <input 
                type="email" 
                placeholder="Enter email here" 
                className="w-full flex-1 bg-transparent px-5 py-3 text-white focus:outline-none placeholder:text-gray-500 text-base md:text-lg"
                required
              />
              <button 
                type="submit"
                className=" bg-[#f7a400] text-black hover:text-white font-semibold px-2 md:px-8 py-2 text-[14px] md:text-[15px] rounded-[5px] flex items-center justify-center  border-2 border-[#F7A400] hover:bg-[#02050A]  transition-all duration-300  group "
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