import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Check, Plus, Minus, ArrowRight } from "lucide-react";
import BrandSlider from "../../components/BrandSlider";
import Contact from "../../components/Contact";

const DynamicSeoPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(-1);

  const API_URL = "https://api.campaignsquat.com";

  const getFullImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x300?text=IMAGE";
    if (path.startsWith("http")) return path;
    if (path.includes("/uploads/")) {
      return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    }
    return `${API_URL}/uploads/${path.startsWith("/") ? path.substring(1) : path}`;
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/other-pages/${slug}`);
        let rawData = res.data;

        const safeParse = (data) => {
          if (!data) return [];
          if (typeof data === "string") {
            try {
              return JSON.parse(data);
            } catch (e) {
              return [];
            }
          }
          return data;
        };

        // All Dynamic Parsing
        rawData.expertiseCards = safeParse(rawData.expertiseCards);
        rawData.featureData = safeParse(rawData.featureData);
        rawData.processSteps = safeParse(rawData.processSteps);
        rawData.sec6Points = safeParse(rawData.sec6Points);
        rawData.industryData = safeParse(rawData.industryData); // Section 7
        rawData.faqs = safeParse(rawData.faqs); // ✅ Section 8: FAQ Section
        rawData.seoContentBlocks = safeParse(rawData.seoContentBlocks); // নতুন ৯ নম্বর সেকশন

        setPageData(rawData);
      } catch (err) {
        console.error("Engine Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPageData();
  }, [slug, API_URL]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#02050A] font-black  tracking-widest">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin"></div>
          SCANNING ENGINE...
        </div>
      </div>
    );

  if (!pageData)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-[#02050A] font-black uppercase text-4xl italic">
        404 // DATA_NOT_FOUND
      </div>
    );

  return (
    <div className="bg-[#02050A] min-h-screen font-poppins overflow-x-hidden selection:bg-[#F7A400] selection:text-black">
      <Helmet>
        <title>
          {pageData.metaTitle || pageData.pageTitle} | Campaignsquat
        </title>
        <meta
          name="description"
          content={
            pageData.metaDescription ||
            "Expert UI/UX and Web Development Services"
          }
        />
      </Helmet>

      {/* ================= SECTION 1: HERO SECTION ================= */}
      <section className="relative w-full flex items-start lg:items-center mt-10 md:mt-24 pb-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F7A400]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1445px] mx-auto lg:px-20 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Header & Content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left px-6">
              <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white leading-[1.1]  tracking-tighter">
                {pageData?.pageTitle || "Loading Title..."}
              </h1>

              {/* Content Logic: Safe Render */}
              <div
                className="text-white text-[16px] md:text-[20px] leading-relaxed font-medium max-w-2xl prose prose-invert prose-orange custom-html-content"
                dangerouslySetInnerHTML={{ __html: pageData?.content || "" }}
              />

              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-6">
                <Link
                  to={pageData?.btnLink || "/contact"}
                  className="w-full sm:w-auto"
                >
                  <button className="relative overflow-hidden bg-[#F7A400] border-2 border-[#f7a400] text-black font-semibold py-2 px-12 text-[14px] md:text-[16px] rounded-[5px] transition-all transform hover:bg-transparent hover:text-white active:scale-95 shadow-2xl shadow-[#F7A400]/20 ">
                    {pageData?.btnText || "Start Your Journey"}
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Box Logic: Only render if image exists or show placeholder */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end px-6">
              <div className="relative group">
                <div className="absolute -inset-1  from-[#F7A400] to-transparent rounded-[5xl]   transition duration-1000"></div>
                <img
                  src={
                    pageData?.image
                      ? getFullImageUrl(pageData.image)
                      : "https://via.placeholder.com/580x400?text=Asset+Syncing..."
                  }
                  alt={pageData?.pageTitle || "Hero Asset"}
                  className="relative z-10 w-full h-auto max-w-[580px] rounded-[6px] object-cover border border-white/5   "
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/550x400?text=Asset+Load+Failed";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRAND SLIDER SECTION ================= */}

      <section className="w-full overflow-hidden pt-20 md:pt-30 py-12 md:py-20 ">
        <BrandSlider />
      </section>

      {/* ================= SECTION 2: EXPERTISE SECTION ================= */}
      {pageData.expertiseCards && pageData.expertiseCards.length > 0 && (
        <section className="bg-[#0A0A0A] py-12 md:py-20 mt-20 border-y border-white/5">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full text-center">
            {/* Section Header */}
            <div className="mb-20 mx-auto">
              <h2 className="text-white text-[26px]  md:text-[32px] lg:text-[40px] font-semibold mb-6 ">
                {pageData.sec2Title || "Our Expertise"}
              </h2>
              <p className="text-white text-[16px] md:text-[20px] mx-auto leading-relaxed font-medium max-w-4xl">
                {pageData.sec2Desc}
              </p>
            </div>

            {/* section: 2 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {pageData.expertiseCards.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-[#02050A] border border-white/10 p-10 rounded-[2px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full shadow-lg"
                >
                  <div className="relative z-10 w-full">
                    {/* ✅ ইমেজ সেকশন: বর্ডার ছাড়া, বড় এবং সাদা লুক */}
                    {item.cardImage && (
                      <div className="mb-8 w-20 h-20 flex items-center justify-center transition-all duration-500">
                        <img
                          src={getFullImageUrl(item.cardImage)}
                          alt={item.title}
                          /* brightness-0 invert ব্যবহার করা হয়েছে যাতে রঙিন বা কালো আইকন ধবধবে সাদা দেখায় */
                          className="w-full h-full object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-500"
                          onError={(e) => {
                            e.target.style.display = "none";
                            console.error(
                              `Failed to load image for: ${item.title}`,
                            );
                          }}
                        />
                      </div>
                    )}

                    <h3 className="text-white text-[22px] md:text-[24px] font-semibold mb-4 group-hover:text-[#F7A400] transition-colors  tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light group-hover:text-gray-200 transition-colors font-poppins">
                      {item.desc}
                    </p>
                  </div>

                  {/* গ্রাফিক্স এলিমেন্টস */}
                  {/* নিচের গ্লো ইফেক্ট */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F7A400]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* বাম পাশের এনিমেটেড বর্ডার লাইন */}
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#F7A400] group-hover:h-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 3: CUSTOM STANDALONE SECTION ================= */}
      {(pageData.extraTitle || pageData.extraSubtitle) && (
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[#02050A]">
          {/* Background Glow */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: pageData.extraColor || "#F7A400" }}
          ></div>

          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
              {/* Left Side: Content */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-8 text-left">
                {/* Main Title */}
                <h2 className="text-[28px] md:text-[38px] lg:text-[42px] font-semibold text-white leading-[1.05]  tracking-tighter">
                  {pageData.extraTitle}
                </h2>

                {/* Subtitle/Description */}
                <p className="text-white text-[16px] md:text-[20px] leading-relaxed font-medium max-w-xl">
                  {pageData.extraSubtitle}
                </p>

                {/* Dynamic Button */}
                <div className="pt-4">
                  <Link to={pageData.extraBtnLink || "#"}>
                    <button className="bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all transform hover:bg-[#02050A] active:scale-95 shadow-lg shadow-[#F7A400]/10">
                      {pageData.extraBtnText || "Contact Us"}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Side: Image with floating elements */}
              <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[600px]">
                  {/* Decorative floating dots/glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20"
                    style={{
                      backgroundColor: pageData.extraColor || "#F7A400",
                    }}
                  ></div>

                  {/* Main Image Container */}
                  <div className="relative z-10 rounded-[5px] overflow-hidden border border-white/10 ">
                    <img
                      src={getFullImageUrl(
                        pageData.extraImage || pageData.image,
                      )}
                      alt="Feature"
                      className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x600?text=Asset+Not+Found";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Features Section (অরিজিনাল ডিজাইন - ফিক্সড ভার্সন) */}
      {pageData?.featureData &&
        Array.isArray(pageData.featureData) &&
        pageData.featureData.length > 0 && (
          <section className="py-12 md:py-20 bg-[#02050A]">
            <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
              <div className="flex flex-col gap-24 md:gap-44">
                {pageData.featureData.map((item, index) => {
                  // সেফটি চেক
                  if (!item) return null;

                  // ১. টাইটেল হ্যান্ডলিং (আপনার pageData অনুযায়ী)
                  const titleLines =
                    typeof item.title === "string"
                      ? item.title.split("\n")
                      : Array.isArray(item.title)
                        ? item.title
                        : [item.title || "No Title"];

                  // ২. আপনার getFullImageUrl ফাংশন ব্যবহার করে ইমেজ পাথ ফিক্স
                  const imageUrl = getFullImageUrl(item.img);

                  // ৩. রিভার্স লজিক
                  const isReverse = index % 2 !== 0;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}
                    >
                      {/* Text Content */}
                      <div className="w-full md:w-1/2 pt-4 md:pt-6 text-left">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold mb-8  leading-[1.1]">
                          {titleLines.map((line, i) => (
                            <span key={i} className="block mb-1 last:mb-0">
                              {line}
                            </span>
                          ))}
                        </h2>
                        <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-light max-w-[580px]">
                          {item.desc || "Description not available."}
                        </p>
                      </div>

                      {/* Image Content */}
                      <div className="w-full md:w-1/2">
                        <div className="relative group overflow-hidden rounded-[5px]">
                          <div className="absolute -inset-4 bg-[#F7A400]/5  rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                          <img
                            src={imageUrl}
                            alt={item.title || "feature"}
                            loading="lazy"
                            className="relative z-10 w-full aspect-[16/10] object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] rounded-[5px] "
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

      {/* --- SECTION 5: PROCESS STEPS (DYNAMIC) --- */}
      {pageData?.processSteps &&
        Array.isArray(pageData.processSteps) &&
        pageData.processSteps.length > 0 && (
          <section className="w-full bg-[#02050A] py-12 md:py-20">
            <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 ">
              {/* Main Header: Title & Subtitle from API */}
              <div className="flex flex-col items-center text-center mb-20 md:mb-28 pt-4 md:pt-4">
                <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold tracking-tight mb-6 uppercase">
                  {pageData.processMainTitle || "Our Working Process"}
                </h2>
                <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] max-w-6xl mx-auto font-light">
                  {pageData.processMainSubtitle ||
                    "A transparent workflow designed to deliver maximum impact."}
                </p>
              </div>

              {/* Steps Grid: Dynamic Mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 -mt-6 md:-mt-10">
                {pageData.processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Circle Image Container */}
                    <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                      {/* Rotating Border */}
                      <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>

                      {/* Image Background */}
                      <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                        <img
                          src={getFullImageUrl(step.img)}
                          alt={step.title || "process step"}
                          loading="lazy"
                          className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full flex flex-col items-center -mt-4">
                      <h3 className="text-white text-[22px] md:text-[24px] lg:text-[26px] font-semibold mb-4 group-hover:text-[#F7A400] transition-colors ">
                        {step.title}
                      </h3>
                      <p className="text-white text-[15px] md:text-[18px] leading-relaxed font-light max-w-[280px]">
                        {step.description || step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* --- SECTION 6: WHY CHOOSE US (DYNAMIC) --- */}
      {pageData?.sec6Title && (
        <section className="py-12 md:py-20 lg:py-40 relative z-[1]">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 ">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
              {/* LEFT SIDE: Content & List */}
              <div className="w-full lg:w-1/2 flex flex-col text-left order-2 lg:order-1 relative z-50">
                <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.3] mb-8 ">
                  {pageData.sec6Title}
                </h2>
                <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-light mb-10 max-w-[580px] ">
                  {pageData.sec6Desc}
                </p>

                {/* DYNAMIC LI-LIST */}
                <div className="flex flex-col gap-3 md:gap-4 mb-12">
                  {pageData?.sec6Points?.map((point, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full border-2 border-[#F7A400] flex items-center justify-center">
                        <Check className="text-[#F7A400] w-3.5 h-3.5 md:w-4 md:h-4 stroke-[4px]" />
                      </div>
                      <span className="text-white text-[14px] md:text-[16px] lg:text-[18px]  leading-none group-hover:text-[#F7A400] transition-colors">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="flex justify-start relative z-[100]">
                  <Link
                    to={pageData.sec6BtnLink || "/home/contact"}
                    className="inline-block w-full sm:w-auto cursor-pointer"
                  >
                    <button className="bg-[#F7A400] text-black hover:text-white border-2 border-[#F7A400] text-[14px] md:text-[15px] rounded-[5px] px-8 py-2 font-semibold hover:bg-transparent transition-all duration-500 active:scale-95 shadow-lg shadow-[#F7A400]/20">
                      {pageData.sec6BtnText || "Book a Free Consultation"}
                    </button>
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE: Single Big Image */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2 relative z-10">
                <div className="relative flex justify-center lg:justify-end">
                  <img
                    src={getFullImageUrl(pageData.sec6Image)}
                    alt={pageData.sec6Title}
                    loading="lazy"
                    className="w-full h-auto max-h-[750px] lg:max-h-[850px] object-contain shadow-2xl scale-105 lg:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#F7A400]/5 blur-[120px] rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 7: INDUSTRIES SECTION (DYNAMIC) ================= */}
      {pageData?.industryData && pageData.industryData.length > 0 && (
        <section className="py-12 md:py-20 relative z-10 overflow-hidden">
          <style>{`
            @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .border-run-container { position: relative; padding: 2px; overflow: hidden; background: rgba(255, 255, 255, 0.05); border-radius: 7px; }
            .border-run-container:hover .running-border { opacity: 1; }
            .running-border { position: absolute; width: 250%; height: 250%; top: -75%; left: -75%; background: conic-gradient(transparent, transparent, transparent, #F7A400); animation: rotate-border 3s linear infinite; opacity: 0; transition: opacity 0.3s; z-index: 0; }
            .card-content { position: relative; background: #0a0a0a; border-radius: 5px; z-index: 1; height: 100%; }
        `}</style>

          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
            {/* Main Title & Subtitle */}
            <div className="text-center max-w-6xl mx-auto mb-16 md:mb-24">
              <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold mb-4 ">
                {pageData.industryMainTitle ||
                  "Industry Expertise in High-Performance Solutions"}
              </h2>
              <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-light ">
                {pageData.industryMainSubtitle ||
                  "We deliver world-class solutions across diverse sectors, solving complex business challenges."}
              </p>
            </div>

            {/* Industry Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageData.industryData.map((item, index) => (
                <div key={index} className="border-run-container group">
                  <div className="running-border"></div>
                  <div className="card-content flex flex-col">
                    {/* Card Image */}
                    <div className="w-full aspect-[4/3] overflow-hidden border-b border-white/5 rounded-t-[5px]">
                      <img
                        src={getFullImageUrl(item.img)}
                        alt={item.title || "Industry"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Industry+Image";
                        }}
                      />
                    </div>

                    {/* Card Text Content */}
                    <div className="p-6 md:p-8 flex flex-col text-left">
                      <h3 className="text-white text-[20px] md:text-[22px] font-semibold mb-3 group-hover:text-[#F7A400] transition-colors ">
                        {item.title}
                      </h3>
                      <p className="text-white text-[14px] md:text-[16px]  leading-relaxed group-hover:text-white transition-colors">
                        {item.desc || item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 8: FAQ SECTION (DYNAMIC) ================= */}
      {pageData?.faqs && pageData.faqs.length > 0 && (
        <section className="w-full bg-[#02050A] py-12 md:py-20 overflow-hidden font-poppins">
          <div className="max-w-[1445px] mx-auto px-5 sm:px-10 md:px-16">
            {/* Header: Title & Subtitle */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-8 leading-[1.2] ">
                {pageData.faqMainTitle || "Just Ask Us Some Questions"}
              </h2>
              <p className="text-white text-[16px] md:text-[20px] max-w-5xl mx-auto font-light ">
                {pageData.faqMainSubtitle ||
                  "Quick answers to your most frequent inquiries"}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 md:space-y-4 max-w-8xl mx-auto">
              {pageData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-[5px] md:rounded-[5px] ${
                    openIndex === index
                      ? "border-[#f7a400] bg-[#0A0A0A]"
                      : "border-[#02050a] bg-[#0A0A0A] hover:border-[#f7a400]"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-[15px] md:text-[18px] font-semibold leading-tight transition-colors duration-300 pr-4 text-white ">
                      {faq.question}
                    </span>
                    <span className="shrink-0">
                      {openIndex === index ? (
                        <div className="bg-[#f7a400] p-1 md:p-1.5 rounded-full shadow-[0_0_10px_rgba(247,164,0,0.3)]">
                          <Minus
                            size={18}
                            className="md:w-[22px] md:h-[22px]"
                            strokeWidth={3}
                            color="black"
                          />
                        </div>
                      ) : (
                        <div className="bg-white/10 p-1 md:p-1.5 rounded-full hover:bg-white/20 transition-colors">
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

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-5 md:px-8 pb-6 md:pb-8 text-white text-[14px] md:text-[16px] leading-relaxed font-normal">
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

      {/* ================= SECTION 9: DYNAMIC CONTENT BUILDER (SEO TEXT ONLY) ================= */}
      {pageData?.seoContentBlocks && pageData.seoContentBlocks.length > 0 && (
        <section className="w-full bg-[#02050A] py-16 md:py-24 border-t border-white/5">
          <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full text-white">
            <div className="max-w-8xl flex flex-col space-y-8">
              {pageData.seoContentBlocks.map((block, index) => {
                switch (block.type) {
                  case "h1":
                    return (
                      <h1
                        key={index}
                        className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold leading-tight text-white mb-2"
                      >
                        {block.text}
                      </h1>
                    );
                  case "h2":
                    return (
                      <h2
                        key={index}
                        className="text-[26px] md:text-[30px] lg:text-[38px] font-semibold text-white mt-6 mb-2"
                      >
                        {block.text}
                      </h2>
                    );
                  case "h3":
                    return (
                      <h3
                        key={index}
                        className="text-[24px] md:text-[28px] lg:text-[34px] font-semibold text-white mt-4"
                      >
                        {block.text}
                      </h3>
                    );
                  case "h4":
                    return (
                      <h4
                        key={index}
                        className="text-[20px] md:text-[26px] font-medium text-white"
                      >
                        {block.text}
                      </h4>
                    );
                  case "h5":
                    return (
                      <h5
                        key={index}
                        className="text-[18px] md:text-[22px] font-semibold text-[#F7A400]"
                      >
                        {block.text}
                      </h5>
                    );
                  case "h6":
                    return (
                      <h6
                        key={index}
                        className="text-[16px] font-bold  tracking-widest text-white"
                      >
                        {block.text}
                      </h6>
                    );

                  case "p":
                    return (
                      <div
                        key={index}
                        className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.8] text-white font-light prose-links:text-[#F7A400] prose-links:underline hover:prose-links:text-white transition-all"
                        dangerouslySetInnerHTML={{ __html: block.text }}
                      />
                    );

                  case "list":
                    return (
                      <ul key={index} className="list-none space-y-4 my-6">
                        {block.items?.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-4 text-white text-[16px] md:text-[16px]"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#F7A400] mt-2.5 shrink-0"></div>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>

          {/* প্যারাগ্রাফের ভেতরের লিংকের কালার ফিক্স করার জন্য গ্লোবাল স্টাইল */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .prose-links\\:text-\\[\\#F7A400\\] a {
                color: #F7A400 !important;
                text-decoration: underline;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .prose-links\\:text-\\[\\#F7A400\\] a:hover {
                color: #ffffff !important;
            }
        `,
            }}
          />
        </section>
      )}

      <section className="w-full overflow-hidden pt-20 md:pt-30 py-12 md:py-20 ">
        <Contact />
      </section>
    </div>
  );
};

export default DynamicSeoPage;
