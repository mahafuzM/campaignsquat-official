import React, { useState, useEffect } from "react";
import axios from "axios";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাইনামিক বেস ইউআরএল সেটআপ
  

  const demoBrands = [
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchBrands = async () => {
      try {
        const res = await axios.get(`/api/brands`);
        if (isMounted) {
          const brandData = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : [];
          
          // If no data from server, use demo brands
          setBrands(brandData.length > 0 ? brandData : demoBrands);
        }
      } catch (err) {
        console.error("স্লাইডার ডাটা লোড হচ্ছে না:", err);
        if (isMounted) setBrands(demoBrands);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  // Always show something if we have brands (demo or real)
  if (loading && brands.length === 0) {
    return null;
  }

  const midIndex = Math.ceil(brands.length / 2);
  const firstRow = brands.slice(0, midIndex);
  const secondRow = brands.slice(midIndex);

  // Image fallback URL for demo/broken images
  const defaultBrandLogo = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";

  const getImageUrl = (brand) => {
    if (!brand?.url) return defaultBrandLogo;
    return brand.url.startsWith("http")
      ? brand.url
      : `${(axios.defaults.baseURL || "")}${brand.url}`;
  };

  return (
    <section className="relative w-full bg-[#000000] pt-0 md:pt-4 pb-8 md:pb-16 overflow-hidden font-poppins">

      <div className="relative z-10 w-full">
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_15%,_black_85%,transparent_100%)] flex flex-col gap-6 md:gap-12">
          {/* Row 1: Left to Right */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-right whitespace-nowrap items-center pause-on-hover">
              {/* ইনফিনিট লুপের জন্য ডাটা ডাবল করা হয়েছে */}
              {[...firstRow, ...firstRow].map((brand, index) => (
                <div
                  key={`row1-${brand._id || index}`}
                  className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12"
                >
                  <img
                    src={getImageUrl(brand)}
                    alt={brand.name || "Brand"}
                    loading="lazy"
                    onError={(e) => { e.target.src = defaultBrandLogo; }}
                    className="w-full h-full object-contain transition-all duration-500 cursor-pointer scale-90 hover:scale-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap items-center pause-on-hover">
              {[...secondRow, ...secondRow].map((brand, index) => (
                <div
                  key={`row2-${brand._id || index}`}
                  className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12"
                >
                  <img
                    src={getImageUrl(brand)}
                    alt={brand.name || "Brand"}
                    loading="lazy"
                    onError={(e) => { e.target.src = defaultBrandLogo; }}
                    className="w-full h-full object-contain transition-all duration-500 cursor-pointer scale-90 hover:scale-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandSlider;
