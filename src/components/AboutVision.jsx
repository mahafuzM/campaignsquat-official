import React, { useState, useEffect } from "react";
import axios from "axios";
import visionImgDefault from "../assets/images/pexels-fauxels-3182812.jpg";
import { Link } from "react-router-dom";

const AboutVision = () => {
  const [content, setContent] = useState({
    title: "Your Success is Our Reputation \n Powered by CampaignSquat Ltd",
    description:
      "At Campaignsquat Ltd., we believe that true digital excellence isn’t just about delivering a project; it’s about building a partnership rooted in transparency and integrity. We treat every line of code and every pixel as a reflection of our commitment to your brand. When you choose us, you’re not just hiring an agency—you’re gaining a dedicated team that is as invested in your business growth as you are.",
    imageUrl: visionImgDefault,
  });

  const API_BASE = "/api";

  useEffect(() => {
    const fetchVision = async () => {
      try {
        // ✅ এখানে পাথটা চেঞ্জ করে /api/about-vision-m করে দিলাম (তোর index.js অনুযায়ী)
        const res = await axios.get(`/api/about-vision-m`);

        if (res.data) {
          setContent({
            title: res.data.title || content.title,
            description: res.data.description || content.description,
            // ইমেজ পাথ হ্যান্ডেলিং
            imageUrl: res.data.imageUrl
              ? res.data.imageUrl.startsWith("http")
                ? res.data.imageUrl
                : `${API_BASE}${res.data.imageUrl.startsWith("/") ? "" : "/"}${res.data.imageUrl}`
              : visionImgDefault,
          });
        }
      } catch (err) {
        console.log("Using static fallback content because:", err.message);
      }
    };
    fetchVision();
  }, []);

  return (
    <section className="w-full bg-[#02050A] py-12 md:py-24 font-poppins overflow-hidden pt-4 md:pt-6">
      <div className="max-w-[1445px] mx-auto px-2 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          {/* LEFT SIDE: Image */}
          <div className="w-full lg:w-[46%]">
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-[5px] border border-white/10 shadow-xl ">
              <img
                src={content.imageUrl}
                alt="Our Vision"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = visionImgDefault;
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE: Text */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center text-left">
            <h2 className="text-white font-bold leading-[1.3] md:leading-[1.5] mb-6 text-[28px] md:text-[36px] whitespace-pre-line">
              {content.title}
            </h2>

            <p className="text-white font-normal leading-[1.6] md:leading-[1.5] mb-8 text-[16px] md:text-[18px]">
              {content.description}
            </p>

            <div className="mt-2 flex justify-center sm:justify-start">
              <Link to="/our-projects" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#F7A400] text-black hover:text-white font-semibold py-2 md:py-2 px-6 rounded-[5px] text-[14px] md:text-[15px] hover:bg-transparent border-2 border-[#F7A400] transition-all active:scale-95">
                  Our Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
