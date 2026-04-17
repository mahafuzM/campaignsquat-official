import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  ChevronsRight,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";

import {
  FileCode as BehanceIcon,
  Pin as PinterestIcon,
} from "lucide-react";

const RunningIcons = () => (
  <div className="relative flex items-center overflow-hidden ml-1 w-8 h-6">
    <div
      className="flex gap-0"
      style={{ animation: "arrowNoGap 3.5s infinite linear" }}
    >
      {[20, 50, 100, 20, 50, 100].map((op, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white shrink-0"
          style={{ opacity: op / 100 }}
        >
          <path d="M6.45 17.45L11.9 12L6.45 6.55L7.5 5.5L14 12L7.5 18.5L6.45 17.45ZM12.45 17.45L17.9 12L12.45 6.55L13.5 5.5L20 12L13.5 18.5L12.45 17.45Z" />
        </svg>
      ))}
    </div>
  </div>
);

const Footer = () => {
  const CACHE_KEY = "footer_data";

  const [footerData, setFooterData] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(!footerData);

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
    twitter: Twitter,
    pinterest: PinterestIcon,
    behance: BehanceIcon,
    dribbble: Dribbble,
    dribble: Dribbble,
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("/api/footer");
        if (res.data) {
          setFooterData(res.data);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Footer Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  // Default values to prevent returning null
  const data = footerData || {
    brandName: "CampaignSquat Ltd",
    brandDescription: "Your Trusted Technology Partner",
    socialLinks: [],
    services: [],
    quickLinks: [],
    contact: { email: "info@campaignsquat.com", phone: "", offices: [] },
    hiringStatus: { showCard: false }
  };

  // Improved placeholder to avoid layout shift
  if (loading && !footerData) {
    return <footer className="w-full bg-[#0A0A0A] min-h-[400px]"></footer>;
  }

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-12 md:pt-20 pb-10 font-poppins border-t border-white/5">
      <style>
        {`@keyframes arrowNoGap { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }`}
      </style>

      <div className="max-w-[1445px] mx-auto px-2 sm:px-10 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16 md:mb-20">
          {/* Column 1: Brand Info */}
          <div className="flex-[1.5] space-y-6 md:space-y-8">
            <Link
              to="/home"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <h2 className="text-[20px] md:text-[22px] font-bold text-white tracking-tight">
                {data?.brandName || "CampaignSquat Ltd"}
              </h2>
            </Link>

            <p className="text-white text-[14px] md:text-[16px] leading-[1.6] text-left max-w-[400px]">
              {data?.brandDescription}
            </p>

            <div className="flex flex-wrap justify-start gap-3 pt-2">
              {data?.socialLinks?.map((social, index) => {
                // platform নাম ছোট হাতের করে চেক করা হচ্ছে
                const platform = social?.platform || "";
                const Icon = socialIcons[platform.toLowerCase()];
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-white hover:bg-[#f7a400] hover:text-black hover:border-[#f7a400] transition-all duration-300 shadow-sm"
                  >
                    {Icon ? <Icon size={20} /> : <ChevronsRight size={20} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex-1 text-left">
            <Link to="/service" onClick={() => window.scrollTo(0, 0)}>
              <h4 className="text-[20px] md:text-[22px] font-bold mb-6 md:mb-8 text-white tracking-wider hover:text-[#f7a400] transition-colors cursor-pointer inline-block">
                Services
              </h4>
            </Link>
            <ul className="space-y-3 text-white text-[14px] md:text-[16px]">
              {data?.services?.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-2 group cursor-pointer"
                >
                  <ChevronsRight
                    size={18}
                    className="text-white group-hover:translate-x-1 transition-transform"
                  />
                  <Link
                    to={service.link}
                    className="hover:text-[#f7a400] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex-1 text-left">
            <h4 className="text-[20px] md:text-[22px] font-bold mb-6 md:mb-8 text-white tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-white text-[14px] md:text-[16px]">
              {data?.quickLinks?.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-2 group cursor-pointer"
                >
                  <ChevronsRight
                    size={18}
                    className="text-white group-hover:translate-x-1 transition-transform"
                  />
                  <Link
                    to={link.url}
                    className="hover:text-[#f7a400] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex-1 text-left">
            <h4 className="text-[20px] md:text-[22px] font-bold mb-4 md:mb-6 text-white tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white text-[16px]">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-white shrink-0 mt-1" />
                <a
                  href={`mailto:${data?.contact?.email}`}
                  className="hover:text-[#f7a400] break-all"
                >
                  {data?.contact?.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-white shrink-0 mt-1" />
                <a
                  href={`tel:${data?.contact?.phone}`}
                  className="hover:text-[#f7a400]"
                >
                  {data?.contact?.phone}
                </a>
              </li>
              {data?.contact?.offices?.map((office, index) => (
                <li key={index} className="flex items-start gap-3">
                  <MapPin size={20} className="text-white shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-bold block mb-1 text-[14px] md:text-[16px]">
                      {office.country}
                    </span>
                    <p className="leading-snug text-white text-[12px] md:text-[14px]">
                      {office.address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hiring CTA Card */}
        {data?.hiringStatus?.showCard && (
          <div className="bg-[#02050A] border border-white/10 rounded-[5px] p-8 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-lg">
            <div className="text-center lg:text-left">
              <h3 className="text-[20px] md:text-[22px] font-bold mb-2 text-white tracking-tight">
                {data.hiringStatus.title}
              </h3>
              <p className="text-white text-[16px] max-w-xl mb-5">
                {data.hiringStatus.description}
              </p>

              <style>{`
                @keyframes whiteToOrange {
                  0% { color: #ffffff; text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff; }
                  100% { color: #F7A400; text-shadow: 0 0 10px #F7A400, 0 0 20px #F7A400, 0 0 40px #F7A400; }
                }
                .blinking-neon { font-weight: 800; letter-spacing: 1px; animation: whiteToOrange 2s ease-in-out infinite alternate; display: inline-block; }
              `}</style>

              {data.hiringStatus.isHiring && (
                <div>
                  <h4 className="blinking-neon text-[14px] md:text-[16px] lg:text-[18px] font-semibold mb-4 ">
                    {data.hiringStatus.hiringNotice}
                  </h4>
                </div>
              )}
            </div>

            <Link
              to="/careers"
              className="w-full sm:w-auto bg-[#f7a400] text-black font-semibold px-6 py-2 rounded-[5px] border-2 border-[#F7A400] flex items-center justify-center hover:bg-[#0A0A0A] hover:border-[#F7A400] transition-all text-[12px] md:text-[15px] group hover:text-white"
            >
              <div className="flex items-center">
                <span>Click Here</span>
                <RunningIcons />
              </div>
            </Link>
          </div>
        )}

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/5 pt-10 text-center">
          <p className="text-white text-[14px] md:text-[18px] font-light">
            © {new Date().getFullYear()}{" "}
            {data?.brandName || "CampaignSquat Ltd"}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
