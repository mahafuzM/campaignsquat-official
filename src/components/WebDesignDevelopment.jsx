import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Technical SEO Integration

// ইমেজ ইমপোর্টসমূহ (Unchanged)
import heroImage from '../assets/images/Campaignsquat Ltd - High-Performance Web Design and Full-Stack Development Solutions (3).webp';
import researchIcon from '../assets/images/research.png';
import uxIcon from '../assets/images/ux-design (1).png';
import webIcon from '../assets/images/web-design.png';
import auditIcon from '../assets/images/3d-modeling.png'; 
import uxAuditImg from "../assets/images/scalable-cloud-native-web-architecture-campaignsquat.webp";
import accessibilityImg from "../assets/images/performance-optimized-web-engineering-speed-optimization.webp";
import businessImg from "../assets/images/responsive-mobile-first-web-design-ui-ux.webp";
import scalableImg from "../assets/images/secure-web-development-cybersecurity-encryption.webp";
import discoveryImg from '../assets/images/research.png';
import designImg from '../assets/images/ux-design (1).png';
import iterationImg from '../assets/images/web-design.png';
import handoffImg from '../assets/images/deployment.png';
import sideImg from '../assets/images/robust-web-development-and-industrial-expertise-showcase.webp';
import img1 from '../assets/images/original-3632fddd9c6a0fd99b661a62dcfa64dc (1).webp';
import img2 from '../assets/images/rpvu1v3dzk7wzyresb1u.jpg';
import img3 from '../assets/images/original-8325640f824b29ea86b0529dea15ae0d.webp';
import img4 from '../assets/images/original-850e6ed57edfd03c6d1b94ae832d62f7.webp';
import img5 from '../assets/images/original-850e6ed57edfd03c6d1b94ae832d62f7 (1).webp';
import img6 from '../assets/images/original-ad1e136638ef25805d74bc2a9ff8ab7e.webp';
import img7 from '../assets/images/479f22210697035.Y3JvcCwyNjA5LDIwNDAsMTM1LDA.png';
import img8 from '../assets/images/original-e2914736408e4069af7f75a4d351c1b7.webp';
import BrandSlider from './BrandSlider';
import DynamicSchema from './DynamicSchema';

