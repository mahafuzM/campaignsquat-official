import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";
import Contact from "../components/Contact";

const JobdetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionPadding = "max-w-[1300px] mx-auto px-6 sm:px-10 md:px-16";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.campaignsquat.com/api/jobs/${id}`,
        );
        setJob(res.data);
      } catch (err) {
        console.error("API Error:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#02050a] min-h-screen flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-bold font-poppins">
          Loading Job Details...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-[#02050a] min-h-screen text-white flex flex-col justify-center items-center text-center px-4 font-poppins">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Job Not Found!</h2>
        <Link to="/careers" className="text-[#F7A400] underline">
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#02050a] font-poppins min-h-screen pt-28 pb-20 text-white">
      <div className={sectionPadding}>
        {/* --- Header Section --- */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white mb-8">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-6 md:gap-8 text-white/90">
            <div className="flex items-center gap-3 text-[14px] md:text-[16px]">
              <FaMapMarkerAlt className="text-[#F7A400]" />
              <span>Location: {job.location}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] md:text-[16px]">
              <FaBriefcase className="text-[#F7A400]" />
              <span>Type: {job.jobType}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] md:text-[16px]">
              <FaMoneyBillWave className="text-[#F7A400]" />
              <span>Salary: {job.salary}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] md:text-[16px]">
              <FaClock className="text-[#F7A400]" />
              <span>Shift: {job.shift}</span>
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {job.sections &&
              job.sections.map((section, index) => (
                <section key={index}>
                  {/* 1. Heading */}
                  {section.type === "heading" && (
                    <h2 className="text-[20px] md:text-[22px] font-bold text-[#F7A400] mb-6 border-l-4 border-[#F7A400] pl-4">
                      {section.value}
                    </h2>
                  )}

                  {/* 2. Text / Summary Style */}
                  {(section.type === "text" || section.type === "summary") && (
                    <div
                      className={`text-white/80 text-[16px] md:text-[18px] leading-relaxed p-6 ${section.type === "summary" ? "bg-white/5 border border-white/10 rounded-2xl italic shadow-inner" : ""}`}
                    >
                      {section.type === "summary" && (
                        <FaInfoCircle className="text-[#F7A400] mb-3 text-2xl" />
                      )}
                      <p>{section.value}</p>
                    </div>
                  )}

                  {/* 3. List Style (Standard Bullets) */}
                  {/* 3. List Style (With Title Support) */}
                  {section.type === "list" && (
                    <div className="space-y-6">
                      {/* যদি লিস্টের জন্য কোনো টাইটেল থাকে (অ্যাডমিন থেকে আসা) */}
                      {section.value && (
                        <h2 className="text-[20px] md:text-[22px] font-bold text-[#F7A400] mb-6 border-l-4 border-[#F7A400] pl-4">
                          {section.value}
                        </h2>
                      )}

                      <ul className="grid gap-4 md:gap-5">
                        {section.items &&
                          section.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex gap-4 text-white/90 text-[14px] md:text-[16px]"
                            >
                              <FaCheckCircle className="text-[#F7A400] mt-1 shrink-0 text-xl md:text-2xl" />
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* 4. Core Requirements Style (Label & Description) */}
                  {/* 4. Requirements Style (Updated for List View) */}
                  {section.type === "requirements" && (
                    <div className="space-y-6">
                      <h3 className="text-[18px] font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-wider text-white/70">
                        <FaShieldAlt className="text-[#F7A400]" />{" "}
                        {section.value || "Core Requirements"}
                      </h3>

                      {/* এখানে grid-cols-1 রাখা হয়েছে যাতে একটির নিচে একটি আসে */}
                      <div className="grid grid-cols-1 gap-5">
                        {section.requirementItems &&
                          section.requirementItems.map((item, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row gap-2 text-[16px] md:text-[18px] leading-relaxed"
                            >
                              {/* ডট বা বুলেট পয়েন্টের মতো কাজ করবে */}
                              <span className="text-[#F7A400] font-bold shrink-0">
                                • {item.label}:
                              </span>
                              <span className="text-white/90">{item.desc}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
          </div>

          {/* Right Column: Sidebar (Benefits & Apply) */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] border border-white/20 p-10 rounded-3xl sticky top-32 shadow-2xl">
              <h2 className="text-[18px] md:text-[20px] font-bold text-white mb-8 border-b border-white/10 pb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-4 md:space-y-5 mb-10">
                {[
                  "Competitive Salary + Commission",
                  "Two Weekly Holidays",
                  "Subsidized Lunch & Snacks",
                  "Two Festival Bonuses",
                  "Yearly Salary Review",
                  "Health Insurance (After 1 Year)",
                  "Indoor Games Facilities",
                  "Excellent Work Environment",
                ].map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-[14px] md:text-[15px] text-white/90 font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#F7A400] shadow-[0_0_10px_#F7A400]"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                to="/apply-job"
                state={{ jobTitle: job.title }}
                className="w-full block"
              >
                <button className="bg-[#F7A400] text-black hover:text-white font-bold py-4 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 text-[15px] shadow-lg hover:bg-transparent w-full uppercase tracking-wider">
                  Apply Now
                </button>
              </Link>

              <p className="text-center text-white/40 mt-8 text-xs leading-relaxed">
                Or send your resume to: <br />
                <span className="text-white/80 font-medium select-all">
                  careers@campaignsquat.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
};

export default JobdetailsPage;
