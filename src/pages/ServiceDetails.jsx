import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import BrandSlider from "../components/BrandSlider";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  // ✅ ১. এই অংশটি আপডেট করা হয়েছে (অটোমেটিক লোকাল বা লাইভ চিনে নেবে)
  const API_BASE =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

  useEffect(() => {
    const controller = new AbortController();

    const fetchServiceDetail = async () => {
      if (!id || id === "undefined") {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // ✅ ২. এখানে `${API_BASE}` ব্যবহার করা হচ্ছে
        const res = await axios.get(`${API_BASE}/api/megamenu/${id}`, {
          signal: controller.signal,
        });

        if (res.data) {
          setService(res.data);
        } else {
          setService(null);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("❌ API Error:", err.message);
          setService(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => controller.abort();
  }, [id, API_BASE]); // API_BASE ডিপেন্ডেন্সিতে যোগ করা হয়েছে
  // ইমেজ ইউআরএল হ্যান্ডলার
  const getFullImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://via.placeholder.com/550x400?text=Campaignsquat";
    if (imagePath.startsWith("http")) return imagePath;

    // ব্যাকস্ল্যাশ ঠিক করা এবং শুরুর স্ল্যাশ বাদ দেওয়া
    const cleanPath = imagePath.replace(/\\/g, "/");
    const finalPath = cleanPath.startsWith("/")
      ? cleanPath.slice(1)
      : cleanPath;

    return `${API_BASE}/${finalPath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02050A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#02050A] text-white flex flex-col items-center justify-center space-y-6 px-6">
        <h2 className="text-8xl font-bold text-[#F7A400] opacity-10">404</h2>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Service Not Found
          </h2>
          <p className="text-white/60">
            The service you are looking for might have been moved or deleted.
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 bg-[#F7A400] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-all"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  // মিসিং ভেরিয়েবলগুলো এখানে ডিফাইন করা হলো
  const finalImageUrl = getFullImageUrl(service.image);
  const seoDescription = service.paragraphText
    ? service.paragraphText.substring(0, 160)
    : "Campaignsquat Service";

  return (
    <div className="min-h-screen bg-[#02050A] text-white pb-20 overflow-hidden font-poppins">
      <Helmet>
        <title>{service.title} | Campaignsquat</title>
        <meta name="description" content={seoDescription} />
        <meta
          property="og:title"
          content={`${service.title} | Campaignsquat`}
        />
        <meta property="og:image" content={finalImageUrl} />
        {/* FAQ Schema Injector */}
        {service.faqData && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faqData.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            })}
          </script>
        )}
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full flex items-start lg:items-center mt-4 md:mt-20 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F7A400]/10 blur-[120px] rounded-full opacity-50"></div>
        <div className="max-w-[1445px] mx-auto lg:px-20 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left px-6">
              {/* ১ নম্বর বক্সের টেক্সট: এখানে headerText না থাকলে title দেখাবে (Fallback) */}
              <h1 className="text-[26px] md:text-[32px] lg:text-[45px] font-bold text-white leading-tight">
                {service.headerText && service.headerText.trim() !== ""
                  ? service.headerText
                  : service.title}
              </h1>
              <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light">
                {service?.paragraphText ||
                  "We deliver high-end solutions for your business growth."}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all transform hover:bg-[#02050A] active:scale-95 shadow-lg shadow-[#F7A400]/10">
                    Start Your Project
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end px-6">
              <img
                src={finalImageUrl}
                alt={service.title}
                className="relative z-10 w-full h-auto max-w-[550px] drop-shadow-2xl rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pt-20 py-12">
        <BrandSlider />
      </section>

      {/* 2. Expertise Section - Premium Design */}
      {service?.expertiseCards?.length > 0 && (
        <section className="bg-[#0A0A0A] py-12 md:py-20 mt-20">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full text-center">
            {/* Section Header */}
            <div className="mb-20 mx-auto">
              <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">
                {service.sec2Title || service.title}
              </h2>
              <p className="text-white text-[16px] md:text-[20px] mx-auto leading-relaxed font-medium max-w-7xl ">
                {service.sec2Desc}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
              {service.expertiseCards.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-[#02050A] border border-white/20 p-10 rounded-[5px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full"
                >
                  {/* Icon Container with Filter Effect */}
                  <div className="mb-6 md:mb-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center md:justify-start relative z-10">
                    {item.img && (
                      <img
                        src={getFullImageUrl(item.img)}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 origin-left"
                        // এই ফিল্টারটি আপনার আইকনকে গোল্ডেন/অরেঞ্জ কালার দিবে হোভার করলে
                        style={{
                          filter:
                            "invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)",
                        }}
                        onError={(e) => {
                          e.target.style.opacity = "0";
                        }}
                      />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-white text-[20px] md:text-[22px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light group-hover:text-white transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F7A400]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ৩. Features Section (নতুন যোগ করা হলো) */}
      {service.featureData && service.featureData.length > 0 && (
        <section className="py-12 md:py-20 bg-[#02050A]">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
            <div className="flex flex-col gap-24 md:gap-44">
              {service.featureData.map((item, index) => {
                const isReverse = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}
                  >
                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                      <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8">
                        {item.title}
                      </h2>
                      <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light text-left max-w-[580px]">
                        {item.desc}
                      </p>
                    </div>
                    {/* Image Content */}
                    <div className="w-full md:w-1/2">
                      <div className="relative group overflow-hidden rounded-[5px]">
                        <img
                          src={getFullImageUrl(item.img)}
                          alt={item.title}
                          className="w-full h-auto object-cover rounded-[5px] border border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Process Section */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="w-full bg-[#02050A] py-12 md:py-20">
          <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
            {/* Section Heading */}
            <div className="flex flex-col items-center text-center mb-20 md:mb-28 pt-4 md:pt-4">
              <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold tracking-tight mb-6">
                {service.sec4Title || "Our Process"}
              </h2>
              <p className="text-white text-[16px] md:text-[18px] max-w-5xl mx-auto font-light">
                {service.sec4Desc}
              </p>
            </div>

            {/* Process Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 -mt-6 md:-mt-10">
              {service.processSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Circle & Image Container */}
                  <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                    {/* Rotating Border */}
                    <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>

                    {/* Inner Circle */}
                    <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                      <img
                        src={getFullImageUrl(step.img)}
                        alt={step.title}
                        loading="lazy"
                        className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=Icon";
                        }}
                      />
                    </div>
                  </div>

                  {/* Step Text Content */}
                  <div className="w-full flex flex-col items-center -mt-4">
                    <h3 className="text-white text-[22px] md:text-[24px] lg:text-[26px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white text-[15px] md:text-[16px] leading-relaxed font-light max-w-[280px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Why Choose Section */}
      {/* এখানে নিশ্চিত হচ্ছি service এবং sec5Title দুটোই আছে */}
      {service && service.sec5Title && (
        <section className="py-12 md:py-20 lg:py-40 relative z-[1] overflow-hidden bg-[#0a0a0a]">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 ">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
              {/* Left Content Column */}
              <div className="w-full lg:w-1/2 flex flex-col text-left order-2 lg:order-1 relative z-50">
                <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.3] mb-8">
                  {service.sec5Title}
                </h2>

                <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light mb-10 max-w-[580px]">
                  {service.sec5Desc || ""}
                </p>

                {/* Points List - Safe Mapping */}
                <div className="flex flex-col gap-3 md:gap-4 mb-12">
                  {/* Array.isArray দিয়ে চেক করা জরুরি যাতে ক্র্যাশ না করে */}
                  {Array.isArray(service.points) &&
                    service.points.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full border-2 border-[#F7A400] flex items-center justify-center">
                          <span className="text-[#F7A400] text-[10px]">✔</span>
                        </div>
                        <span className="text-white text-[18px] md:text-[20px] font-medium leading-none group-hover:text-[#F7A400] transition-colors">
                          {point}
                        </span>
                      </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-start relative z-[100]">
                  <a
                    href="/contact"
                    className="bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all duration-300 transform hover:bg-[#02050A] active:scale-95 shadow-lg inline-block text-center"
                  >
                    Book a Free Consultation
                  </a>
                </div>
              </div>

              {/* Right Image Column */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2 relative z-10">
                <div className="relative flex justify-center lg:justify-end">
                  {service.sideImg ? (
                    <img
                      // সরাসরি লিঙ্ক না লিখে ফাংশনটি ব্যবহার করুন
                      src={getFullImageUrl(service.sideImg)}
                      alt={service.sec5Title}
                      className="w-full h-auto max-h-[750px] object-contain shadow-2xl"
                      onError={(e) => {
                        // যদি ইমেজ না পায় তবে এই প্লেসহোল্ডারটি দেখাবে
                        e.target.src =
                          "https://via.placeholder.com/600x800?text=Campaignsquat";
                      }}
                    />
                  ) : (
                    <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Industries Section */}
      {service && service.sec6Title && (
        <section className="py-12 md:py-20 relative z-10 overflow-hidden">
          {/* running border এর জন্য আপনার অরিজিনাল স্টাইল হুবহু রাখা হলো */}
          <style>{`
            @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .border-run-container { position: relative; padding: 2px; overflow: hidden; background: rgba(255, 255, 255, 0.05); border-radius: 7px; }
            .border-run-container:hover .running-border { opacity: 1; }
            .running-border { position: absolute; width: 250%; height: 250%; top: -75%; left: -75%; background: conic-gradient(transparent, transparent, transparent, #F7A400); animation: rotate-border 3s linear infinite; opacity: 0; transition: opacity 0.3s; z-index: 0; }
            .card-content { position: relative; background: #0a0a0a; border-radius: 5px; z-index: 1; height: 100%; }
        `}</style>

          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
            {/* ডাইনামিক হেডার এবং সাবটাইটেল */}
            <div className="text-center max-w-7xl mx-auto mb-16 md:mb-24 ">
              <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-4">
                {service.sec6Title}
              </h2>
              <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-light">
                {service.sec6Desc}
              </p>
            </div>

            {/* ডাইনামিক ইন্ডাস্ট্রি কার্ড গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6 ">
              {service.industryData &&
                service.industryData.map((item, index) => (
                  <div key={index} className="border-run-container group">
                    {/* রানিং বর্ডার ইফেক্ট */}
                    <div className="running-border"></div>

                    <div className="card-content flex flex-col">
                      {/* ডাইনামিক ইমেজ */}
                      <div className="w-full aspect-[4/3] overflow-hidden border-b border-white/5 rounded-t-[5px]">
                        <img
                          src={getFullImageUrl(item.img)} // এটি অটোমেটিক লোকাল বা লাইভ লিঙ্ক তৈরি করবে
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          onError={(e) => {
                            // ইমেজ না পেলে বা লিঙ্ক ভুল হলে এটি দেখাবে
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=Campaignsquat";
                          }}
                        />
                      </div>

                      {/* কার্ডের টেক্সট কন্টেন্ট */}
                      <div className="p-6 md:p-8 flex flex-col text-left">
                        <h3 className="text-white text-xl md:text-[22px] font-bold mb-3 group-hover:text-[#F7A400] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white text-[14px] md:text-[15px] font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 🆕 ৭. FAQ Section (Dynamic Questions) --- */}
      {service.faqData && service.faqData.length > 0 && (
        <section className="w-full bg-[#02050A] py-8 md:py-10 overflow-hidden font-poppins">
          <div className="max-w-[1445px] mx-auto px-5 sm:px-10 md:px-16">
            {/* Header section with your exact padding and font sizes */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-8 leading-[1.2]">
                {service.sec7Title || "Just Ask Us Some Questions"}
              </h2>
              <p className="text-white text-[15px] md:text-[20px] max-w-7xl mx-auto font-light">
                {service.sec7Desc ||
                  "Quick answers to your most frequent inquiries"}
              </p>
            </div>

            {/* Accordion container with space-y-4 */}
            <div className="space-y-4 md:space-y-4">
              {service.faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-[5px] md:rounded-[5px] ${
                    openIndex === index
                      ? "border-[#f7a400] bg-[#0A0A0A]"
                      : "border-[#02050a] bg-[#0A0A0A] hover:border-[#f7a400]"
                  }`}
                >
                  {/* Button with p-4 and text-[15px] to match your static design */}
                  <button
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-[15px] md:text-[18px] font-semibold leading-tight transition-colors duration-300 pr-4 text-white">
                      {faq.question}
                    </span>
                    <span className="shrink-0">
                      {openIndex === index ? (
                        <div className="bg-[#f7a400] p-1 md:p-1.5 rounded-full">
                          <Minus
                            size={18}
                            className="md:w-[22px] md:h-[22px]"
                            strokeWidth={3}
                            color="black"
                          />
                        </div>
                      ) : (
                        <div className="bg-white/10 p-1 md:p-1.5 rounded-full">
                          <Plus
                            size={18}
                            className="md:w-[18px] md:h-[18px]"
                            strokeWidth={3}
                            color="white"
                          />
                        </div>
                      )}
                    </span>
                  </button>

                  {/* Content area with px-5 and pb-6 */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 md:px-8 pb-6 md:pb-8 text-white text-[14px] md:text-[16px] leading-relaxed font-normal">
                      {/* Divider exactly like your sample */}
                      <div className="h-[1px] w-full bg-gray-800/50 mb-5 md:mb-6"></div>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
  /* h1 বা h2 কে গায়েব না করে সেগুলোর ফন্ট সাইজ ছোট করে দিন */
  .service-content-render h1, 
  .service-content-render h2 { 
    display: block !important; 
    font-size: 20px !important; 
    font-weight: 600 !important;
    color: #F7A400 !important;
    margin-bottom: 10px;
  }

  /* ইমেজ যদি ডেসক্রিপশনে দেখাতে না চান তবে এটা থাক, নতুবা মুছে দিন */
  .service-content-render img { 
    max-width: 100%; 
    height: auto; 
    border-radius: 8px;
    margin: 15px 0;
  }

  .service-content-render p { 
    margin-bottom: 15px; 
    opacity: 0.9; 
    line-height: 1.6;
  }

  .service-content-render b, 
  .service-content-render strong { 
    color: #F7A400; 
    font-weight: 600;
  }
`}</style>
    </div>
  );
};

export default ServiceDetails;