const WebDesignDevelopment = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const expertiseData = [
  {
    title: "Full-Stack Web Systems",
    desc: "We deliver comprehensive full-stack solutions that combine high-end visual design with robust backend stability. Our team builds secure and scalable websites that handle complex business logic while providing a smooth journey for global users.",
    img: uxIcon,
    alt: "Full-Stack Web Systems and Backend Stability"
  },
  {
    title: "Clean Code Architecture",
    desc: "Our experts follow a strict clean code architecture to ensure your website is fast and easy to maintain over time. We prioritize technical performance and SEO-friendly structures to help your business rank higher and load quickly on all browsers.",
    img: researchIcon,
    alt: "Clean Code Architecture and SEO Performance"
  },
  {
    title: "Custom CMS Development",
    desc: "Building flexible and user-friendly content management systems tailored to your specific operational needs. We empower your team to manage site updates effortlessly without any technical hurdles while maintaining a professional digital presence.",
    img: auditIcon,
    alt: "Custom CMS Development and Content Management"
  },
  {
    title: "Responsive Web Layouts",
    desc: "Designing fluid and adaptive web layouts that provide a flawless experience across desktops and mobile devices. We ensure your site looks professional and functions perfectly on every screen size to maximize your reach in the global market space.",
    img: webIcon,
    alt: "Responsive Web Layouts and Multi-Device Compatibility"
  }
];

    // Feature Data
   const featureData = [
  {
    title: ["ROI-Focused Website Design and UX Audits"],
    desc: "Stop guessing what your users want. Campaignsquat Ltd. specializes in ROI-focused website design services that utilize eye-tracking and heat-map data to guide visitors toward your goal. By prioritizing critical info through a strict UI/UX design for web applications, we reduce cognitive friction. Our research-driven narrative ensures your value proposition triggers action, turning your professional digital presence into a high-performance sales tool.",
    img: uxAuditImg,
    reverse: false,
    alt: "ROI-focused website design and professional UX audit services"
  },
  {
    title: ["Enterprise Web Application Development Pro"],
    desc: "Clarity and power are the core of our enterprise web application development. We strip away digital clutter to focus on direct-response lead-gen layouts that move users toward high-value conversions. Whether you need progressive web app (PWA) development or complex tools, we ensure every headline and functional element works in tandem. Our technical expertise provides the speed and precision required for modern, professional business growth.",
    img: accessibilityImg,
    reverse: true,
    alt: "Enterprise web application development and PWA engineering"
  },
  {
    title: ["AI-Integrated Website and Headless CMS"],
    desc: "A platform is only as good as its tech stack. We provide AI-integrated website solutions and headless CMS architecture to ensure your pipeline is updated in real-time. By automating data handoffs, Campaignsquat Ltd. enables your team to respond to inquiries instantly. Our custom web development for agencies ensures your backend is as robust as your frontend, providing a professional and scalable bridge for your global marketing operations.",
    img: businessImg,
    reverse: false,
    alt: "AI-integrated web solutions and headless CMS architecture"
  },
  {
    title: ["Dedicated Web Design Team for Startups"],
    desc: "Success requires constant validation. Our dedicated web design team for startups builds high-trust frameworks using responsive website development to establish instant credibility. By strategically placing social proof and trust badges, we lower perceived risk at the moment of decision-making. This psychological reinforcement helps in converting cold traffic into advocates, ensuring your professional investment remains protected and scalable today.",
    img: scalableImg,
    reverse: true,
    alt: "Dedicated web design team and responsive development for startups"
  }
];

    // Process Roadmap
   const processSteps = [
    { 
        // Step 1: Strategy & Mapping
        title: "Strategy & Mapping", 
        description: "Analyzing your traffic sources to create a seamless transition from the very first click to page arrival.", 
        image: discoveryImg, 
        alt: "strategic-traffic-source-analysis-and-user-journey-mapping" 
    },
    { 
        // Step 2: Core Wireframing
        title: "Core Wireframing", 
        description: "Structural blueprints focused on user flow and narrative before we even touch the actual visual design.", 
        image: designImg, 
        alt: "structural-web-wireframing-and-narrative-blueprint-phase" 
    },
    { 
        // Step 3: Custom Development
        title: "Custom Development", 
        description: "Clean, lightweight code built for speed, accessibility, and flawless tracking pixel installation today.", 
        image: iterationImg, 
        alt: "custom-lightweight-web-development-with-clean-code-architecture" 
    },
    { 
        // Step 4: Launch & Optimization
        title: "Launch & Optimization", 
        description: "Rigorous QA testing and speed optimization to ensure your page dominates from the moment it goes live.", 
        image: handoffImg, 
        alt: "web-launch-quality-assurance-and-performance-optimization" 
    }
];

    const points = ["Modern Tech Stack (MERN, Next.js)", "SEO-Optimized Code Structure", "Custom API & Third-party Integrations", "Conversion-Focused UI Implementation", "24/7 Technical Maintenance"];

    // Industry Expertise
    const industryData = [
        { title: "FinTech Solutions", desc: "We build secure, high-performance banking portals with robust API integrations to ensure seamless financial transactions and data integrity.", img: img1, alt: "fintech-secure-financial-dashboard-development" },
        { title: "Retail & E-commerce", desc: "Our experts develop scalable full-stack retail stores with optimized databases to handle high traffic and ensure frictionless checkout flows.", img: img2, alt: "retail-ecommerce-marketplace-development" },
        { title: "Healthcare Systems", desc: "We create secure, HIPAA-compliant healthcare web applications featuring real-time data synchronization for patient management and consultations.", img: img3, alt: "healthcare-compliant-medical-portal-design" },
        { title: "EdTech Platforms", desc: " Our team builds interactive learning management systems with custom backend architectures to support global student enrollment and content delivery.", img: img4, alt: "edtech-learning-management-system-development" },
        { title: "SaaS Products", desc: "We design and develop complex B2B software architectures with scalable cloud integrations to power high-performance enterprise dashboards.", img: img5, alt: "saas-cloud-application-development-services" },
        { title: "Real Estate Tech", desc: " Our designers and developers craft feature-rich property marketplaces with advanced search logic and immersive visual integrations for global buyers.", img: img6, alt: "real-estate-property-listing-platform-development" },
        { title: "Travel Portals", desc: "We build real-time supply chain tracking systems and automated fleet management tools to ensure speed and reliability in complex logistics.", img: img7, alt: "travel-booking-engine-api-integration" },
        { title: "Corporate Portfolios", desc: "We develop tailor-made internal business applications with secure user authentication and automated workflows to maximize operational productivity.", img: img8, alt: "corporate-business-portfolio-website-design" },
    ];

    // JSON-LD Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Web Design and Development Services",
        "provider": {
            "@type": "Organization",
            "name": "Campaignsquat Ltd."
        },
        "description": "High-performance full-stack web development agency specializing in MERN, Next.js, and scalable e-commerce engineering.",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": expertiseData.map(e => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": e.title
                }
            }))
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How long does a custom web development project typically take?",
                "acceptedAnswer": { "@type": "Answer", "text": "Standard enterprise projects range from 8 to 12 weeks. We provide a detailed project roadmap during the discovery phase to ensure absolute alignment on milestones and delivery timelines." }
            },
            {
                "@type": "Question",
                "name": "Does Campaignsquat Ltd. provide ongoing technical maintenance?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer tiered support packages that include security patches, core updates, and performance monitoring to ensure 99.9% uptime and long-term digital resilience for your platform." }
            },
            {
                "@type": "Question",
                "name": "Will my website be optimized for SEO from day one?",
                "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We integrate technical SEO—including schema markup, semantic HTML, and metadata—directly into the development process so your site is ready to rank the moment it goes live." }
            },
            {
                "@type": "Question",
                "name": "Can you integrate my website with third-party CRM or ERP tools?",
                "acceptedAnswer": { "@type": "Answer", "text": "Integration is our specialty. We have extensive experience connecting web platforms with HubSpot, Salesforce, and custom internal APIs to ensure a seamless data flow across your business ecosystem." }
            },
            {
                "@type": "Question",
                "name": "Who owns the source code once the project is completed?",
                "acceptedAnswer": { "@type": "Answer", "text": "You do. Campaignsquat Ltd. provides 100% ownership of the source code and all digital assets upon final project delivery. We believe in building partnerships based on trust, not vendor lock-in." }
            }
        ]
    };

    return (
        <>
        <DynamicSchema pageTitle="Web Design and Development" />
        <main className="overflow-hidden font-poppins bg-[#02050a]">
            <Helmet>
                <title>Web Design and Development Agency | Campaignsquat Ltd.</title>
                <meta name="description" content="Partner with Campaignsquat Ltd. for high-performance web development. We build scalable, SEO-optimized, and secure digital solutions. Start your project today!" />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content="Web Design and Development Agency | Campaignsquat Ltd." />
                <meta property="og:description" content="Eliminate technical debt with Campaignsquat Ltd. We engineer SEO-optimized, scalable architectures." />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

           {/* 1. Hero Section - md:mt-0 kore dilam jate upor-e uthe jay */}
<section className="relative w-full flex items-center overflow-hidden mt-4 md:mt-20">
    <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F7A400]/10 blur-[120px] rounded-full opacity-50"></div>
    
    {/* Container-e pt (padding-top) komiye dilam gap komanor jonno */}
    <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full  ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
                <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white leading-tight">
                     High-Performance Web Design & Full-Stack Development Agency
                </h1>
                <p className="text-white text-[16px] md:text-[20px]  mx-auto lg:mx-0 leading-relaxed font-normal opacity-80">
                    Eliminate technical debt with Campaignsquat Ltd. We engineer SEO-optimized, scalable architectures and pixel-perfect frontends. Our full-stack expertise ensures your digital product is high-performing, secure, and built to convert casual visitors into loyal customers globally.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                    <Link to="/home/contact" className="w-full sm:w-auto">
                        <button className="bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-8 md:px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all duration-300 transform hover:bg-[#02050A] active:scale-95 group">
                            Launch Your Project
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                <div className="absolute w-[80%] h-[80%] blur-[100px] rounded-full"></div>
                <img 
                    src={heroImage} 
                    alt="Campaignsquat Ltd - High-Performance Web Design and Full-Stack Development Solutions" 
                    className="relative z-10 w-full h-auto max-w-[550px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]" 
                />
            </div>
        </div>
    </div>
