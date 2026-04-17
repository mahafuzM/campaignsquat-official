import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, MessageSquare, Calendar, Zap } from "lucide-react";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  // ব্যাকএন্ড URL - এখানে আপনার ব্যাকএন্ডের ফুল পাথ দিন
  const API_URL = "/api/contact-menu";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setMenuItems(res.data || []);
      } catch (err) {
        console.error("Front-end Fetch Error:", err);
      }
    };
    fetchData();
    setIsOpen(window.innerWidth > 768);
  }, []);

  const renderIcon = (iconName) => {
    const props = { className: "w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" };
    switch (iconName?.toLowerCase()) {
      case "calendar":
        return <Calendar {...props} className="text-[#F7A400]" />;
      case "zap":
        return <Zap {...props} className="text-[#F7A400]" />;
      case "whatsapp":
        return (
          <svg viewBox="0 0 24 24" fill="#25D366" {...props}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        );
      default:
        return <MessageSquare {...props} className="text-[#F7A400]" />;
    }
  };

  return (
    <div className="fixed bottom-[90px] md:bottom-[50px] left-0 w-full z-[9999] pointer-events-none">
      <div className="mx-auto px-[24px] md:px-[48px] lg:px-[72px] flex justify-end">
        <div className="flex flex-col items-end pointer-events-auto">
          {isOpen && (
            <div className="flex flex-col items-end gap-[14px] mb-[20px]">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[14px] bg-white/90 backdrop-blur-md px-[20px] py-[10px] rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(247,164,0,0.15)] transition-all border border-white/20 group animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-[#02050A] font-bold text-[11px] md:text-[13px] tracking-wide whitespace-nowrap">
                    {item.text}
                  </span>
                  <div className="flex items-center justify-center p-2 bg-gray-50 rounded-full group-hover:scale-110 group-hover:bg-[#F7A400]/10 transition-all duration-300">
                    {renderIcon(item.icon)}
                  </div>
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(3,90,62,0.3)] hover:shadow-[0_10px_40px_rgba(247,164,0,0.3)] transition-all duration-500 transform active:scale-90 bg-[#035A3E] text-white overflow-hidden group relative`}
          >
            <div className={`absolute inset-0 bg-[#F7A400] transition-transform duration-500 ${isOpen ? "translate-y-0" : "translate-y-full"}`}></div>
            <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
              {isOpen ? <X size={26} strokeWidth={2.5} /> : <MessageSquare size={26} strokeWidth={2} />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );

};

export default FloatingContact;
