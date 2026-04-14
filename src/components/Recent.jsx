import React, { useState, useEffect } from "react";
import axios from "axios";
import { Play, X } from "lucide-react";

const Recent = () => {
  const [data, setData] = useState({ title: "", subtitle: "", projects: [] });
  const [activeVideo, setActiveVideo] = useState(null); // পপআপ কন্ট্রোল করার জন্য

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.campaignsquat.com/api/recent-projects",
        );
        if (res.data) setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full bg-[#02050A] py-12 md:py-24 overflow-hidden font-poppins pt-4 md:pt-6">
      <div className="max-w-[1445px] mx-auto px-2 sm:px-14 md:px-14 lg:px-16 xl:px-18 text-center">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-6 tracking-tight text-balance">
          {data.title || "Our Recent Project Videos"}
        </h2>

        <p className="text-white text-[16px] sm:text-[16px] md:text-[20px] max-w-6xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-90">
          {data.subtitle ||
            "Turning complex visions into high-performance reality. Watch our latest work in action."}
        </p>

        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {data.projects &&
            data.projects.map((project, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-[5px] border border-white/10 aspect-[16/10] md:aspect-[16/9.5] lg:aspect-[16/10]"
                onClick={() => setActiveVideo(project)} // ক্লিক করলে ভিডিও পপআপ হবে
              >
                <img
                  src={
                    project.image
                      ? project.image.startsWith("http")
                        ? project.image
                        : `https://api.campaignsquat.com${project.image.startsWith("/") ? "" : "/"}${project.image}`
                      : `https://vumbnail.com/${project.videoId}.jpg`
                  }
                  alt={project.alt || "Recent Project"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-[#f7a400] rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <Play
                      fill="black"
                      color="black"
                      size={32}
                      className="md:size-12 ml-1"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- ফুল স্ক্রিন ভিডিও মোডাল (পপআপ) --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md">
          {/* ক্লোজ বাটন */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 text-white hover:text-[#f7a400] transition-colors z-[10000]"
          >
            <X size={40} />
          </button>

          {/* ভিডিও কন্টেইনার */}
          <div className="w-full max-w-6xl aspect-video relative shadow-2xl border border-white/20">
            <iframe
              src={`https://player.vimeo.com/video/${activeVideo.videoId}?autoplay=1&badge=0&autopause=0`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* বাইরে ক্লিক করলে বন্ধ হবে */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setActiveVideo(null)}
          ></div>
        </div>
      )}
    </section>
  );
};

export default Recent;
