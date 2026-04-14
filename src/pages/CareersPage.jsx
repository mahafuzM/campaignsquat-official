import React, { useEffect, useState } from "react"; // ১. useState অ্যাড করলাম
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios"; // ২. ডাটা ফেলার জন্য axios লাগবে
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
  ShieldCheck, // নতুন যোগ করা হলো
  Database, // নতুন যোগ করা হলো
  Smartphone, // নতুন যোগ করা হলো
} from "lucide-react";

// ইমেজ ইমপোর্ট (বাকি সব সেম)
import careerHeroImg from "../assets/images/pexels-fauxels-3182787.jpg";
import environmentIcon from "../assets/images/environment.png";
import moneyIcon from "../assets/images/money.png";
import coffeeIcon from "../assets/images/coffee.png";
import virtualIcon from "../assets/images/virtual-world.png";
import travelIcon from "../assets/images/travel-and-tourism.png";
import Contact from "../components/Contact";
import DynamicSchema from "../components/DynamicSchema";

const iconMap = {
  Terminal: Terminal,
  Code: Code,
  Layers: Layers,
  Globe: Globe,
  TrendingUp: TrendingUp,
  BarChart3: BarChart3,
  Cpu: Cpu,
  Zap: Zap,
  Layout: Layout,
  Search: Search,
  Briefcase: Briefcase,
  // নতুন ৩টি আইকন নিচে যোগ করা হলো
  ShieldCheck: ShieldCheck,
  Database: Database,
  Smartphone: Smartphone,
};
const CareersPage = () => {
  // ৩. ডাইনামিক ডাটা রাখার জন্য স্টেট
  const [jobOpenings, setJobOpenings] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // ৪. ব্যাকএন্ড থেকে ডাটা ফেচ করা
    const fetchJobs = async () => {
      try {
        // CareersPage.jsx এর ৪ নম্বর স্টেপে:
        const res = await axios.get("https://api.campaignsquat.com/api/jobs");
        setJobOpenings(res.data);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    };
    fetchJobs();
  }, []);

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
    "max-w-[1445px] mx-auto px- sm:px-10 md:px-16 lg:px-16 xl:px-18";

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

        {/* Hero Section (Unchanged) */}
        <section className="relative w-full pt-4 pb-16 md:pt-6 md:pb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#F7A400]/5 blur-[100px] md:blur-[140px] rounded-full -z-0"></div>
          <div className={sectionPadding}>
            <div className="flex flex-col items-center text-center mb-16 relative z-10">
              <h1 className="text-white text-[26px] md:text-[32px] lg:text-[40px] text-bold leading-[1.3]">
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

        {/* Why Join Section (Unchanged) */}
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

        {/* ৩. Current Openings Section */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
              {/* jobOpenings অ্যারে কি না তা চেক করে লুপ চালানো হচ্ছে */}
              {Array.isArray(jobOpenings) &&
                jobOpenings.map((job, index) => (
                  <div
                    key={job._id || index}
                    className="bg-[#0a0a0a] border border-white/10 rounded-[2px] overflow-hidden flex flex-col group hover:border-[#F7A400]/30 transition-all duration-300"
                  >
                    <div className="p-6 md:p-8 pb-8 flex-grow">
                      {/* আইকন রেন্ডারিং লজিক - আপনার iconMap অনুযায়ী */}
                      {/* আইকন রেন্ডারিং লজিক */}
                      <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-[#F7A400]/10 text-[#F7A400] group-hover:bg-[#F7A400] group-hover:text-black group-hover:scale-110 transition-all duration-500">
                        {(() => {
                          const Icon = iconMap[job.iconName] || Code;
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
                        {job.jobType || job.type || "Full Time"}
                      </div>
                    </div>

                    <Link
                      to={`/job-details/${job._id}`}
                      className="w-full block bg-[#F7A400] text-black font-semibold py-2 text-center text-[14px] md:text-[15px] border-2 border-[#F7A400] hover:bg-transparent hover:text-white transition-all duration-300"
                    >
                      Job Details
                    </Link>
                  </div>
                ))}
            </div>

            {/* যদি কোনো জব না থাকে তার জন্য একটি সেফটি মেসেজ */}
            {jobOpenings.length === 0 && (
              <p className="text-white/40 text-center mt-10">
                No job openings found at the moment.
              </p>
            )}
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
};

export default CareersPage;
