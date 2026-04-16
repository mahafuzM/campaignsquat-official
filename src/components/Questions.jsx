import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Minus } from "lucide-react";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        // ✅ ডোমেইন সরিয়ে শুধু এন্ডপয়েন্ট ব্যবহার করা হয়েছে
        const res = await axios.get("/api/faqs");
        if (res.data) {
          // সিরিয়াল মেইনটেইন করে স্টেটে সেট করা
          const sortedFaqs = res.data.sort(
            (a, b) => (a.order || 0) - (b.order || 0),
          );
          setFaqs(sortedFaqs);
        }
      } catch (err) {
        console.error("FAQ fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading) return null;

  return (
    <section className="w-full bg-[#02050A] py-8 md:py-10 overflow-hidden font-poppins">
      <div className="max-w-[1445px] mx-auto px-4 sm:px-10 md:px-16">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-8 leading-[1.2]">
            Just Ask Us Some Questions
          </h2>
          <p className="text-white text-[16px] md:text-[20px] max-w-2xl mx-auto font-light">
            Quick answers to your most frequent inquiries
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq._id || index}
              className={`border transition-all duration-300 rounded-[5px] md:rounded-[5px] ${
                openIndex === index
                  ? "border-[#f7a400] bg-[#0A0A0A]"
                  : "border-[#02050a] bg-[#0A0A0A] hover:border-[#f7a400]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
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

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
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
  );
};

export default Questions;