</section>

             {/* Slider Section */}
             <section className="w-full overflow-hidden pt-20 md:pt-30 py-12 md:py-20 ">
                <BrandSlider />
            </section>

            {/* 2. Expertise Section */}
           <section className="bg-[#0A0A0A] py-12 md:py-20">
    <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 text-center w-full  ">
        <div className="mb-20">
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">Our Web Design & Development Expertise for Growth</h2>
            <p className="text-white text-[16px] md:text-[20px]  mx-auto font-medium opacity-80">We deploy a research-backed methodology to ensure your digital products are visually stunning and technically superior. Our approach as a custom UI/UX design agency ensures every pixel serves a specific and high-impact business purpose. </p>
        </div>

        {/* lg:grid-cols-2 করার মাধ্যমে বড় স্ক্রিনে ২ কলাম নিশ্চিত করা হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {expertiseData.map((item, index) => (
                <div key={index} className="group relative bg-[#02050A] border border-white/10 p-10 rounded-[5px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full">
                    
                    <div className="mb-8 w-16 h-16 flex items-center justify-start relative z-10">
                        <img src={item.img} alt={item.alt} loading="lazy" className="w-full h-full object-contain invert transition-all duration-500 group-hover:scale-110" style={{ filter: 'invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)' }} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-white text-[20px] md:text-[22px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">{item.title}</h3>
                        <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light ">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

            {/* 3. Features Section */}
            <section className="py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full ">
                    <div className="flex flex-col gap-24 md:gap-44">
                        {featureData.map((item, index) => (
                            <div key={index} className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}>
                                <div className="w-full md:w-1/2 text-left">
                                    <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8">
                                        {item.title.map((line, i) => <span key={i} className="block leading-[1.3] mb-1 last:mb-0">{line}</span>)}
                                    </h2>
                                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light max-w-[580px] ">{item.desc}</p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="relative group overflow-hidden rounded-[5px]">
                                        <div className="absolute -inset-4 bg-[#F7A400]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img src={item.img} alt={item.alt} loading="lazy" className="relative z-10 w-full aspect-[16/10] object-cover border border-white/10 rounded-[5px] shadow-2xl transition-all duration-500 group-hover:scale-[1.03]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="w-full bg-[#0A0A0A] py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 text-center ">
                    <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8"> Our Web Design & Development Process </h2>
                    <p className="text-white text-[16px] md:text-[20px] max-w-5xl  mx-auto mb-16 font-light opacity-80">A battle-tested workflow designed to move your project from initial concept to live launch.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
                        {processSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center group cursor-pointer">
                                <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                                    <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 group-hover:left-0 group-hover:rotate-[360deg]"></div>
                                    <div className="relative w-full h-full rounded-full bg-[#02050A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50">
                                        <img src={step.image} alt={step.alt} loading="lazy" className="w-16 h-16 md:w-20 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110" />
                                    </div>
                                </div>
                                <h3 className="text-white text-[22px] md:text-[24px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">{step.title}</h3>
                                <p className="text-white text-[15px] md:text-[16px] font-light max-w-[280px] ">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Section */}
            <section className="py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ">
                    <div className="w-full lg:w-1/2 text-left order-2 lg:order-1 relative z-20">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8 leading-[1.2]">Why is Campaignsquat Ltd the best Web Design Development service provider?</h2>
                        <p className="text-white text-[16px] md:text-[18px] leading-relaxed opacity-80 max-w-[650px] mb-10">
  We specialize in engineering lightning-fast, SEO-optimized digital experiences. 
  Our websites are built with scalable architectures that grow alongside your business.
</p>
                        <div className="flex flex-col gap-3 md:gap-4 mb-12">
                            {points.map((point, index) => (
                                <div key={index} className="flex items-center gap-5 group">
                                    <div className="w-6 h-6 rounded-full border-2 border-[#F7A400] flex items-center justify-center transition-all duration-300 group-hover:bg-[#F7A400]">
                                        <Check className="text-[#F7A400] group-hover:text-black w-5 h-5 stroke-[3px]" />
                                    </div>
                                    <span className="text-white text-[16px] md:text-[18px] font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                       <Link to="/home/contact" className="inline-block w-full sm:w-auto">
                         <button aria-label="Consult Campaignsquat for your business website" className=" bg-[#F7A400] text-black hover:text-white border-2 border-[#F7A400] text-[14px] md:text-[15px] rounded-[5px] px-8 md:px-10 py-2 font-semibold hover:bg-[#0a0a0a] transition-all duration-500 active:scale-95 group">
                             Get Started
                           </button>
                       </Link>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#F7A400]/5 blur-[100px] rounded-full -z-10"></div>
                            <img src={sideImg} alt="robust-web-development-and-industrial-expertise-showcase" loading="lazy" className="w-full h-auto   transition-all duration-700 group-hover:rotate-1" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Industry Expertise */}
            <section className="py-12 md:py-20 relative overflow-hidden">
    <style>{`
        @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .border-run-container { position: relative; padding: 2px; overflow: hidden; background: rgba(255, 255, 255, 0.05); border-radius: 7px; }
        .border-run-container:hover .running-border { opacity: 1; }
        .running-border { position: absolute; width: 250%; height: 250%; top: -75%; left: -75%; background: conic-gradient(transparent, transparent, transparent, #F7A400); animation: rotate-border 3s linear infinite; opacity: 0; transition: opacity 0.3s; z-index: 0; }
        .card-content { position: relative; background: #0a0a0a; border-radius: 5px; z-index: 1; height: 100%; }
    `}</style>

    <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 text-center w-full ">
        <div className="mb-12 md:mb-16 max-w-6xl mx-auto">
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-4">
                Our Industry-Specific Web & Full-Stack Development Expertise
            </h2>
            <p className="text-white text-[16px] md:text-[18px] max-w-[700px] mx-auto font-light leading-relaxed ">
               Campaignsquat Ltd. provides expert web design and full-stack development for diverse industries to drive digital success. We build scalable, high-performance web applications that ensure seamless user journeys and robust backend stability across all global business sectors.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryData.map((item, index) => (
                <div key={index} className="border-run-container group cursor-pointer">
                    <div className="running-border"></div>
                    <div className="card-content flex flex-col">
                        <div className="overflow-hidden rounded-t-[5px]">
                            <img 
                                src={item.img} 
                                alt={item.alt} 
                                loading="lazy"
                                className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-110" 
                            />
                        </div>
                        <div className="p-8 text-left">
                            <h3 className="text-white text-[20px] md:text-[22px] font-bold mb-3 group-hover:text-[#F7A400] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-white text-[15px] font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>
            <Questions />
        </main>
        </>
    );
};

// Phase 5: Expert-level FAQs
const Questions = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How long does a custom web development project typically take?",
            answer: "Standard enterprise projects range from 8 to 12 weeks. We provide a detailed project roadmap during the discovery phase to ensure absolute alignment on milestones and delivery timelines."
        },
        {
            question: "Does Campaignsquat Ltd. provide ongoing technical maintenance?",
            answer: "Yes. We offer tiered support packages that include security patches, core updates, and performance monitoring to ensure 99.9% uptime and long-term digital resilience for your platform."
        },
        {
            question: "Will my website be optimized for SEO from day one?",
            answer: "Absolutely. We integrate technical SEO—including schema markup, semantic HTML, and metadata—directly into the development process so your site is ready to rank the moment it goes live."
        },
        {
            question: "Can you integrate my website with third-party CRM or ERP tools?",
            answer: "Integration is our specialty. We have extensive experience connecting web platforms with HubSpot, Salesforce, and custom internal APIs to ensure a seamless data flow across your business ecosystem."
        },
        {
            question: "Who owns the source code once the project is completed?",
            answer: "You do. Campaignsquat Ltd. provides 100% ownership of the source code and all digital assets upon final project delivery. We believe in building partnerships based on trust, not vendor lock-in."
        }
    ];

    return (
        <section className="w-full bg-[#02050A] py-8 md:py-10 overflow-hidden font-poppins">
            <div className="max-w-[1445px] mx-auto px-5 sm:px-10 md:px-16">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-8 leading-[1.2]">
                        Just Ask Us Some Questions
                    </h2>
                    <p className="text-white text-[15px] md:text-[20px] max-w-2xl mx-auto font-light">
                        Quick answers to your most frequent inquiries
                    </p>
                </div>

                <div className="space-y-4 md:space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border transition-all duration-300 rounded-[5px] md:rounded-[5px] ${
                                openIndex === index 
                                ? 'border-[#f7a400] bg-[#0A0A0A]' 
                                : 'border-[#02050a] bg-[#0A0A0A] hover:border-[#f7a400]'
                            }`}
                        >
                            <button
                                aria-expanded={openIndex === index}
                                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <span className="text-[15px] md:text-[18px] font-semibold leading-tight transition-colors duration-300 pr-4 text-white">
                                    {faq.question}
                                </span>
                                <span className="shrink-0">
                                    {openIndex === index ? (
                                        <div className="bg-[#f7a400] p-1 md:p-1.5 rounded-full">
                                            <Minus size={18} className="md:w-[22px] md:h-[22px]" strokeWidth={3} color="black" />
                                        </div>
                                    ) : (
                                        <div className="bg-white/10 p-1 md:p-1.5 rounded-full">
                                            <Plus size={18} className="md:w-[18px] md:h-[18px]" strokeWidth={3} color="white" />
                                        </div>
                                    )}
                                </span>
                            </button>

                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-5 md:px-8 pb-6 md:pb-8 text-white text-[14px] md:text-[16px] leading-relaxed font-normal">
                                    <div className="h-[1px] w-full bg-gray-800/50 mb-5 md:mb-6"></div>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default WebDesignDevelopment;