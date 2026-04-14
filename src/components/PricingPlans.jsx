import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Box } from "lucide-react";

const PricingPlans = () => {
  // ১. মেমোরি (sessionStorage) থেকে সাথে সাথে ডেটা চেক করা
  const [pricingData, setPricingData] = useState(() => {
    const saved = sessionStorage.getItem("cached_pricing");
    return saved ? JSON.parse(saved) : {};
  });

  // ক্যাশে ডেটা থাকলে লোডিং স্টেট প্রথমেই false থাকবে
  const [loading, setLoading] = useState(Object.keys(pricingData).length === 0);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categories = Object.keys(pricingData);
    return (
      sessionStorage.getItem("activePricingTab") ||
      (categories.length > 0 ? categories[0] : "")
    );
  });

  const BASE_URL = "https://api.campaignsquat.com";

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        // ব্যাকগ্রাউন্ডে সাইলেন্টলি কল হবে
        const res = await axios.get(`${BASE_URL}/api/pricing/all`);

        if (res.data && Array.isArray(res.data)) {
          const grouped = res.data.reduce((acc, plan) => {
            if (!acc[plan.category]) {
              acc[plan.category] = { plans: [] };
            }
            acc[plan.category].plans.push(plan);
            return acc;
          }, {});

          // আগের ডেটার সাথে নতুন ডেটা চেক করা (যদি আপডেট থাকে তবেই স্টেট আপডেট হবে)
          const currentCached = sessionStorage.getItem("cached_pricing");
          if (JSON.stringify(grouped) !== currentCached) {
            setPricingData(grouped);
            sessionStorage.setItem("cached_pricing", JSON.stringify(grouped));

            // যদি আগে কোনো ক্যাটাগরি সিলেক্ট না থাকে তবে প্রথমটা সেট করো
            const categories = Object.keys(grouped);
            if (!activeCategory && categories.length > 0) {
              setActiveCategory(categories[0]);
            }
          }
        }
      } catch (err) {
        console.error("Pricing Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, [activeCategory]);

  useEffect(() => {
    if (activeCategory) {
      sessionStorage.setItem("activePricingTab", activeCategory);
    }
  }, [activeCategory]);

  // যদি প্রথমবার একদম কোনো ডেটা না থাকে তবেই শুধু লোডিং দেখাবে
  if (loading && Object.keys(pricingData).length === 0) {
    return (
      <div className="bg-[#02050A] min-h-screen flex flex-col items-center justify-center text-white font-poppins">
        <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] uppercase tracking-[4px] font-bold">
          Engineering Strategic Models...
        </p>
      </div>
    );
  }

  const categories = Object.keys(pricingData);
  const currentCategoryData = pricingData[activeCategory];

  return (
    <section className="bg-[#02050A] py-24 px-2 md:px-10 lg:px-20 font-poppins text-white relative overflow-hidden min-h-screen flex items-center perspective-container">
      {/* --- সেই আগের ৩ডি লিকুইড ব্যাকগ্রাউন্ড (Restored) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#F7A400]/15 rounded-full blur-[100px] opacity-60 animate-liquid"></div>
        <div className="absolute bottom-[0%] right-[-5%] w-[45vw] h-[45vw] bg-white/5 rounded-full blur-[100px] opacity-40 animate-liquid-reverse"></div>
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[120px] opacity-50 animate-liquid-slow"></div>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight max-w-4xl mx-auto leading-[1.2] md:leading-[1.3]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] to-[#ffc85e]">
              Discover
            </span>{" "}
            the Best Pricing for Elite{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A400] to-[#ffc85e]">
              Performance
            </span>
          </h2>
          <p className="text-white max-w-6xl mx-auto text-[16px] md:text-[18px] leading-relaxed ">
            Transparent pricing for elite UI/UX design and full-stack
            development. From high-conversion MVPs to massive SaaS ecosystems,
            we deliver the technical edge your brand deserves. No bloat, no
            shortcuts—just pure performance.
          </p>
        </div>

        {/* --- ক্যাটাগরি ট্যাব (বর্ডার ও রানিং এনিমেশন সহ) --- */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex flex-wrap justify-center gap-4 p-4 bg-white/5 border-2 border-[#f7a400] rounded-[5px] backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3 rounded-[5px] transition-all duration-500 overflow-hidden group ${
                  activeCategory === cat
                    ? "text-black font-semibold scale-105"
                    : "text-white hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <>
                    <span className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#F7A400_180deg,transparent_210deg,transparent_360deg)]"></span>
                    <span className="absolute inset-[1.5px] bg-[#F7A400] rounded-[5px] z-0"></span>
                  </>
                )}
                <span className="relative z-10 text-[12px] md:text-[14px] ">
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- ৩ডি কার্ড গ্রিড (Raindrop & 3D Effect Restored) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {currentCategoryData?.plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card-3d relative p-[1.5px] rounded-[5px] transition-all duration-700 group ${
                plan.isPopular
                  ? "bg-gradient-to-b from-[#F7A400] to-transparent shadow-[0_20px_50px_rgba(247,164,0,0.15)]"
                  : "bg-white/10"
              }`}
            >
              <div className="bg-[#080B12]/95 backdrop-blur-2xl h-full p-8 rounded-[24px] flex flex-col relative z-20 overflow-hidden shadow-inner">
                {/* কার্ডের ভেতরে ৩ডি লাইট রিফ্লেকশন */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7A400]/10 rounded-full blur-3xl group-hover:bg-[#F7A400]/20 transition-colors"></div>

                {plan.isPopular && (
                  <div className="absolute top-5 right-5 bg-[#F7A400] text-black text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter z-30">
                    Most Strategic
                  </div>
                )}

                <div className="mb-10">
                  <h4 className="text-white font-semibold text-[20px] mb-4">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[30px] md:text-[36px] font-bold text-white group-hover:text-[#F7A400] transition-colors duration-500">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-400 mt-2">
                    {plan.subText || "per project"}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, i) => {
                    const parts = feature.split(":");
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 transform group-hover:translate-x-1 transition-transform"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
                          <Check size={12} className="text-[#F7A400]" />
                        </div>
                        <div className="text-[14px] leading-snug">
                          <span className="text-white font-bold">
                            {parts[0]}
                            {parts.length > 1 ? ":" : ""}
                          </span>
                          {parts[1] && (
                            <span className="text-gray-400 ml-1">
                              {parts.slice(1).join(":")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-[5px] font-semibold text-[12px] md:text-[15px] transition-all duration-500 flex items-center justify-center gap-3 uppercase tracking-[1px] relative overflow-hidden group/btn ${
                    plan.isPopular
                      ? "bg-[#F7A400] text-black shadow-xl scale-[1.02]"
                      : "bg-[#f7a400] border border-[#f7a400]  text-black hover:bg-[#02050a]  hover:text-white"
                  }`}
                >
                  <span className="relative z-10">Book A Call</span>
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-2 transition-transform relative z-10"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[5px] bg-white/5 border border-white/10 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F7A400]/10 flex items-center justify-center border border-[#F7A400]/20 text-[#F7A400]">
              <Box size={32} />
            </div>
            <div>
              <h5 className="font-black text-lg">Custom Enterprise Stacks</h5>
              <p className="text-sm text-white mt-1 max-w-md">
                Need something bespoke? We engineer digital ecosystems from the
                ground up.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-10 py-2 bg-[#f7a400] border-2 border-[#f7a400] text-black rounded-[5px] font-semibold text-[14px] md:text-[15px]  hover:bg-[#02050a] hover:text-white transition-all"
          >
            Get Custom Quote
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .perspective-container {
          perspective: 2000px;
        }

        /* ৩ডি কার্ড হোভার ইফেক্ট */
        .pricing-card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pricing-card-3d:hover {
          transform: translateY(-15px) rotateX(4deg) rotateY(-2deg);
        }

        /* ৩ডি লিকুইড ব্যাকগ্রাউন্ড এনিমেশন */
        @keyframes liquidMove {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(12%, -18%) scale(1.3) rotate(15deg);
          }
          66% {
            transform: translate(-8%, 12%) scale(0.8) rotate(-15deg);
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        .animate-liquid {
          animation: liquidMove 15s infinite ease-in-out;
        }
        .animate-liquid-reverse {
          animation: liquidMove 20s infinite ease-in-out reverse;
        }
        .animate-liquid-slow {
          animation: liquidMove 30s infinite ease-in-out;
          animation-delay: 3s;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PricingPlans;
