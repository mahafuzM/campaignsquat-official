import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Local vs Production Dynamic API URL
  const BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000" 
    : "https://api.campaignsquat.com";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Dynamic BASE_URL use kora hoyeche
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching details:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id, BASE_URL]);

  if (loading)
    return (
      <div className="text-white text-center py-20 bg-[#02050A] min-h-screen">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="text-white text-center py-20 bg-[#02050A] min-h-screen">
        Product not found!
      </div>
    );

  return (
    <div className="bg-[#02050A] min-h-screen text-white pb-20 overflow-x-hidden">
      {/* ১. ফুল ডিসপ্লে ইমেজ সেকশন */}
      <div className="w-full h-auto md:h-[80vh] relative bg-[#02050A] flex items-center justify-center ">
        <img
          // ✅ Dynamic Image URL with Slash Protection
          src={
            product.image?.startsWith("http") 
              ? product.image 
              : `${BASE_URL}${product.image?.startsWith("/") ? "" : "/"}${product.image}`
          }
          alt={product.name}
          className="w-full h-full object-contain md:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-transparent hidden md:block"></div>
      </div>

      {/* ২. মেইন কন্টেন্ট সেকশন (Max-width 1445px) */}
      <div className="max-w-[1445px] mx-auto px-2 md:px-12 lg:px-20 mt-10 md:-mt-20 relative z-10">
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-20">
          <h1 className="text-[26px] md:text-[30px] lg:text-[40px] font-semibold text-white drop-shadow-2xl">
            {product.name}
          </h1>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] opacity-90 leading-relaxed mx-auto max-w-7xl">
            {product.description}
          </p>
        </div>

        {/* --- ৩. রাইট সাইড আর্টিকেল বিল্ডার ডেটা সেকশন --- */}
        <div className="space-y-12">
          {product.contentSections && product.contentSections.length > 0 ? (
            product.contentSections.map((section, index) => (
              <div key={index} className="w-full">
                {section.type === "heading" && (
                  <h2 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold text-white mb-6 border-l-4 border-[#F7A400] pl-6">
                    {section.value}
                  </h2>
                )}

                {section.type === "text" && (
                  <div className="max-w-[1100px]">
                    <p className="text-[16px] md:text-[20px]  leading-relaxed whitespace-pre-line">
                      {section.value}
                    </p>
                  </div>
                )}

                {section.type === "list" && (
                  <div className="my-8 text-left">
                    <h3 className="text-[18px] md:text-[22px] font-semibold mb-6 text-white">
                      {section.value}
                    </h3>
                    <ul className="space-y-4">
                      {section.items.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start  gap-4 text-[14px] md:text-[16px]"
                        >
                          <span className="text-white text-[15px] md:text-[18px] mt-[-2px]">
                            ✔
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white ">No detailed content available.</p>
          )}
        </div>

        {/* বাটন সেকশন - Back এবং Book A Meeting */}
        <div className="mt-20 flex flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back</span>
          </button>

          <a
            href={product.buttonUrl || "/book-meeting"}
            className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{product.buttonText || "Get the Product"}</span>
          </a>
        </div>

        {/* --- টেস্টিমোনিয়াল সেকশন --- */}
        {product.testimonials && product.testimonials.length > 0 && (
          <div className="mt-40">
            <h2 className="text-4xl font-bold text-center mb-16 underline decoration-[#F7A400] underline-offset-8">
              Client Feedback
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {product.testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-white/[0.02] p-8 rounded-3xl border border-white/10"
                >
                  <div className="text-[#F7A400] text-4xl mb-4">“</div>
                  <p className=" mb-8 text-lg">{t.feedback}</p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    <div className="w-12 h-12 bg-[#F7A400] rounded-full flex items-center justify-center font-bold text-black">
                      {t.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t.user}</h4>
                      <p className="text-sm text-white">{t.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;