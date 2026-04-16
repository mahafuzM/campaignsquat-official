import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Terminal,
  Code,
  Cpu,
  Globe,
  Zap,
  Layers,
  Layout,
  Search,
  TrendingUp,
  BarChart3,
  Briefcase,
  ShieldCheck,
  Database,
  Smartphone,
} from "lucide-react";

// Image Imports
import careerHeroImg from "../assets/images/pexels-fauxels-3182787.jpg";
import environmentIcon from "../assets/images/environment.png";
import moneyIcon from "../assets/images/money.png";
import coffeeIcon from "../assets/images/coffee.png";
import virtualIcon from "../assets/images/virtual-world.png";
import travelIcon from "../assets/images/travel-and-tourism.png";
import Contact from "../components/Contact";
import DynamicSchema from "../components/DynamicSchema";

const iconMap = {
  Terminal,
  Code,
  Layers,
  Globe,
  TrendingUp,
  BarChart3,
  Cpu,
  Zap,
  Layout,
  Search,
  Briefcase,
  ShieldCheck,
  Database,
  Smartphone,
};

const CareersPage = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Local vs Production Dynamic API URL
  const BASE_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "/api";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Direct absolute URL use kora holo jate kono config-e jhamela na hoy
        const res = await axios.get(`${BASE_URL}/api/jobs`);

        if (res.data) {
          // Data format check: res.data direct array hote pare, abar res.data.data o hote pare
          const actualData = Array.isArray(res.data) ? res.data : res.data.data;
          setJobOpenings(Array.isArray(actualData) ? actualData : []);
        }
      } catch (err) {
        console.error("Error loading jobs:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [BASE_URL]);

  const benefits = [
    {
      title: (
        <>
          Excellent Culture <br /> & Environment
        </>
      ),
      img: environmentIcon,
    },
    {
      title: (
        <>
          Performance & <br /> Festival Bonuses
        </>
      ),
      img: moneyIcon,
    },
    {
      title: (
        <>
          Meals, Coffee <br /> & Snacks
        </>
      ),
      img: coffeeIcon,
    },
    {
      title: (
        <>
          Work-Life <br /> Harmony
        </>
      ),
      img: virtualIcon,
    },
    {
      title: (
        <>
          Annual <br /> Pleasure Tour
        </>
      ),
      img: travelIcon,
    },
  ];

  const goldenFilter = {
    filter:
      "invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)",
  };

  const sectionPadding =
    "max-w-[1445px] mx-auto px-4 sm:px-10 md:px-16 lg:px-16 xl:px-18";

  return (
    <>
      <DynamicSchema pageTitle="Careers" />
      <main className="bg-[#02050a] font-poppins min-h-screen">
        <Helmet>
          <title>Careers | Join Our Team at Campaignsquat Ltd</title>
          <meta
            name="description"
            content="Build the future of digital innovation with Campaignsquat Ltd. Explore job openings for software engineers, designers, and analysts."
          />
          <link rel="canonical" href="https://www.campaignsquat.com/careers" />
        </Helmet>

        <style>
          {`
            @keyframes border-rotate { 100% { transform: rotate(360deg); } }
            .running-border-box { position: relative; padding: 3px; overflow: hidden; display: flex; justify-content: center; align-items: center; }
            .running-border-box::before { content: ''; position: absolute; width: 150%; height: 150%; background: conic-gradient(transparent, transparent, transparent, #f7a400); animation: border-rotate 4s linear infinite; }
            .inner-content { position: relative; z-index: 10; background: #02050a; width: 100%; height: 100%; }
          `}
        </style>

        {/* Hero Section */}
        <section className="relative w-full pt-4 pb-16 md:pt-6 md:pb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#F7A400]/5 blur-[100px] md:blur-[140px] rounded-full -z-0"></div>
          <div className={sectionPadding}>
            <div className="flex flex-col items-center text-center mb-16 relative z-10">
              <h1 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.3]">
                Shape the Future of Campaignsquat Ltd with Us
              </h1>
              <p className="text-white text-[18px] md:text-[20px] max-w-[800px] mt-4 font-light">
                We’re a team of passionate designers and thinkers building
                products that people love.
              </p>
            </div>
            <div className="running-border-box rounded-[5px] md:rounded-[10px] max-w-[1250px] mx-auto shadow-2xl">
              <div className="inner-content rounded-[5px] overflow-hidden group">
                <img
                  src={careerHeroImg}
                  alt="Campaignsquat Team"
                  className="w-full h-auto object-cover max-h-[400px] md:max-h-[600px] transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-12 md:py-20 lg:py-24 bg-[#0A0A0A] border-y border-white/5">
          <div className={sectionPadding}>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-white text-[20px] md:text-[32px] lg:text-[40px] font-semibold">
                Why Join Campaignsquat Ltd.
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-start">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 md:w-28 lg:w-32 mb-5 flex items-center justify-center">
                    <img
                      src={benefit.img}
                      alt="Benefit"
                      className="w-16 h-16 md:w-20 lg:w-24 object-contain transition-all duration-500 group-hover:scale-110"
                      style={goldenFilter}
                    />
                  </div>
                  <h3 className="text-white text-[14px] md:text-[18px] font-semibold group-hover:text-[#F7A400] transition-colors">
                    {benefit.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings Section */}
        <section className="py-12 md:py-16 bg-[#02050a] relative z-20">
          <div className={sectionPadding}>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-semibold mb-4">
                Current Openings
              </h2>
              <p className="text-white text-[16px] md:text-[19px] max-w-[850px] mx-auto font-light">
                Explore Our Open Roles And Find The Perfect Opportunity
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F7A400]"></div>
                <span className="ml-3 text-white/50">Loading vacancies...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
                {jobOpenings.length > 0 ? (
                  jobOpenings.map((job, index) => (
                    <div
                      key={job._id || index}
                      className="bg-[#0a0a0a] border border-white/10 rounded-[2px] overflow-hidden flex flex-col group hover:border-[#F7A400]/30 transition-all duration-300"
                    >
                      <div className="p-6 md:p-8 pb-8 flex-grow">
                        <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-[#F7A400]/10 text-[#F7A400] group-hover:bg-[#F7A400] group-hover:text-black group-hover:scale-110 transition-all duration-500">
                          {(() => {
                            // Support for both iconName and legacy icon field
                            const Icon =
                              iconMap[job.iconName] ||
                              iconMap[job.icon] ||
                              Code;
                            return <Icon size={24} />;
                          })()}
                        </div>

                        <h3 className="text-white text-[18px] md:text-[22px] font-bold mb-2 group-hover:text-[#F7A400] transition-colors">
                          {job.title || "Position Title"}
                        </h3>

                        <p className="text-white text-[15px] md:text-[17px] mb-6 font-medium">
                          {job.location || "Remote / Jhenaidah"}
                        </p>

                        <div className="inline-block px-4 py-1.5 rounded-[3px] border border-[#F7A400]/50 text-[#F7A400] text-xs md:text-sm font-semibold group-hover:bg-[#F7A400] group-hover:text-white transition-all">
                          {job.jobType || "Full Time"}
                        </div>
                      </div>

                      <Link
                        to={`/job-details/${job._id}`}
                        className="w-full block bg-[#F7A400] text-black font-semibold py-2 text-center text-[14px] md:text-[15px] border-2 border-[#F7A400] hover:bg-transparent hover:text-white transition-all duration-300"
                      >
                        Job Details
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-lg">
                    <p className="text-white/40 text-[18px]">
                      No job openings found at the moment.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
};

export default CareersPage;
