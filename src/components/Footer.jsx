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
  const CACHE_KEY = "footer_data_cached";
  const [footerData, setFooterData] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
    
    // Default fallback to prevent disappearing if API fails
    return {
      brandName: "CampaignSquat Ltd",
      brandDescription: "CampaignSquat Ltd. is a digital creative agency that helps brands and businesses to achieve their goals by providing creative and innovative solutions.",
      socialLinks: [
        { platform: "facebook", url: "https://facebook.com" },
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "linkedin", url: "https://linkedin.com" }
      ],
      services: [
        { name: "Website Development", link: "/service" },
        { name: "Digital Marketing", link: "/service" }
      ],
      quickLinks: [
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" }
      ],
      contact: { 
        email: "hello@campaignsquat.com", 
        phone: "+880 1700 000000", 
        offices: [{ country: "Bangladesh", address: "Dhaka, Bangladesh" }] 
      },
      hiringStatus: { showCard: false }
    };
  });
  const [loading, setLoading] = useState(true);

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

  // লোডিং অবস্থায় ফুটার এরিয়া খালি রাখা (Layout shift রোধ করতে)
  if (loading && !footerData) return <footer className="w-full bg-[#0A0A0A] h-[300px]"></footer>;
  if (!footerData) return null;

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
                {footerData?.brandName || "CampaignSquat Ltd"}
              </h2>
            </Link>

            <p className="text-white text-[14px] md:text-[16px] leading-[1.6] text-left max-w-[400px]">
              {footerData?.brandDescription}
            </p>

            <div className="flex flex-wrap justify-start gap-3 pt-2">
              {footerData?.socialLinks?.map((social, index) => {
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
              {footerData?.services?.map((service, index) => (
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
              {footerData?.quickLinks?.map((link, index) => (
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
            <ul className="space-y-4 text-white text-[14px] lg:text-[15px] xl:text-[16px]">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-white shrink-0 mt-1" />
                <a
                  href={`mailto:${footerData?.contact?.email}`}
                  className="hover:text-[#f7a400] transition-colors"
                >
                  {footerData?.contact?.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-white shrink-0 mt-1" />
                <a
                  href={`tel:${footerData?.contact?.phone}`}
                  className="hover:text-[#f7a400]"
                >
                  {footerData?.contact?.phone}
                </a>
              </li>
              {footerData?.contact?.offices?.map((office, index) => (
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
      </div>

      {/* Payment Gateways Banner */}
      <div className="w-full border-t border-white/5 pt-6 pb-6 flex items-center justify-center overflow-hidden">
        <div className="max-w-[1445px] mx-auto px-4 w-full flex justify-center">
          <img 
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png" 
            alt="Payment Methods" 
            className="w-full max-w-[85%] sm:max-w-[65%] md:max-w-[450px] lg:max-w-[550px] h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://shop.sslwireless.com/wp-content/uploads/2020/05/SSLCommerz-Pay-With-logo-All-Size-01.png";
            }}
          />
        </div>
      </div>

      {/* Footer Bottom Bar with AI Pattern */}
      <div className="w-full relative border-t border-white/5 py-8 text-center overflow-hidden bg-[#0A0A0A]">
        {/* AI Network Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.6] pointer-events-none transition-all duration-1000"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at top, rgba(247, 164, 0, 0.25) 0%, transparent 70%),
              linear-gradient(to right, rgba(247, 164, 0, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(247, 164, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            transform: 'perspective(400px) rotateX(60deg) scale(3) translateY(-10px)',
            transformOrigin: 'top center'
          }}
        ></div>
        {/* Fading mask to integrate pattern smoothly and eliminate straight edge lines */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, #0A0A0A 0%, transparent 40%),
              linear-gradient(to top, #0A0A0A 0%, transparent 40%),
              radial-gradient(ellipse at center, transparent 20%, #0A0A0A 80%)
            `
          }}
        ></div>

        <p className="relative z-10 px-4 text-[#aeb1b8] text-[14px] md:text-[15px] font-normal tracking-wide max-w-[1445px] mx-auto pt-2">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#f7a400] font-medium">{footerData?.brandName || "CampaignSquat Ltd"}</span> – All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
