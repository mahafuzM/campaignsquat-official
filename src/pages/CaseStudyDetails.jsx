import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'; // ১. useNavigate যোগ করা হয়েছে

import { 
  FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaShareAlt, FaChevronLeft,
  FaFileAlt, FaUserTie, FaExclamationTriangle, FaBullseye, FaLightbulb, 
  FaListUl, FaCheckCircle, FaTools, FaQuoteLeft, FaArrowRight 
} from 'react-icons/fa';

// ১. Data file import
import { projectsFullDetails } from '../data/projectsData'; 

const CaseStudyDetails = () => {
  const { title: slug } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate(); // ২. হুক কল করা হয়েছে
  
  const [projectContent, setProjectContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // স্লাগ তৈরি করার ফাংশন
  const createSlug = (text) => {
    return text?.toString().toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || '';
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProjectData = () => {
      try {
        setLoading(true);
        
        // সব Keys কনসোলে চেক করার জন্য (প্রয়োজনে ইনস্পেক্ট এলিমেন্টে দেখবি)
        const allKeys = Object.keys(projectsFullDetails);
        
        const projectKey = allKeys.find(key => {
          const formattedKey = createSlug(key);
          const formattedTitleFromData = createSlug(projectsFullDetails[key].title);
          
          // URL স্লাগ যদি ডাটার Key অথবা Title এর সাথে মিলে যায়
          return formattedKey === slug || formattedTitleFromData === slug;
        });

        if (projectKey) {
          setProjectContent(projectsFullDetails[projectKey]);
        } else {
          console.warn("Project not found for slug:", slug);
        }
        setLoading(false);
      } catch (error) {
        console.error("Data Fetch Error:", error);
        setLoading(false);
      }
    };

    getProjectData();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white text-2xl font-['Poppins']">
      Loading Case Study...
    </div>
  );

  if (!projectContent) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white font-['Poppins']">
      <h2 className="text-2xl mb-4">Project Not Found!</h2>
      <p className="mb-6 text-gray-400">Slug: {slug}</p>
      {/* URL Update here */}
      <Link to="/our-projects" className="text-[#f7a400] underline">Back to Projects</Link>
    </div>
  );

  return (
    <section className="w-full bg-[#0A0A0A] font-['Poppins'] text-white selection:bg-white selection:text-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-30 text-left">
        
        {/* Navigation - ৩. লজিক আপডেট করা হয়েছে যাতে ট্যাব নষ্ট না হয় */}
        <div className="py-8 md:py-10">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-white hover:text-[#f7a400] transition-colors"
          >
            <FaChevronLeft size={14} /> 
            <span className="text-[12px] md:text-[14px] font-medium">Back to Projects</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full mb-8 md:mb-12">
          <img 
            src={location.state?.image || "https://via.placeholder.com/1200x300"} 
            alt={projectContent.title} 
            className="w-full h-[250px] md:h-[600px] object-cover rounded-sm border border-gray-900" 
          />
        </div>

        {/* Title Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-[20px] md:text-[22px] lg:text-[28px] font-semibold text-white leading-tight mb-2 ">
            {projectContent.title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-white font-medium">{projectContent.subtitle}</p>
        </div>

        {/* All Data Sections */}
        <div className="space-y-12 md:space-y-16 mb-20"> 
          
          {projectContent.executiveSummary && (
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
              <FaFileAlt 
  className="text-white text-[18px] md:text-[20px] lg:text-[22px] " 
/>
                <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Executive Summary</h2>
              </div>
              <p className="text-[14px] md:text-[16px] leading-relaxed text-left text-white">
                {projectContent.executiveSummary}
              </p>
            </div>
          )}

          {projectContent.clientBackground && (
  <div>
    <div className="flex items-center gap-3 mb-4 md:mb-6">
      <FaUserTie className="text-white text-[18px] md:text-[20px] lg:text-[22px] " />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Client Background</h2>
    </div>
    <p className="text-[14px] md:text-[16px] leading-relaxed text-left text-white whitespace-pre-line">
      {projectContent.clientBackground}
    </p>
  </div>
)}

          {projectContent.challenges && Array.isArray(projectContent.challenges) && (
  <div className="mt-10 pt-8 border-t border-gray-800">
    {/* হেডার পার্ট */}
    <div className="flex items-center gap-3 mb-6">
      <FaExclamationTriangle className="text-white text-[18px] md:text-[20px] lg:text-[22px]  shrink-0" />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">
        The Challenge
      </h2>
    </div>

    {/* লিস্ট পার্ট */}
    <div className="space-y-6">
      {projectContent.challenges.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          {/* তোর দেওয়া সেই বুলেড সাইন ▹ */}
          <span className="text-white text-[20px] leading-none mt-1 shrink-0">▹</span>
          
          <div className="flex-1 min-w-0">
            {/* যদি অবজেক্ট হয় তবে টাইটেল আর ডেসক্রিপশন আলাদা দেখাবে */}
            {typeof item === 'object' ? (
              <>
                <h4 className="text-white font-semibold text-[14px] md:text-[16px] mb-1">
                  {item.title}
                </h4>
                <p className="text-white text-[15px] md:text-[16px] leading-relaxed">
                  {item.description}
                </p>
              </>
            ) : (
              /* সাধারণ স্ট্রিং হলে আগের মতোই দেখাবে */
              <p className="text-[14px] md:text-[16px] text-white leading-relaxed">
                {item}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          {projectContent.goals && Array.isArray(projectContent.goals) && (
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaBullseye className="text-white text-[18px] md:text-[20px] lg:text-[22px] " />
                <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Project Goals</h2>
              </div>
              <div className="space-y-3">
                {projectContent.goals.map((item, i) => (
                  <p key={i} className="text-[14px] md:text-[16px] text-white leading-relaxed flex gap-2">
                    <span className="text-white font-bold">✓</span> {item}
                  </p>
                ))}
              </div>
            </div>
          )}

         {projectContent.theSolution && (
  <div className="mt-10 pt-8 border-t border-gray-800">
    <div className="flex items-center gap-3 mb-4 md:mb-6">
      {/* তোর পছন্দের লাইট আইকন */}
      <FaLightbulb className="text-white text-[18px] md:text-[20px] lg:text-[22px]  shrink-0" />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">
        The Solution
      </h2>
    </div>
    
    {/* whitespace-pre-line এড করা হয়েছে যেন টেক্সট ব্রেকগুলো ঠিক থাকে */}
    <p className="text-[14px] md:text-[16px] leading-relaxed text-left text-white whitespace-pre-line">
      {projectContent.theSolution}
    </p>
  </div>
)}

         {/* এখানে নামটা keyFeaturesImplemented এর বদলে keyFeatures হবে */}
{projectContent.keyFeatures && Array.isArray(projectContent.keyFeatures) && (
  <div className="mt-10 pt-8 border-t border-gray-800">
    <div className="flex items-center gap-3 mb-6">
      <FaListUl className="text-white text-[18px] md:text-[20px] lg:text-[22px]  shrink-0" />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">
        Key Features Implemented
      </h2>
    </div>

    <div className="space-y-8">
      {/* এখানেও লুপের ভেতর নামটা keyFeatures হবে */}
      {projectContent.keyFeatures.map((item, i) => (
        <div key={i} className="flex flex-col">
          <h4 className="text-white font-semibold text-[16px] md:text-[18px]">
            {item.title}
          </h4>
          
          {item.description && (
            <div className="ml-7 mt-1">
              <p className="text-white text-[14px] md:text-[16px] leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}


         {projectContent.results && Array.isArray(projectContent.results) && (
  <div className="mt-10 pt-8 border-t border-gray-800">
    <div className="flex items-center gap-3 mb-6">
      <FaCheckCircle className="text-white text-[18px] md:text-[20px] lg:text-[22px]  shrink-0" />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">
        Results
      </h2>
    </div>

    <div className="space-y-4">
      {projectContent.results.map((item, i) => {
        // আলাদা আলাদা লাইনের জন্য আলাদা আইকন সেট করা
        const icons = ["", "", ""];
        return (
          <div key={i} className="flex items-start gap-3">
            {/* যদি ৩টার বেশি রেজাল্ট থাকে তবে লাস্টেরগুলোতে টিক চিহ্ন আসবে */}
            <span className="text-[18px] md:text-[20px] lg:text-[22px]  shrink-0 mt-0.5">
              {icons[i] || "✓"}
            </span>
            <p className="text-[14px] md:text-[16px] text-white leading-relaxed">
              {item}
            </p>
          </div>
        );
      })}
    </div>
  </div>
)}

          {projectContent.techStack && (
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaTools className="text-white text-[18px] md:text-[20px] lg:text-[22px] " />
                <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Tech Stack</h2>
              </div>
              <p className="text-[14px] md:text-[16px] text-white bg-[#111] p-4 rounded-md inline-block border border-gray-800">
                {projectContent.techStack}
              </p>
            </div>
          )}

          {projectContent.testimonial && (
            <div>
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaQuoteLeft className="text-white text-[18px] md:text-[20px] lg:text-[22px] " />
                <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Testimonial</h2>
              </div>
              <div className="bg-[#02050A] p-8 md:p-12 border-l-4 border-white relative">
                <p className="text-[14px] md:text-[16px] leading-relaxed font-light mb-6  text-white z-10 relative">
                  "{projectContent.testimonial}"
                </p>
                <p className="text-[16px] md:text-[18px] font-bold text-white">— {projectContent.client}</p>
              </div>
            </div>
          )}

          {projectContent.keyTakeaways && Array.isArray(projectContent.keyTakeaways) && (
  <div className="mt-10 pt-8 border-t border-gray-800">
    <div className="flex items-center gap-3 mb-6">
      {/* একটা ব্রাইট আইকন যা পয়েন্টগুলোকে হাইলাইট করবে */}
      <FaLightbulb className="text-white text-[18px] md:text-[20px] lg:text-[22px]  shrink-0" />
      <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">
        Key Takeaways
      </h2>
    </div>

    <div className="space-y-4">
      {projectContent.keyTakeaways.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          {/* তোর চাওয়া ✔ আইকন */}
          <span className="text-green-500 font-bold text-[18px] md:text-[20px] mt-1 shrink-0">
            ✔
          </span>
          <p className="text-[14px] md:text-[16px] text-gray-200 leading-relaxed italic">
            {item}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

          {projectContent.futureSteps && (
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaArrowRight className="text-white text-[18px] md:text-[20px] lg:text-[22px] " />
                <h2 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white">Future Steps</h2>
              </div>
              <div className="space-y-4">
                {(typeof projectContent.futureSteps === 'string' 
                  ? projectContent.futureSteps.split('.').filter(s => s.trim() !== "") 
                  : projectContent.futureSteps
                ).map((step, i) => (
                  <p key={i} className="flex items-center gap-3 text-white text-[14px] md:text-[16px] leading-relaxed">
  <span className="text-[18px] md:text-[20px] lg:text-[22px]  shrink-0">
    🎯
  </span>
  <span className="font-medium">{step.trim()}.</span>
</p>
                ))}
              </div>
            </div>
          )}

        <div className="pt-16 border-t border-gray-900">
  {/* উপরের টেক্সট - ইমেজের মতো বাম দিকে রাখা হলো */}
  

  {/* তোর দেওয়া বাটনের কোড - যা তুই হাত দিতে মানা করেছিস (একদম সেম রাখা হলো) */}
  <div className="flex flex-row md:flex-wrap gap-3 md:gap-5"> 
    <Link 
      to="/contact" 
      className="flex-1 md:flex-none px-2 md:px-8 py-2 border-2 border-[#F7A400] bg-[#F7A400] rounded-[5px] text-black font-semibold text-[12px] sm:text-[14px] md:text-[16px] hover:bg-[#02050A] hover:text-white transition-all text-center whitespace-nowrap"
    >
      Contact us Today —&gt;
    </Link>
    
    <Link 
      to="/book-meeting" 
      className="flex-1 md:flex-none px-2 md:px-8 py-2 border-2 border-[#F7A400] bg-[#F7A400] rounded-[5px] text-black font-semibold text-[12px] sm:text-[14px] md:text-[16px] hover:bg-[#02050A] hover:text-white transition-all text-center whitespace-nowrap"
    >
      Book A Meeting —&gt;
    </Link>
  </div>
</div>

        </div>
      </div>

      {/* Share Section */}
      <div className="w-full bg-[#02050A] border-t border-gray-900 mt-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-60 py-10 md:py-16 flex flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <FaShareAlt size={18} className="text-white" /> 
            <span className="text-[16px] md:text-[18px] font-normal ">Share A Post</span>
          </div>
          <div className="flex gap-6 md:gap-12 text-white">
            <FaFacebookF size={20} className="md:size-6 cursor-pointer hover:text-[#f7a400] transition-colors" />
            <FaInstagram size={20} className="md:size-6 cursor-pointer hover:text-[#f7a400] transition-colors" />
            <FaLinkedinIn size={20} className="md:size-6 cursor-pointer hover:text-[#f7a400] transition-colors" />
            <FaTwitter size={20} className="md:size-6 cursor-pointer hover:text-[#f7a400] transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetails;