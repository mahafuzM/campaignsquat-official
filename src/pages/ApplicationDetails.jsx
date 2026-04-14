import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChevronLeft,
  FaDownload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFileAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchApplicationDetails = async () => {
      try {
        // সরাসরি সব ডাটা থেকে ফিল্টার করা অথবা আইডি দিয়ে স্পেসিফিক ডাটা আনা
        const res = await axios.get(
          `https://api.campaignsquat.com/api/applications/all`,
        );
        const found = res.data.find((item) => item._id === id);

        if (found) {
          setApplication(found);
        } else {
          setApplication(null);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplicationDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#02050a] min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="bg-[#02050a] min-h-screen text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Application Not Found!
        </h2>
        <Link to="/admin/applications" className="text-[#F7A400] underline">
          Back to List
        </Link>
      </div>
    );
  }

  // টাইম ফরম্যাট করার জন্য
  const formattedDate = new Date(application.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <main className="bg-[#02050a] min-h-screen pt-28 pb-20 font-poppins text-white">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-[#F7A400] transition-colors mb-8 group"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Applications</span>
        </button>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Section */}
          <div className="bg-white/5 p-8 md:p-12 border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="bg-[#F7A400]/10 text-[#F7A400] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  Candidate Profile
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {application.full_name}
                </h1>
                <p className="text-white/60 flex items-center gap-2">
                  <FaBriefcase className="text-[#F7A400]" /> Applied for:
                  <span className="text-white font-medium">
                    {application.applied_for}
                  </span>
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-white/40 text-sm mb-1">Applied Date</p>
                <p className="text-white font-medium flex items-center md:justify-end gap-2">
                  <FaCalendarAlt className="text-[#F7A400]" /> {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-[#F7A400] font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-2">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#F7A400]">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Email Address</p>
                      <p className="text-sm md:text-base">
                        {application.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#F7A400]">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Phone Number</p>
                      <p className="text-sm md:text-base">
                        {application.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[#F7A400] font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-2">
                  Professional Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#F7A400]">
                      <FaBriefcase />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Total Experience</p>
                      <p className="text-sm md:text-base">
                        {application.total_exp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#F7A400]">
                      <FaMoneyBillWave />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Expected Salary</p>
                      <p className="text-sm md:text-base">
                        {application.expected_salary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-4">
              <h3 className="text-[#F7A400] font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <FaFileAlt /> Cover Letter
              </h3>
              <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5 leading-relaxed text-white/80 whitespace-pre-line">
                {application.cover_letter}
              </div>
            </div>

            {/* CV Download / View Section */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={application.cv_file}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#F7A400] text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-lg"
                >
                  <FaExternalLinkAlt size={16} />
                  View Resume
                </a>
                <a
                  href={application.cv_file}
                  download
                  className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
                >
                  <FaDownload size={16} />
                  Download CV
                </a>
              </div>
              <p className="text-white/20 text-xs mt-4">
                Note: CV file is hosted at {application.cv_file}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplicationDetails;
