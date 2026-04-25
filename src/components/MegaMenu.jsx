import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uiIcon from "../assets/images/curve.png";
import webIcon from "../assets/images/coding.png";
import softIcon from "../assets/images/stack.png";
import mobIcon from "../assets/images/mobile-development.png";

const MegaMenu = () => {
  // ১. জিরো ল্যাগ লজিক: শুরুতে মেমোরি (SessionStorage) থেকে ডাটা নিবে
  const [dbData, setDbData] = useState(() => {
    const savedMenu = sessionStorage.getItem("cached_megamenu");
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  const categories = [
    { title: "UI/UX Design", image: uiIcon, path: "/service/ui-ux-design" },
    {
      title: "Web Design & Development",
      image: webIcon,
      path: "/service/web-design-development",
    },
    {
      title: "Software Development",
      image: softIcon,
      path: "/service/software-development",
    },
    {
      title: "Mobile App Development",
      image: mobIcon,
      path: "/service/mobile-app-development",
    },
  ];

 useEffect(() => {
    const fetchMenu = async () => {
      try {
        // ✅ ইউআরএল থেকে ডোমেইন সরিয়ে শুধু এন্ডপয়েন্ট দিন
        // এখন এটি App.jsx এর baseURL ব্যবহার করবে
        const res = await axios.get("/api/megamenu");

        if (res.data && Array.isArray(res.data)) {
          // ২. লজিক: নতুন সার্ভিস সবার আগে (1st) দেখাবে
          const latestFirst = [...res.data].reverse();

          setDbData(latestFirst);
          // ৩. পরবর্তী ভিজিটের জন্য মেমোরিতে সেভ করে রাখা
          sessionStorage.setItem(
            "cached_megamenu",
            JSON.stringify(latestFirst),
          );
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="w-full pointer-events-auto z-[50]">
      <div className="w-full">
        <div className="bg-[#0A0A0A] border-[1px] lg:border-[2px] border-[#8C9096]/30 rounded-[12px] p-4 md:p-8 lg:p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-[#02050A] border border-[#8C9096]/20 rounded-xl p-4 md:p-6 transition-all duration-300 flex flex-col group hover:border-[#F7A400] hover:shadow-[0_0_20px_rgba(247,164,0,0.1)]"
              >
                <Link
                  to={cat.path}
                  className="flex items-center gap-3 mb-4 cursor-pointer group/title"
                >
                  <div className="w-9 h-9 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center p-2 shrink-0 group-hover/title:scale-110 transition-transform">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white font-bold text-[14px] md:text-[17px] leading-tight group-hover/title:text-[#F7A400] transition-colors">
                    {cat.title}
                  </h3>
                </Link>

                <div className="w-full h-[1px] bg-[#8C9096]/10 mb-4"></div>

                <ul className="space-y-3">
                  {/* যদি ডাটা লোড হতে সময় নেয়, তবে খালি না রেখে অন্তত ১টা কঙ্কাল বা আগের ডাটা দেখাবে */}
                  {dbData.length > 0 ? (
                    dbData
                      .filter((item) => item.category === cat.title)
                      .map((subItem, idx) => (
                        <li key={idx}>
                          <Link
                            to={`/service-details/${subItem.slug || subItem._id}`}
                            className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer group/item transition-all"
                          >
                            <span className="text-[#F7A400] text-lg font-black transition-transform group-hover/item:translate-x-1">
                              →
                            </span>
                            <span className="text-[12.5px] md:text-[14.5px] font-medium">
                              {subItem.title}
                            </span>
                          </Link>
                        </li>
                      ))
                  ) : (
                    /* ডাটা না আসা পর্যন্ত হালকা এনিমেশন বা প্লেসহোল্ডার */
                    <div className="space-y-2 animate-pulse">
                      <div className="h-3 bg-gray-800 w-3/4 rounded"></div>
                      <div className="h-3 bg-gray-800 w-1/2 rounded"></div>
                    </div>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
