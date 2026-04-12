import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Technical SEO

// Image Imports
import heroImage from '../assets/images/Premium UI UX Design Showcase by Campaignsquat Ltd .webp';
import researchIcon from '../assets/images/research.png';
import uxIcon from '../assets/images/ux-design (1).png';
import webIcon from '../assets/images/web-design.png';
import auditIcon from '../assets/images/3d-modeling.png'; 
import uxAuditImg from "../assets/images/Human-Centric UIUX Design for Growth - Campaignsquat Ltd (1).webp";
import accessibilityImg from "../assets/images/WCAG Compliant Accessible Web Design - Campaignsquat Ltd (1).webp";
import businessImg from "../assets/images/Conversion-Driven UI Design Strategy - Campaignsquat Ltd (1).webp";
import scalableImg from "../assets/images/Scalable Design Systems and Atomic Architecture - Campaignsquat Ltd (1).webp";
import discoveryImg from '../assets/images/research.png';
import designImg from '../assets/images/ux-design (1).png';
import iterationImg from '../assets/images/web-design.png';
import handoffImg from '../assets/images/deployment.png';
import sideImg from '../assets/images/High-impact UI UX design excellence and user satisfaction - Campaignsquat.webp';
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

const UiUxDesign = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Premium UI/UX Design Services",
        "serviceType": "User Interface & User Experience Design",
        "provider": {
            "@type": "Organization",
            "name": "Campaignsquat Ltd."
        },
        "description": "Partner with Campaignsquat Ltd. for premium UI/UX design services. We build scalable, user-centric, and high-conversion digital products through research and design systems.",
        "areaServed": "Global",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "UI/UX Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "User Research & Analysis" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile & Web UI/UX" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UX Audit" } }
            ]
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the typical timeline for a UI/UX project?",
                "acceptedAnswer": { "@type": "Answer", "text": "Small projects take 2-4 weeks, while complex SaaS platforms require 8-12 weeks. We prioritize agile delivery to get your MVP to market faster." }
            },
            {
                "@type": "Question",
                "name": "How do you handle revisions during the design phase?",
                "acceptedAnswer": { "@type": "Answer", "text": "We include structured feedback loops at every milestone—Wireframing, UI Design, and Prototyping—ensuring the final product aligns perfectly with your vision." }
            },
            {
                "@type": "Question",
                "name": "Will the designs be ready for my development team?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide full Figma/Adobe XD handoffs, including style guides, assets, and documentation, ensuring a 1:1 transition from design to code." }
            },
            {
                "@type": "Question",
                "name": "Can you redesign an existing product to improve conversions?",
                "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We start with a UX Audit to identify why users are dropping off and then re-engineer the interface specifically to increase your conversion rates." }
            },
            {
                "@type": "Question",
                "name": "How do you ensure the design is scalable for future features?",
                "acceptedAnswer": { "@type": "Answer", "text": "We build using Atomic Design principles, creating a library of reusable components and symbols that allow your team to add new features without breaking the UI." }
            }
        ]
    };

    const expertiseData = [
  { 
    
    title: "User Research & Analysis", 
    desc: "We dive deep into behavioral psychology and market data to identify pain points and create design solutions that solve real-world user problems. Our team ensures that every interface is built on solid data to maximize your long-term engagement.", 
    img: researchIcon, 
    alt: "User Research and Behavioral Analysis Icon - Campaignsquat" 
  },
  { 
   
    title: "Responsive UI/UX Design", 
    desc: "Crafting pixel-perfect and responsive interfaces that ensure a seamless and high-performance experience across every device and screen size. We focus on building intuitive layouts that guide your users through a smooth and professional journey.", 
    img: uxIcon, 
    alt: "Mobile and Web UI/UX Design Icon - Campaignsquat" 
  },
  { 
   
    title: "Interactive Blueprints", 
    desc: "We transform complex ideas into interactive blueprints allowing you to visualize and validate the user journey before a single line of code is written. This phase ensures that the final product logic is perfect and ready for global scalability.", 
    img: webIcon, 
    alt: "Wireframing and Interactive Prototyping Icon - Campaignsquat" 
  },
  { 
  
    title: "Expert UX Audit System", 
    desc: "Identifying conversion bottlenecks and usability friction through expert audits to rapidly improve your product engagement and overall ROI. We optimize existing platforms to ensure they meet the highest modern standards of digital performance.", 
    img: auditIcon, 
    alt: "UX Audit and Conversion Optimization Icon - Campaignsquat" 
  }
];

   const featureData = [
  {
    title: ["Human-Centric UX Design Focused on Growth"],
    desc: "At Campaignsquat Ltd., we leverage cognitive psychology to minimize user friction and maximize retention. By reducing cognitive load and streamlining navigation, we create intuitive interfaces that feel like a natural extension of your user's thought process. Our research-driven UX strategy utilizes heuristic evaluation and user behavior mapping to ensure every interaction leads toward your business goals while maintaining a high-performance digital flow.",
    img: uxAuditImg,
    reverse: false,
    alt: "Human-Centric UI/UX Design for Growth - Campaignsquat Ltd"
  },
  {
    title: ["Inclusive Design Systems for Global Reach"],
    desc: "Accessibility is a core pillar of our design philosophy. We build interfaces that are usable by everyone, strictly adhering to WCAG 2.1 standards for international compliance. By utilizing high-contrast visuals, screen-reader compatibility, and inclusive navigation patterns, we ensure your digital product is ethical and accessible to the widest possible global audience. This professional approach strengthens brand trust and improves SEO rankings today.",
    img: accessibilityImg,
    reverse: true,
    alt: "WCAG Compliant Accessible Web Design - Campaignsquat Ltd"
  },
  {
    title: ["Conversion-Driven Visual Design Strategy"],
    desc: "We merge aesthetic excellence with strategic UI patterns to drive measurable ROI. By analyzing visual hierarchy and information architecture, we guide users toward your primary conversion goals. Our science of persuasion approach turns casual visitors into high-value customers by building trust through cohesive and high-impact visual storytelling. We focus on conversion rate optimization (CRO) to make your platform a leader in the competitive market.",
    img: businessImg,
    reverse: false,
    alt: "Conversion-Driven UI Design Strategy - Campaignsquat Ltd"
  },
  {
    title: ["Scalable Architecture and Atomic Design"],
    desc: "Built to grow and designed to last. We create comprehensive Atomic Design Systems and modular UI kits that allow your product to scale effortlessly across platforms. Our developer-friendly handoffs and adaptive architecture ensure your platform remains high-performing and consistent as your business evolves. This technical foresight significantly reduces future development costs and time-to-market while ensuring a professional and unified brand identity.",
    img: scalableImg,
    reverse: true,
    alt: "Scalable Design Systems and Atomic Architecture - Campaignsquat Ltd"
  }
];

   const processSteps = [
    { 
        // Step 1: Discovery & Strategy
        title: "Discovery & Strategy", 
        description: "We audit business goals to build a technical roadmap focused on your specific market KPIs and user needs.", 
        image: discoveryImg, 
        alt: "Strategic discovery phase for UI/UX roadmap and business KPI audit" 
    },
    { 
        // Step 2: UX Design & Planning
        title: "UX Design & Planning", 
        description: "Crafting intuitive, low-friction interfaces that simplify even the most complex user journeys and data.", 
        image: designImg, 
        alt: "UX design planning with wireframes and low-friction user interface mapping" 
    },
    { 
        // Step 3: Testing & Iteration
        title: "Testing & Iteration", 
        description: "Refining every pixel through data-driven feedback and usability testing to ensure peak product performance.", 
        image: iterationImg, 
        alt: "Data-driven usability testing and pixel-perfect design iteration phase" 
    },
    { 
        // Step 4: Handoff & Support
        title: "Handoff & Support", 
        description: "Delivering developer-ready assets, documentation, and design systems for a flawless and high-quality launch.", 
        image: handoffImg, 
        alt: "Developer handoff with full documentation and design system support" 
    }
];

    const industryData = [
        { title: "FinTech", desc: " We design high-trust digital banking interfaces that simplify complex financial data through intuitive, secure, and seamless user journeys.", img: img1, alt: "FinTech Digital Banking UI UX Design Solution" },
        { title: "E-commerce", desc: "Our experts build high-converting shopping experiences designed to maximize sales, reduce friction, and build long-term customer loyalty.", img: img2, alt: "E-commerce Shopping Experience UI UX Design" },
        { title: "HealthTech", desc: " We create accessible, human-centric designs for healthcare apps that prioritize patient care, data clarity, and secure medical workflows.", img: img3, alt: "HealthTech and Medical App UI UX Design" },
        { title: "EdTech", desc: "Our team masters digital learning by building interactive, engaging, and easy-to-navigate educational platforms for modern global students.", img: img4, alt: "EdTech Learning Platform UI UX Design" },
        { title: "SaaS & B2B", desc: " We simplify complex enterprise workflows with powerful, scalable, and user-friendly dashboard designs built for high-performance teams.", img: img5, alt: "SaaS Dashboard and B2B Software Design" },
        { title: "Real Estate", desc: " We craft visually-driven platforms for effortless property discovery, featuring immersive virtual tours and automated lead generation tools.", img: img6, alt: "Real Estate Platform and Property Discovery Design" },
        { title: "Travel & Hospitality", desc: " Our designers build delightful booking experiences and exploration tools that turn global travelers into recurring business assets.", img: img7, alt: "Travel and Hospitality Booking App UI UX" },
        { title: "Food & Logistics", desc: " We optimize delivery speed and convenience through frictionless ordering interfaces and real-time tracking for complex supply chains.", img: img8, alt: "Food Delivery and Logistics UI UX Design" }
    ];

    const points = ["User-Centric Methodology", "Data-Driven Design Strategy", "High-Fidelity Interaction Design", "Conversion Rate Optimization (CRO)", "Scalable Design Systems"];

    return (
        <>
        <DynamicSchema  pageTitle="UI/UX Design Services" />
        <main className="overflow-hidden font-poppins bg-[#02050a]">
            <Helmet>
                <title>UI/UX Design Services | Campaignsquat Ltd. | Custom Product Design</title>
                <meta name="description" content="Partner with Campaignsquat Ltd. for premium UI/UX design services. We build scalable, user-centric, and high-conversion digital products. Get a free consultation!" />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content="UI/UX Design Services | Campaignsquat Ltd." />
                <meta property="og:description" content="We merge aesthetic excellence with strategic UI patterns to drive measurable ROI." />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            {/* 1. Hero Section */}
           <section className="relative w-full flex items-start lg:items-center mt-4 md:mt-20  overflow-hidden ">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F7A400]/10 blur-[120px] rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full opacity-30"></div>

                <div className="max-w-[1445px] mx-auto  lg:px-20 relative z-10 w-full  ">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left px-6">
                            <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white leading-[1.2] md:leading-[1.4]">
                                 Premier Custom UI/UX Design Agency for Scalable Digital Products
                            </h1>
                            <p className="text-white text-[16px] md:text-[20px]  mx-auto lg:mx-0 leading-relaxed font-light mt-6">
                                Elevate your brand with data-driven UI/UX Design Services. At Campaignsquat Ltd., we bridge the gap between aesthetics and performance, engineering high-growth digital journeys that eliminate friction, maximize retention, and convert casual visitors into loyal brand advocates.

                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                                <Link to="/home/contact" className="w-full sm:w-auto">
                                    <button aria-label="Start Your High-Growth Project" className="bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all transform hover:bg-[#02050A] active:scale-95 shadow-lg shadow-[#F7A400]/10">
                                         Your High-Growth Project
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                            <div className="absolute w-[70%] h-[70%] bg-[#F7A400]/5 blur-[80px] rounded-[5px]"></div>
                            <img 
                                src={heroImage} 
                                alt="Premium UI UX Design Showcase by Campaignsquat Ltd" 
                                loading="eager"
                                fetchpriority="high"
                                className="relative z-10 w-full h-auto max-w-[550px] drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full overflow-hidden pt-20 md:pt-30 py-12 md:py-20 ">
                <BrandSlider />
            </section>

            {/* 2. Expertise Section */}
            <section className="bg-[#0A0A0A] py-12 md:py-20 ">
    <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full text-center">
        <div className="mb-20  mx-auto">
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">
                 Our UI/UX Design Service Expertise for Growth
            </h2>
            <p className="text-white text-[16px] md:text-[20px] mx-auto leading-relaxed font-medium">
                We deploy a research-backed methodology to ensure your digital products are visually stunning and technically superior. Our approach as a custom UI/UX design agency ensures every pixel serves a specific and high-impact business purpose.
            </p>
        </div>

        {/* এখানে lg:grid-cols-2 করা হয়েছে যাতে বড় স্ক্রিনে ২টা কার্ড দেখায়।
            w-full ব্যবহার করা হয়েছে যাতে এটি 1445px এর পুরোটা ব্যবহার করে (প্যাডিং বাদ দিয়ে)।
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
            {expertiseData.map((item, index) => (
                <div key={index} className="group relative bg-[#02050A] border border-white/30 p-10 rounded-[5px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full">
                    
                    <div className="mb-8 w-14 h-14 flex items-center justify-start relative z-10">
                        <img src={item.img} alt={item.alt} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 origin-left" style={{ filter: 'invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)' }} />
                    </div>
                    <div className="relative z-10 ">
                        <h3 className="text-white text-[20px] md:text-[22px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">{item.title}</h3>
                        <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F7A400]/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>
    </div>
</section>

            {/* 3. Features Section */}
            <section className="py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
                    <div className="flex flex-col gap-24 md:gap-44">
                        {featureData.map((item, index) => (
                            <div key={index} className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}>
                                <div className="w-full md:w-1/2 pt-4 md:pt-6">
                                    <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8">
                                        {item.title.map((line, i) => (
                                            <span key={i} className="block leading-[1.3] mb-1 last:mb-0">{line}</span>
                                        ))}
                                    </h2>
                                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light text-left max-w-[580px]">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="relative group overflow-hidden rounded-[5px]">
                                        <div className="absolute -inset-4 bg-[#F7A400]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img 
                                            src={item.img} 
                                            alt={item.alt} 
                                            loading="lazy" 
                                            className="relative z-10 w-full aspect-[16/10] object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] rounded-[5px]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="w-full bg-[#02050A] py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 ">
                    <div className="flex flex-col items-center text-center mb-20 md:mb-28 pt-4 md:pt-4">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold tracking-tight mb-6">
                             Custom UI/UX Design Service Process
                        </h2>
                        <p className="text-white text-[16px] md:text-[18px] max-w-5xl mx-auto font-light">
                           A transparent, four-stage workflow designed to minimize risk and maximize product impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 -mt-6 md:-mt-10">
                        {processSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                                <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                                    <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>
                                    <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                                        <img 
                                            src={step.image} 
                                            alt={step.alt} 
                                            loading="lazy"
                                            className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20" 
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center -mt-4">
                                    <h3 className="text-white text-[22px] md:text-[24px] lg:text-[26px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-white text-[15px] md:text-[16px] leading-relaxed font-light max-w-[280px]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Section */}
            <section className="py-12 md:py-20 lg:py-40 relative z-[1]">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 ">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/2 flex flex-col text-left order-2 lg:order-1 relative z-50"> 
                            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.3] mb-8">
                               Why is Campaignsquat Ltd the best UI UX Design service provider?
                            </h2>
                            <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light mb-10 max-w-[580px]">
                                At <span className="">Campaignsquat</span>, we don't just design screens; we solve complex business problems. Our high-impact UI/UX solutions are crafted to turn casual visitors into loyal customers through seamless digital experiences.
                            </p>
                            <div className="flex flex-col gap-3 md:gap-4 mb-12">
                                {points.map((point, index) => (
                                    <div key={index} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full border-2 border-[#F7A400] flex items-center justify-center">
                                            <Check className="text-[#F7A400] w-3.5 h-3.5 md:w-4 md:h-4 stroke-[4px]" />
                                        </div>
                                        <span className="text-white text-[18px] md:text-[20px] font-medium leading-none group-hover:text-[#F7A400] transition-colors">
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-start relative z-[100]">
                                <Link to="/home/contact" className="inline-block w-full sm:w-auto cursor-pointer">
                                    <button aria-label="Book a Free Consultation" className="bg-[#F7A400] text-black hover:text-white border-2 border-[#F7A400] text-[14px] md:text-[15px] rounded-[5px] px-8 py-2 font-semibold hover:bg-transparent transition-all duration-500 active:scale-95 shadow-lg shadow-[#F7A400]/20">
                                        Book a Free Consultation
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative z-10">
                            <div className="relative flex justify-center lg:justify-end">
                                <img 
                                    src={sideImg} 
                                    alt="High-impact UI UX design excellence and user satisfaction - Campaignsquat" 
                                    loading="lazy"
                                    className="w-full h-auto max-h-[750px] lg:max-h-[850px] object-contain  shadow-2xl scale-105 lg:scale-110" 
                                />
                               <div className="absolute inset-0 bg-[#F7A400]/5 blur-[120px] rounded-full -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Industries Section */}
            <section className="py-12 md:py-20 relative z-10 overflow-hidden">
                <style>{`
                    @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    .border-run-container { position: relative; padding: 2px; overflow: hidden; background: rgba(255, 255, 255, 0.05); border-radius: 7px; }
                    .border-run-container:hover .running-border { opacity: 1; }
                    .running-border { position: absolute; width: 250%; height: 250%; top: -75%; left: -75%; background: conic-gradient(transparent, transparent, transparent, #F7A400); animation: rotate-border 3s linear infinite; opacity: 0; transition: opacity 0.3s; z-index: 0; }
                    .card-content { position: relative; background: #0a0a0a; border-radius: 5px; z-index: 1; height: 100%; }
                `}</style>
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full">
                    <div className="text-center max-w-6xl mx-auto mb-16 md:mb-24 ">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-4">
                             Industry Expertise in High-Performance UI/UX Design Solutions
                        </h2>
                        <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-light">
                            We deliver world-class UI/UX design solutions across diverse sectors, solving complex business challenges with strategic, user-centric, and scalable digital products tailored for global success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6 ">
                        {industryData.map((item, index) => (
                            <div key={index} className="border-run-container group">
                                <div className="running-border"></div>
                                <div className="card-content flex flex-col">
                                    <div className="w-full aspect-[4/3] overflow-hidden border-b border-white/5 rounded-t-[5px]">
                                        <img 
                                            src={item.img} 
                                            alt={item.alt} 
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 flex flex-col text-left">
                                        <h3 className="text-white text-xl md:text-[22px] font-bold mb-3 group-hover:text-[#F7A400] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-white text-[14px] md:text-[15px] font-light leading-relaxed">
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

const Questions = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { question: "What is the typical timeline for a UI/UX project?", answer: "Small projects take 2-4 weeks, while complex SaaS platforms require 8-12 weeks. We prioritize agile delivery to get your MVP to market faster." },
        { question: "How do you handle revisions during the design phase?", answer: "We include structured feedback loops at every milestone—Wireframing, UI Design, and Prototyping—ensuring the final product aligns perfectly with your vision." },
        { question: "Will the designs be ready for my development team?", answer: "Yes. We provide full Figma/Adobe XD handoffs, including style guides, assets, and documentation, ensuring a 1:1 transition from design to code." },
        { question: "Can you redesign an existing product to improve conversions?", answer: "Absolutely. We start with a UX Audit to identify why users are dropping off and then re-engineer the interface specifically to increase your conversion rates." },
        { question: "How do you ensure the design is scalable for future features?", answer: "We build using Atomic Design principles, creating a library of reusable components and symbols that allow your team to add new features without breaking the UI." }
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
                                openIndex === index ? 'border-[#f7a400] bg-[#0A0A0A]' : 'border-[#02050a] bg-[#0A0A0A] hover:border-[#f7a400]'
                            }`}
                        >
                            <button
                                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-[15px] md:text-[18px] font-semibold leading-tight transition-colors duration-300 pr-4 text-white">
                                    {faq.question}
                                </span>
                                <span className="shrink-0">
                                    {openIndex === index ? (
                                        <div className="bg-[#f7a400] p-1 md:p-1.5 rounded-full"><Minus size={18} className="md:w-[22px] md:h-[22px]" strokeWidth={3} color="black" /></div>
                                    ) : (
                                        <div className="bg-white/10 p-1 md:p-1.5 rounded-full"><Plus size={18} className="md:w-[18px] md:h-[18px]" strokeWidth={3} color="white" /></div>
                                    )}
                                </span>
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
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

export default UiUxDesign;