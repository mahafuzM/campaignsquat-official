import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Memoized Icons: রেন্ডারিং স্পিড বাড়ানোর জন্য
const RunningIcons = React.memo(() => (
  <div className="relative flex items-center overflow-hidden ml-1 w-7 h-5">
    <div
      className="flex gap-0"
      style={{ animation: "arrowNoGap 3.5s infinite linear" }}
    >
      {[20, 50, 100, 20, 50, 100].map((op, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-black shrink-0 group-hover:text-white"
          style={{ opacity: op / 100 }}
        >
          <path d="M6.45 17.45L11.9 12L6.45 6.55L7.5 5.5L14 12L7.5 18.5L6.45 17.45ZM12.45 17.45L17.9 12L12.45 6.55L13.5 5.5L20 12L13.5 18.5L12.45 17.45Z" />
        </svg>
      ))}
    </div>
  </div>
));

const ProductFormCRM = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.campaignsquat.com/api/products/all",
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-[#02050A] py-16 md:py-32 overflow-hidden px-2">
      <style>
        {`@keyframes arrowNoGap { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }`}
      </style>

      <div className="max-w-[1445px] mx-auto px-2 md:px-12 lg:px-20 xl:px-24">
        <div className="flex flex-col gap-20 md:gap-40">
          {products.map((product, index) => {
            const isReverse = index % 2 !== 0;

            // ✅ Slug Handle Logic
            // যদি স্লাগ থাকে তবে স্লাগ ব্যবহার করবে, না থাকলে আইডি।
            // আর বাটন ইউআরএল বুক মিটিং না হলে সরাসরি ওই ইউআরএল-এ যাবে।
            const productLink =
              product.buttonUrl && product.buttonUrl !== "/book-meeting"
                ? product.buttonUrl
                : `/product/${product.slug || product._id}`;

            return (
              <div
                key={product._id}
                className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-28`}
              >
                {/* --- Text Content Side --- */}
                <div className="flex-1 space-y-6 md:space-y-10 text-left">
                  <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.2]">
                    {product.name}
                  </h2>

                  <p className="text-white text-[16px] md:text-[18px] leading-[1.4] md:leading-[1.5] font-medium ">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4 md:pt-8">
                    <Link
                      to={productLink}
                      className="group flex items-center bg-[#F7A400] text-black hover:text-white font-semibold py-2 px-6 md:py-2.5 md:px-8 rounded-[5px] border-2 border-[#F7A400] hover:bg-transparent transition-all active:scale-95 text-[14px] md:text-[15px] whitespace-nowrap"
                    >
                      <span>{product.buttonText || "Learn More"}</span>
                      <RunningIcons />
                    </Link>
                  </div>
                </div>

                {/* --- Image Side --- */}
                <div className="flex-1 w-full max-w-[540px] md:max-w-none">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-white/5 rounded-[5px] blur-lg group-hover:bg-white/10 transition duration-700"></div>
                    <div className="relative overflow-hidden rounded-[5px] border border-white/10 bg-[#0A0A0A]">
                      <img
                        src={`https://api.campaignsquat.com${product.image.startsWith("/") ? "" : "/"}${product.image}`}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-[250px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductFormCRM;
