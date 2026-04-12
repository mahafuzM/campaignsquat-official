import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Calendar, User, Tag, Globe, ArrowLeft, AlertCircle, 
  CalendarCheck, Stars, CheckCircle2, Loader2, FileText 
} from 'lucide-react';
import axios from 'axios';

const ProjectDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [project, setProject] = useState(location.state?.project || null);
  const [loading, setLoading] = useState(!project);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000";

 useEffect(() => {
    const fetchProject = async () => {
      // যদি অলরেডি ডাটা থাকে এবং স্লাগ মিলে যায়, তবে আবার ফেচ করার দরকার নেই
      if (project && project.fullName === slug) return;

      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(`${BASE_URL}/api/projects/slug/${slug}`);
        
        if (res.data) {
          // ১. সেকশন ডাটা পার্সিং (স্মার্ট চেক)
          const rawSections = res.data.sections;
          const sanitizedSections = typeof rawSections === 'string' 
            ? JSON.parse(rawSections) 
            : (Array.isArray(rawSections) ? rawSections : []);

          // ২. ডাটাবেসের year এবং বাকি সব ডাটাকে একসাথে স্টেট-এ সেট করা
          // নিশ্চিত করা হচ্ছে যেন year: "2020" বা আপনার দেওয়া সালটি সঠিকভাবে আসে
          setProject({
            ...res.data,
            sections: sanitizedSections,
            // যদি year না থাকে, তবে ব্যাকআপ হিসেবে ২০২৬ দেখাবে (হার্ডকোড মুক্ত)
            year: res.data.year || "2026" 
          });

          // ৩. পেজ টাইটেল আপডেট
          if (res.data.title) {
            document.title = `${res.data.title} | Case Study`;
          }
        } else {
          setError("Project not found!");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    
    // পেজের একদম উপরে নিয়ে যাওয়া
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [slug]); // শুধুমাত্র স্লাগ পরিবর্তন হলে এটি চলবে

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/1920x1080?text=No+Image+Found";
    if (img.startsWith('http')) return img;
    const fileName = img.split('/').pop(); 
    return `${BASE_URL}/uploads/${fileName}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02050A] text-white flex items-center justify-center font-['Poppins']">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#F7A400] animate-spin" />
          <p className="animate-pulse text-[#F7A400] text-lg tracking-[0.3em] uppercase font-bold">Loading Digital Legacy...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#02050A] text-white flex flex-col items-center justify-center font-['Poppins'] p-6 text-center">
        <AlertCircle size={60} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">{error || "Project Not Found"}</h2>
        <button onClick={() => navigate('/our-projects')} className="bg-[#F7A400] text-black px-8 py-3 rounded-[5px] font-bold mt-6 hover:bg-white transition-all">
          Return to Portfolio
        </button>
      </div>
    );
  }

  // --- এই নিচের রিটার্ন পার্টটা একদম আপনার দেওয়া ডিজাইন ---
  return (
    <div className="bg-[#02050A] min-h-screen text-white font-['Poppins'] pb-20 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO (Optimized for Mobile) --- */}
      <section className="relative w-full overflow-hidden bg-[#02050A]">
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[75vh]">
          <img 
            src={getImageUrl(project.imageUrl)} 
            className="w-full h-full object-contain md:object-cover opacity-60 transition-all duration-700" 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-4 md:bottom-16 left-0 right-0 z-10">
          <div className="max-w-[1445px] mx-auto px-6 md:px-10 lg:px-16 w-full">
            <button 
              onClick={() => navigate(-1)} 
              className="group flex items-center gap-2 text-white hover:text-[#F7A400] mb-4 md:mb-8 transition-all w-fit"
            >
              <div className="p-1.5 md:p-2 rounded-full border border-white group-hover:border-[#F7A400]">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
              </div>
              <span className="text-[10px] md:text-[14px] font-semibold text-white ">Go Back</span>
            </button>
            
            <h1 className="text-[22px] md:text-[28px] lg:text-[30px] font-semibold mb-2 md:mb-4 leading-tight ">
              {project.title}
            </h1>
            <p className="text-[#F7A400] text-[10px] md:text-[20px] font-semibold ">
              {project.category || "Case Study"}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1445px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        
        {/* --- SECTION 2: META INFO BAR --- */}
      <section className="relative z-20 -mt-8 md:-mt-10 w-full">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-[#0A0A0A] border border-gray-900 p-5 md:p-8 rounded-[5px] shadow-2xl backdrop-blur-3xl w-full">
    
    {/* Client Item */}
    <div className="space-y-2">
      <p className="text-white text-[12px] md:text-[16px] font-semibold flex items-center gap-2">
        <User className="text-[#F7A400] w-5 h-5 md:w-[22px] md:h-[22px] flex-shrink-0"/> Client
      </p>
      <p className="text-[10px] md:text-[14px] font-semibold truncate">
        {project.clientName || "Private Client"}
      </p>
    </div>

    {/* Launch Item - Updated Logic */}
    <div className="space-y-2">
      <p className="text-white text-[12px] md:text-[16px] font-semibold flex items-center gap-2">
        <Calendar className="text-[#F7A400] w-5 h-5 md:w-[22px] md:h-[22px] flex-shrink-0"/> Launch
      </p>
      <p className="text-[10px] md:text-[14px] font-semibold">
       {/* সরাসরি ডাটাবেসের year, না থাকলে ২০২৬ */}
    {project?.year || "Date Not Found"}
      </p>
    </div>

    {/* Industry Item */}
    <div className="space-y-2">
      <p className="text-white text-[12px] md:text-[16px] font-semibold flex items-center gap-2">
        <Tag className="text-[#F7A400] w-5 h-5 md:w-[22px] md:h-[22px] flex-shrink-0"/> Industry
      </p>
      <p className="text-[10px] md:text-[14px] font-semibold truncate">
        {project.category || "General"}
      </p>
    </div>

    {/* Preview Item */}
    <div className="space-y-2">
      <p className="text-white text-[12px] md:text-[16px] font-semibold flex items-center gap-2">
        <Globe className="text-[#F7A400] w-5 h-5 md:w-[22px] md:h-[22px] flex-shrink-0"/> Preview
      </p>
      {project.projectUrl ? (
        <a 
          href={project.projectUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-sm md:text-lg font-bold text-[#F7A400] hover:underline decoration-2 underline-offset-8"
        >
          Visit Live
        </a>
      ) : (
        <span className="text-[10px] md:text-[14px] font-semibold text-white ">Offline</span>
      )}
    </div>

  </div>
</section>

        {/* --- SECTION 3: DYNAMIC CONTENT --- */}
        <section className="mt-16 md:mt-24 space-y-16 md:space-y-20 w-full">
          {project.sections?.map((section, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-10 duration-1000 w-full">
              
              {section.type === 'heading' && (
                <div className="space-y-1 w-full text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="text-white" size={24} />
                    <h2 className="text-[18px] md:text-[22px] font-semibold ">
                      {section.value}
                    </h2>
                  </div>
                  {section.subtitle && (
                    <p className="text-white text-[14px] md:text-[16px] mb-2">
                        {section.subtitle}
                    </p>
                  )}
                </div>
              )}

              {section.type === 'text' && (
                <p className="text-white text-[14px] md:text-[18px] leading-[1.2] md:leading-[1.5] font-medium whitespace-pre-line w-full text-left -mt-10 md:-mt-8">
                  {section.value}
                </p>
              )}

              {section.type === 'list' && (
                <div className="w-full text-left">
                  {section.title && (
                    <p className="text-white text-[18px] md:text-[22px] font-semibold mb-6">
                      {section.title}
                    </p>
                  )}
                  <div className="flex flex-col gap-2 md:gap-4">
                    {section.items?.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2 md:gap-4">
                        <div className="w-2 h-2 bg-[#F7A400] rounded-full mt-2.5 flex-shrink-0" />
                        <p className="text-white text-[12px] md:text-[16px] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === 'featureList' && (
                <div className="space-y-8 w-full text-left">
                   <h2 className="text-[18px] md:text-[22px] font-semibold">{section.mainTitle}</h2>
                   <div className="flex flex-col gap-8">
                      {section.items?.map((feature, fIdx) => (
                        <div key={fIdx} className="group w-full">
                          <h4 className="text-[14px] md:text-[18px] font-semibold text-white mb-2 group-hover:text-[#F7A400] transition-colors">
                            {feature.subTitle}
                          </h4>
                          <p className="text-white text-[12px] md:text-[16px] leading-relaxed">{feature.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {section.type === 'solution' && (
                <div className="w-full text-left p-0 border-none">
                    <div className="flex items-center gap-4 mb-6">
                      <User size={32} className="text-[#F7A400]" />
                        <h3 className="text-[20px] md:text-[22px] font-semibold tracking-tight ">
                            {section.title || "The Solution"}
                        </h3>
                    </div>
                    <p className="text-white text-[14px] md:text-[16px] leading-relaxed ">
                        "{section.value}"
                    </p>
                </div>
              )}

              {section.type === 'info' && (
  // মোবাইলেও 'flex-row' (পাশাপাশি) থাকবে, 'items-start' লেখা বড় হলে আইকন উপরে থাকবে
  <div className="flex flex-row items-start gap-3 md:gap-6 bg-[#F7A400]/5 border border-[#F7A400]/20 p-4 md:p-8 rounded-[5px] w-full text-left">
    
    {/* আইকন বক্স: 'flex-shrink-0' যাতে লেখা বড় হলে আইকন চ্যাপ্টা না হয় */}
    <div className="p-1.5 md:p-2.5 bg-[#F7A400] text-black rounded-[5px] flex-shrink-0 mt-0.5 md:mt-0">
      {/* মোবাইলে ১৬ সাইজ, মিডিয়াম স্ক্রিন থেকে ২৪ সাইজ */}
      <AlertCircle className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]" />
    </div>

    {/* টেক্সট: লেখার এলাইনমেন্ট বামে থাকবে */}
    <div className="flex-1">
      <p className="text-white text-[12px] md:text-[15px] leading-relaxed">
        {section.value}
      </p>
    </div>
    
  </div>
)}

            </div>
          ))}
        </section>

       {/* --- SECTION 4: FINAL CTA (Book a Meeting) --- */}
<section className="mt-12 md:mt-30 pb-10 flex flex-col items-center text-center px-2">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-16" />
  
  <h3 className="text-[26px] md:text-[30px] font-semibold mb-6 tracking-tighter leading-tight">
    Ready to scale with <span className="text-[#F7A400]">Campaignsquat Ltd?</span>
  </h3>
  
  <p className="text-white max-w-7xl mb-10 text-[16px] md:text-[20px] leading-relaxed">
    From "pixel-perfect" interfaces to high-performance engineering, we don't just build websites—we build digital legacies. Let’s collaborate to turn your vision into a market-leading product.
  </p>

  {/* মোবাইলে এক লাইনে আনার জন্য 'flex-nowrap' এবং ছোট গ্যাপ ব্যবহার করা হয়েছে */}
  <div className="flex flex-row items-center justify-center gap-3 md:gap-4 w-full overflow-hidden">
    <Link 
      to="/book-meeting" 
      className="group flex items-center justify-center gap-2 bg-[#F7A400] text-black hover:text-white font-semibold py-2.5 px-3 md:px-8 rounded-[5px] border-2 border-[#F7A400] hover:bg-transparent transition-all active:scale-95 text-[12px] sm:text-[14px] md:text-[15px] whitespace-nowrap"
    >
      <CalendarCheck size={16} className="group-hover:scale-110 transition-transform hidden sm:block" />
      <span>Book Meeting</span>
    </Link>

    <button 
      onClick={() => navigate('/our-projects')}
      className="group flex items-center justify-center gap-2 bg-[#F7A400] text-black hover:text-white font-semibold py-2.5 px-3 md:px-8 rounded-[5px] border-2 border-[#F7A400] hover:bg-transparent transition-all active:scale-95 text-[12px] sm:text-[14px] md:text-[15px] whitespace-nowrap"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform hidden sm:block" />
      <span>All Projects</span>
    </button>
  </div>
</section>
      </div>
    </div>
  );
};

export default ProjectDetails;