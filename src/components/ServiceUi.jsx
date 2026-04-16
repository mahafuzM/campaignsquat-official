import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ক্যাটাগরি অনুযায়ী ইমেজগুলো ইম্পোর্ট
import uiuxImg from "../assets/images/uiux design.png";
import webDevImg from "../assets/images/web development.png";
import softImg from "../assets/images/software development.png";
import mobileAppImg from "../assets/images/mobile app development.png";

const Services = () => {
  // ১. মেমোরি (SessionStorage) থেকে ডাটা নিয়ে শুরু করা - যাতে ১ সেকেন্ডও দেরি না হয়
  const [dbServices, setDbServices] = useState(() => {
    const savedServices = sessionStorage.getItem("cached_megamenu"); // মেগামেনুর ক্যাশটাই এখানে ইউজ করা হয়েছে
    return savedServices ? JSON.parse(savedServices) : [];
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/megamenu");
        if (res.data) {
          // ২. লজিক: নতুন সার্ভিসগুলো যেন সিরিয়ালের শুরুতে থাকে
          const sortedData = [...res.data].reverse();

          setDbServices(sortedData);
          // ৩. মেমোরি আপডেট করা
          sessionStorage.setItem("cached_megamenu", JSON.stringify(sortedData));
        }
      } catch (err) {
        console.error("Error fetching services for main page:", err);
      }
    };
    fetchServices();
  }, []);

  const serviceCategories = [
    {
      id: "uiux",
      title: "UI/UX Design",
      description:
        "Creating intuitive, user-centric interfaces that blend aesthetics with seamless functionality.",
      image: uiuxImg,
      mainLink: "/service/ui-ux-design",
    },
    {
      id: "web",
      title: "Web Design & Development",
      description:
        "Building high-performance, responsive websites tailored to your business goals.",
      image: webDevImg,
      mainLink: "/service/web-design-development",
    },
    {
      id: "software",
      title: "Software Development",
      description:
        "Scalable and secure custom software solutions to automate and grow your business.",
      image: softImg,
      mainLink: "/service/software-development",
    },
    {
      id: "app",
      title: "Mobile App Development",
      description:
        "Innovative mobile applications designed for seamless performance across iOS and Android.",
      image: mobileAppImg,
      mainLink: "/service/mobile-app-development",
    },
  ];

  return (
    <div className="bg-[#02050A] py-10 md:py-20">
      {serviceCategories.map((category, index) => {
        const isImageRight = index % 2 === 0;

        return (
          <section
            key={category.id}
            className="w-full overflow-hidden pt-2 pb-16 px-2"
          >
            <div className="max-w-[1445px] mx-auto px-2 md:px-16 lg:px-24">
              <div className="w-full border border-white/10 rounded-[5px] p-6 md:p-12 lg:p-16 shadow-2xl bg-[#0A0A0A]">
                <div
                  className={`flex flex-col ${isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch justify-between gap-10 lg:gap-20`}
                >
                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <Link to={category.mainLink} className="inline-block group">
                      <h2 className="text-white text-[22px] md:text-[32px] lg:text-[40px] font-black mb-6 md:mb-8 leading-tight tracking-tight group-hover:text-[#F7A400] transition-colors cursor-pointer">
                        {category.title}
                      </h2>
                    </Link>

                    <p className="text-white text-[16px] md:text-[18px] mb-8 md:mb-10 leading-relaxed font-light opacity-90">
                      {category.description}
                    </p>

                    <div className="flex flex-col w-full">
                      {/* যদি ডাটা থাকে তবে দেখাবে, না থাকলে হালকা প্লেসহোল্ডার */}
                      {dbServices.length > 0 ? (
                        dbServices
                          .filter((item) => item.category === category.title)
                          .map((sub) => (
                            <div
                              key={sub.slug || sub._id}
                              className="w-full group"
                            >
                              <Link
                                to={`/service-details/${sub.slug || sub._id}`}
                                className="flex items-center gap-4 py-3 md:py-4 cursor-pointer"
                              >
                                <svg
                                  className="w-4 h-4 md:w-5 md:h-5 text-[#F7A400] transition-transform duration-300 group-hover:translate-x-2"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                  ></path>
                                </svg>
                                <span className="text-white font-semibold text-[18px] md:text-[20px] lg:text-[22px] transition-all duration-300 group-hover:text-[#F7A400]">
                                  {sub.title}
                                </span>
                              </Link>
                              <div className="w-full h-[1px] bg-white/20 group-hover:bg-[#F7A400]/40 transition-all duration-300"></div>
                            </div>
                          ))
                      ) : (
                        <div className="py-4 space-y-4 animate-pulse">
                          <div className="h-6 bg-gray-900 w-2/3 rounded"></div>
                          <div className="h-6 bg-gray-900 w-1/2 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 lg:self-start lg:sticky lg:top-10">
                    <div className="relative rounded-[5px] overflow-hidden border border-white/10 shadow-sm bg-[#0a0a0a]">
                      <img
                        src={category.image}
                        alt={category.title}
                        loading="lazy"
                        className="w-full h-full min-h-[400px] lg:min-h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Services;
