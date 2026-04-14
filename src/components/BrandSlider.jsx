import React, { useState, useEffect } from "react";
import axios from "axios";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);

  // ১. ডাটাবেস থেকে এপিআই এর মাধ্যমে লোগো নিয়ে আসা
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("https://api.campaignsquat.com/api/brands");
        setBrands(res.data);
      } catch (err) {
        console.error("স্লাইডার ডাটা লোড হচ্ছে না:", err);
      }
    };
    fetchBrands();
  }, []);

  // ডাটাবেসে ছবি না থাকলে কিছু দেখাবে না
  if (brands.length === 0) return null;

  // ডিজাইন ঠিক রাখতে লোগোগুলোকে দুই ভাগে ভাগ করা
  const midIndex = Math.ceil(brands.length / 2);
  const firstRow = brands.slice(0, midIndex);
  const secondRow = brands.slice(midIndex);

  return (
    <section className="w-full bg-[#02050A] md:py-4 overflow-hidden font-poppins relative z-10">
      <div className="w-full py-10 md:py-16">
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)] flex flex-col gap-3 md:gap-10">
          {/* Row 1: Left to Right (Admin থেকে আসা লোগো) */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-right whitespace-nowrap items-center pause-on-hover">
              {/* ডিজাইন স্মুথ রাখতে ডাটা ৩ বার রিপিট করা হয়েছে */}
              {[...firstRow, ...firstRow, ...firstRow].map((brand, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12"
                >
                  <img
                    src={brand.url}
                    alt="Brand"
                    className="w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left (Admin থেকে আসা লোগো) */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap items-center pause-on-hover">
              {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map(
                (brand, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12"
                  >
                    <img
                      src={brand.url}
                      alt="Brand"
                      className="w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* এনিমেশন স্টাইল যা আপনি চেয়েছিলেন */}
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-right {
          animation: scroll-right 45s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandSlider;
