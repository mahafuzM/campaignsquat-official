import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchX, ArrowRight } from "lucide-react";

const ProjectFilter = () => {
  // ১. মেমোরি (sessionStorage) থেকে ডাটা চেক করা যাতে ২য় বার রিফ্রেশ ছাড়া লোডিং না লাগে
  const [cases, setCases] = useState(() => {
    const saved = sessionStorage.getItem("cached_projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(cases.length === 0);
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeProjectTab") || "All";
  });

  const BASE_URL = "https://api.campaignsquat.com";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (cases.length === 0) setLoading(true);

        const res = await axios.get(`${BASE_URL}/api/projects`);

        if (res.data && Array.isArray(res.data)) {
          // এটি নিশ্চিত করবে যে আইডি অনুযায়ী বড় (নতুন) আইডি সবার আগে থাকবে
          const sortedData = [...res.data].sort((a, b) => {
            return b._id.toString().localeCompare(a._id.toString());
          });

          setCases(sortedData);
          sessionStorage.setItem("cached_projects", JSON.stringify(sortedData));
        }
      } catch (err) {
        console.error("Error loading projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("activeProjectTab", activeTab);
  }, [activeTab]);

  // ২. 'useMemo' ব্যবহার করে ফিল্টারিং স্পিড বাড়ানো (স্মুথ ট্যাব সুইচিং)
  const filteredCases = useMemo(() => {
    return activeTab === "All"
      ? cases
      : cases.filter((item) => item.category === activeTab);
  }, [activeTab, cases]);

  const categories = [
    "All",
    "Website Development",
    "Ecommerce Development",
    "UI/UX Design",
    "Software Development",
    "Mobile App Development",
  ];

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/800x600?text=No+Image";
    if (img.startsWith("http")) return img;
    const fileName = img.split("/").pop();
    return `${BASE_URL}/uploads/${fileName}`;
  };

  // ৩. Skeleton Loading State (যখন প্রথমবার ডাটা আসবে)
  if (loading && cases.length === 0)
    return (
      <section className="w-full bg-[#02050A] pt-20 pb-20 px-4 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-[#0A0A0A] border border-gray-900 rounded-[10px] h-[420px] animate-pulse overflow-hidden"
            >
              <div className="w-full h-[250px] bg-gray-800/30" />
              <div className="p-8 space-y-4">
                <div className="h-3 bg-gray-800/50 w-1/3" />
                <div className="h-6 bg-gray-800/50 w-full" />
                <div className="h-4 bg-gray-800/50 w-1/2 pt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <section className="w-full bg-[#02050A] pt-10 md:pt-20 font-['Poppins'] pb-20">
      <div className="max-w-[1445px] mx-auto px-2 md:px-14 lg:px-18 xl:px-24">
        {/* --- Filter Tabs --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-14 w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-3 py-2 text-[12px] md:text-[15px] font-semibold transition-all border rounded-[2px] whitespace-nowrap ${
                activeTab === category
                  ? "bg-[#F7A400] border-[#F7A400] text-black shadow-[0_10px_20px_rgba(247,164,0,0.2)]"
                  : "bg-transparent border-gray-800 text-white hover:border-[#F7A400]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- Project Grid --- */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCases.map((item) => (
              <div
                key={item._id}
                className="group bg-[#0A0A0A] border border-gray-900 flex flex-col overflow-hidden transition-all duration-500 hover:border-[#F7A400]/50 rounded-[5px] relative"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111]">
                  <img
                    src={getImageUrl(item.imageUrl)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 pb-0 flex-grow flex flex-col text-center">
                  <div className="mb-4">
                    <span className="text-[#F7A400] text-[10px] md:text-[14px]  font-semibold ">
                      {item.category}
                    </span>
                    <h3 className="text-white text-[22px] md:text-[24px] font-semibold mt-2  group-hover:text-[#F7A400] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-white text-[14px] md:text-[15px] leading-relaxed line-clamp-3 mb-8">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto w-full">
                  <Link
                    to={`/projects/${item.fullName}`}
                    className="bg-[#F7A400] text-black hover:bg-[#02050a] hover:text-white font-semibold py-3 text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 w-full  tracking-tighter border-2 border-[#f7a400]"
                  >
                    Read Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-800 rounded-[4px] bg-[#0A0A0A]/30">
            <SearchX size={48} className="text-gray-700 mb-4" />
            <p className="text-white text-lg font-medium italic">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectFilter;
