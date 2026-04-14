import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, SearchX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogContent = () => {
  // ১. মেমোরি (sessionStorage) থেকে সাথে সাথে ডেটা নিয়ে আসা
  const [allPosts, setAllPosts] = useState(() => {
    const saved = sessionStorage.getItem("cached_blogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(allPosts.length === 0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Ui/Ux Design",
    "Web Development",
    "Software Development",
    "Mobile Apps Development",
  ];
  const BASE_URL = "https://api.campaignsquat.com";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs`);

        if (res.data && Array.isArray(res.data)) {
          const sortedData = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          const currentCached = sessionStorage.getItem("cached_blogs");
          if (JSON.stringify(sortedData) !== currentCached) {
            setAllPosts(sortedData);
            sessionStorage.setItem("cached_blogs", JSON.stringify(sortedData));
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ২. ফিল্টারিং লজিক (তোমার অরিজিনাল ডিজাইন ডেটা অনুযায়ী)
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // ক্যাটাগরি ম্যাচিং
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      // সার্চ কোয়েরি ম্যাচিং (টাইটেল, ডেসক্রিপশন এবং ক্যাটাগরি এর মধ্যে খুঁজবে)
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        (post.title?.toLowerCase() || "").includes(query) ||
        (post.description?.toLowerCase() || "").includes(query) ||
        (post.category?.toLowerCase() || "").includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allPosts]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(3);
  };

  const fixImagePath = (path) => {
    if (!path) return "https://via.placeholder.com/800x400";
    let cleanPath = path.replace(/\\/g, "/");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.substring(1);
    return `${BASE_URL}/${cleanPath}`;
  };

  if (loading && allPosts.length === 0) {
    return (
      <div className="bg-[#02030a] min-h-screen flex flex-col items-center justify-center text-white font-poppins">
        <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] uppercase tracking-[4px] font-bold">
          Syncing Campaignsquat Insights...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#02030a] min-h-screen text-white font-poppins selection:bg-white selection:text-black overflow-x-hidden -mt-6 md:-mt-8">
      <div className="max-w-[1440px] mx-auto px-2 md:px-12 lg:px-20 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <aside className="w-full lg:w-[400px] shrink-0 bg-[#0a0a0a] border border-[#ffffff20] rounded-[5px] p-8 py-12 flex flex-col gap-14 h-fit">
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] md:text-[22px] font-semibold text-white">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 bg-[#ffffff10] text-white border border-[#ffffff20] rounded-[5px] px-4 pr-12 focus:outline-none focus:border-[#f7a400] transition-all placeholder:text-white/40"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f7a400] cursor-pointer hover:scale-110 transition-transform">
                  <Search size={20} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <hr className="border-[#ffffff10]" />

            <div className="flex flex-col gap-5">
              <h3 className="text-[20px] md:text-[22px] font-semibold text-white">
                Categories
              </h3>
              <ul className="space-y-6">
                {categories.map((cat, index) => {
                  const isActive = activeCategory === cat;
                  return (
                    <li
                      key={index}
                      onClick={() => handleCategoryChange(cat)}
                      className="flex items-center gap-4 border-b border-[#ffffff10] pb-4 last:border-none cursor-pointer transition-all group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border ${isActive ? "border-[#f7a400]" : "border-white"} flex items-center justify-center transition-colors`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 bg-[#f7a400] rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`text-[16px] md:text-[18px] font-medium transition-colors ${isActive ? "text-[#f7a400]" : "text-white"}`}
                      >
                        {cat}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <hr className="border-[#ffffff10]" />

            <div className="flex flex-col gap-12">
              <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
              {allPosts.slice(0, 2).map((post, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer flex flex-col gap-5 border-b border-[#ffffff10] pb-8 last:border-none last:pb-0"
                >
                  <div className="relative overflow-hidden rounded-[5px] h-48 border border-[#ffffff15]">
                    <div className="absolute top-4 left-4 z-10 bg-[#f7a400] text-white px-5 py-1.5 rounded-[5px] text-[11px] font-bold tracking-widest">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <img
                      src={fixImagePath(post.image)}
                      alt="post"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <Link
                    to={`/blog/${post.url}`}
                    className="text-[16px] md:text-[18px] font-bold leading-tight text-white group-hover:underline underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>

            <hr className="border-[#ffffff10]" />

            <div className="flex flex-col gap-8">
              <h3 className="text-lg font-semibold text-white tracking-widest">
                Tags
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Ui/Ux", "Web Design", "Software", "App"].map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSearchQuery(tag)} // ট্যাগ ক্লিক করলে সার্চ হবে
                    className="border border-[#f7a400] bg-[#f7a400] px-6 py-2 rounded-[5px] text-[12px] md:text-[14px] font-semibold cursor-pointer hover:bg-[#02040a] hover:border-[#f7a400] text-black hover:text-white transition-all text-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 flex flex-col gap-10 bg-[#0a0a0a]">
            {/* সার্চে কিছু না পাওয়া গেলে Empty State */}
            {displayedPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SearchX size={48} className="text-[#f7a400] mb-4 opacity-50" />
                <p className="text-white/60 text-lg">
                  No blogs found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="text-[#f7a400] mt-4 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              displayedPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-[#0a0a0a] border border-[#ffffff15] rounded-[5px] overflow-hidden flex flex-col group"
                >
                  <div className="relative overflow-hidden w-full h-[300px]">
                    <div className="absolute top-5 left-5 z-10 bg-[#f7a400] text-white px-5 py-1.5 rounded text-[11px] font-bold tracking-widest shadow-lg">
                      {post.category}
                    </div>
                    <img
                      src={fixImagePath(post.image)}
                      alt="article"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>

                  <div className="p-6 md:p-10">
                    <div className="flex items-center gap-3 mb-4 text-white">
                      <span className="text-[10px] md:text-[12px] font-medium">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="text-[12px] md:text-[13px] font-medium">
                        By {post.author || "Admin"}
                      </span>
                    </div>

                    <h2 className=" text-[18px] sm:text-[20px] md:text-[28px] font-bold mb-5 text-white leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-white text-[14px] md:text-[18px] leading-[1.3] mb-8 max-w-7xl ">
                      {post.description}
                    </p>

                    <Link
                      to={`/blog/${post.url}`}
                      className="inline-block bg-[#f7a400] border-2 border-[#F7A400] text-black px-6 py-2 rounded-[5px] hover:bg-[#02050A] hover:text-white transition-all text-[14px] md:text-[15px] font-semibold w-fit text-center"
                    >
                      Learn more
                    </Link>
                  </div>
                </article>
              ))
            )}

            {visibleCount < filteredPosts.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="bg-[#f7a400] border-2 border-[#F7A400] text-black px-10 py-2 rounded-[5px] hover:bg-[#02050A] hover:text-white transition-all text-[14px] md:text-[15px] font-semibold shadow-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
