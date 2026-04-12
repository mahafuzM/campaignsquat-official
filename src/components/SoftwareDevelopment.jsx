import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Check, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // SEO Management

// imges inputs
import heroImage from '../assets/images/Enterprise custom software development dashboard showing analytics and business logic (2).webp';
import researchIcon from '../assets/images/research.png';
import uxIcon from '../assets/images/ux-design (1).png';
import webIcon from '../assets/images/web-design.png';
import auditIcon from '../assets/images/3d-modeling.png'; 
import uxAuditImg from "../assets/images/Campaignsquat robust backend architecture and digital ecosystem visualization.webp";
import accessibilityImg from "../assets/images/Enterprise software security standards and data encryption protocols.webp";
import businessImg from "../assets/images/Scalable microservices and Kubernetes containerization for enterprise software.webp";
import scalableImg from "../assets/images/Legacy system modernization and secure cloud data migration services.webp";
import discoveryImg from '../assets/images/research.png';
import designImg from '../assets/images/ux-design (1).png';
import iterationImg from '../assets/images/web-design.png';
import handoffImg from '../assets/images/deployment.png';
import sideImg from '../assets/images/Campaignsquat engineering excellence in custom software development (1).webp';
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

const SoftwareDevelopment = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

   const expertiseData = [
  {
    title: "Tailored Software Logic",
    desc: "We build bespoke software solutions designed to solve your specific business challenges and automate complex workflows. Our team focuses on creating unique internal tools that streamline operations and drive long-term digital transformation.",
    img: researchIcon,
    alt: "Tailored Software Logic and Business Process Automation"
  },
  {
    title: "Robust Backend Systems",
    desc: "Developing secure and scalable backend architectures that can handle massive data processing without performance loss. We prioritize high-speed technical stability to ensure your custom platform remains reliable as your global business grows.",
    img: uxIcon,
    alt: "Robust Backend Systems and Scalable Data Architecture"
  },
  {
    title: "Agile Delivery Process",
    desc: "Following a strict agile methodology to ensure rapid development cycles and frequent quality assurance testing phases. This approach allows us to deliver functional software modules quickly while maintaining absolute precision and flexibility.",
    img: webIcon,
    alt: "Agile Delivery Process and Rapid Software Development"
  },
  {
    title: "Enterprise Integration",
    desc: "Ensuring seamless connectivity between your new custom software and existing third-party business applications or legacy systems. We build secure API layers to provide a unified and professional digital ecosystem for your entire organization.",
    img: auditIcon,
    alt: "Enterprise Integration and Secure API Connectivity"
  }
];
    const featureData = [
  {
    title: ["Custom Enterprise Software Solutions Pro"],
    desc: "We build more than just tools; we engineer comprehensive software ecosystems and custom enterprise software solutions. Our philosophy focuses on backend architectures that handle millions of data points with zero latency. By prioritizing clean code, we provide end-to-end software development lifecycle (SDLC) support to ensure your system remains stable. Campaignsquat Ltd. delivers professional software that manages complex logic with absolute precision.",
    img: uxAuditImg,
    reverse: false,
    alt: "Campaignsquat robust backend architecture and digital ecosystem visualization"
  },
  {
    title: ["SaaS Product Development Services Tech"],
    desc: "Data integrity is non-negotiable. In our SaaS product development services and cloud-native application development, we implement end-to-end encryption and follow OWASP guidelines. Our engineering team ensures every module complies with global security standards to safeguard intellectual property. We provide professional security hardening that keeps your cross-platform desktop & mobile apps resilient against evolving digital threats worldwide today.",
    img: accessibilityImg,
    reverse: true,
    alt: "Enterprise software security standards and data encryption protocols"
  },
  {
    title: ["Microservices Architecture Development"],
    desc: "Future-proof your growth with our microservices architecture development and containerization approach. We build software that adapts automatically to user surges, ensuring consistent high performance without architectural re-designs. This modularity allows for faster updates and isolated scaling, reducing your long-term maintenance costs. Campaignsquat Ltd. ensures your professional infrastructure is ready for high-speed growth and global expansion.",
    img: businessImg,
    reverse: false,
    alt: "Scalable microservices and Kubernetes containerization for enterprise software"
  },
  {
    title: ["Legacy Software Modernization Strategy"],
    desc: "Don’t let outdated tech stall growth. We specialize in legacy software modernization, replacing manual spreadsheets with custom software and AI-driven custom automation software. We ensure secure data migration while introducing high-speed processing and modern API integrations. Our low-code to custom code hybrid solutions allow your business to leverage modern automation without losing historical data while maintaining a professional competitive edge.",
    img: scalableImg,
    reverse: true,
    alt: "Legacy software modernization and secure cloud data migration services"
  }
];

    const processSteps = [
    { 
        // Step 1: Discovery & Analysis
        title: "Discovery & Analysis", 
        description: "Technical feasibility studies and business requirement mapping to align every feature with your ROI goals.", 
        image: discoveryImg, 
        alt: "Software project technical feasibility study and ROI-focused requirement mapping" 
    },
    { 
        // Step 2: System Architecture
        title: "System Architecture", 
        description: "Designing robust database schemas and scalable technical blueprints that serve as a roadmap for coding.", 
        image: designImg, 
        alt: "Scalable system architecture and database schema design for custom software" 
    },
    { 
        // Step 3: Agile Dev & QA
        title: "Agile Dev & QA", 
        description: "Iterative development cycles paired with rigorous automated and manual testing to ensure bug-free builds.", 
        image: iterationImg, 
        alt: "Agile software development life cycle with automated QA and bug testing" 
    },
    { 
        // Step 4: Deployment & Ops
        title: "Deployment & Ops", 
        description: "Smooth rollout with CI/CD pipelines and 24/7 real-time performance monitoring for post-launch stability.", 
        image: handoffImg, 
        alt: "Software deployment using CI/CD pipelines and real-time DevOps monitoring" 
    }
];

    const points = [
        "Full-Cycle Agile SDLC", 
        "Microservices & API-First Design", 
        "Post-Launch Technical Support", 
        "Dedicated Engineering Teams", 
        "Comprehensive Technical Documentation"
    ];

    const industryData = [
        { title: "Fintech & Banking", desc: "We build secure, high-concurrency software for automated financial transactions and strict compliance to ensure data integrity.", img: img1, alt: "Fintech software for secure banking and financial transactions" },
        { title: "Smart Logistics", desc: " Our experts develop AI-driven supply chain management and real-time fleet tracking solutions for seamless operational efficiency.", img: img2, alt: "Logistics software for AI-driven supply chain management" },
        { title: "Health-Tech", desc: "We create HIPAA-compliant patient portals and secure medical data management systems designed for modern healthcare providers.", img: img3, alt: "Health-tech HIPAA-compliant medical data management system" },
        { title: "EdTech Systems", desc: "Our team builds scalable learning management systems (LMS) and centralized campus automation to streamline global digital education.", img: img4, alt: "EdTech learning management system and campus automation" },
        { title: "SaaS Product Engineering", desc: "We develop multi-tenant architectures designed for global subscription-based markets with robust and scalable backend stability.", img: img5, alt: "SaaS product engineering and multi-tenant architecture development" },
        { title: "Industrial Automation", desc: " Our developers craft smart manufacturing software to optimize production lines and resource allocation for large-scale operations.", img: img6, alt: "Industrial automation software for smart manufacturing optimization" },
        { title: "Hospitality & Travel", desc: " We build end-to-end reservation engines and property management software (PMS) to ensure frictionless user booking experiences.", img: img7, alt: "Hospitality software for reservation engines and property management" },
        { title: "Enterprise Retail", desc: "Our team develops integrated POS ecosystems and centralized inventory management for global retail chains to drive business growth.", img: img8, alt: "Enterprise retail POS ecosystem and inventory management software" },
    ];

    return (
        <>
        <DynamicSchema  pageTitle="Software Development Services" />
        <main className="overflow-hidden font-poppins bg-[#02050a]">
            <Helmet>
                <title>Custom Software Development Services | Campaignsquat Ltd.</title>
                <meta name="description" content="Drive growth with Campaignsquat’s enterprise software solutions. We specialize in cloud-native engineering, legacy migration, and scalable microservices." />
                <link rel="canonical" href="https://campaignsquat.com/software-development" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="Custom Software Development Services | Campaignsquat Ltd." />
                <meta property="og:description" content="Drive growth with Campaignsquat’s enterprise software solutions. Specialist cloud-native engineering and legacy migration." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={heroImage} />

                {/* Structured Data: Service & FAQ */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Service",
                                "name": "Custom Software Development",
                                "provider": {
                                    "@type": "Organization",
                                    "name": "Campaignsquat Ltd."
                                },
                                "description": "Enterprise-grade software engineering specializing in cloud-native applications, microservices, and legacy modernization.",
                                "areaServed": "Worldwide"
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How do you estimate the timeline and cost for a project?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "We provide a detailed project breakdown after the discovery phase, utilizing fixed-price or time-and-materials models based on your specific scope and complexity."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can your team work with our existing internal developers?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. We offer team augmentation and collaborative development models, ensuring our engineers integrate seamlessly with your internal workflows and CI/CD pipelines."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How do you ensure the scalability of the software?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Scalability is baked into our architecture. We use microservices, containerization (Docker/Kubernetes), and cloud-native structures (AWS/Azure)."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Why is custom software better than off-the-shelf SaaS products?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Custom software is built specifically for your unique workflows, offering total control over security, 100% IP ownership, and no recurring per-user licensing fees."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is your approach to software security and data integrity?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "We follow industry-standard security protocols, including OWASP guidelines, end-to-end encryption, and multi-factor authentication."
                                        }
                                    }
                                ]
                            }
                        ]
                    })}
                </script>
            </Helmet>

            {/* 1. Hero Section */}
            <section className="relative w-full flex items-center  mt-4 md:mt-20  overflow-hidden ">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F7A400]/10 blur-[120px] rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full opacity-30"></div>
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
                            <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white leading-[1.2] md:leading-[1.4] lg:leading-[1.4]">Custom Software Development Services for Modern Enterprises Today</h1>
                            <p className="text-white text-[16px] md:text-[20px]  mx-auto lg:mx-0 leading-relaxed font-normal">
                               Remove operational bottlenecks with Campaignsquat’s scalable and cloud-native solutions. From legacy migration to high-performance architecture, we deliver robust digital products that drive long-term business growth and ensure your technical success globally.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                                <Link to="/home/contact" className="w-full sm:w-auto">
                                    <button aria-label="Get a free technical consultation" className=" bg-[#F7A400] border-[#f7a400] border-2 text-black hover:text-white font-semibold py-2 px-8 md:px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all duration-300 transform hover:bg-[#02050A]  active:scale-95  group">
                                        Get Your Free Technical Consultation
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                            <div className="absolute w-[70%] h-[70%] bg-[#F7A400]/5 blur-[80px] rounded-full"></div>
                            {/* LCP Optimization: fetchpriority high and loading eager */}
                            <img 
                                src={heroImage} 
                                alt="Enterprise custom software development dashboard showing analytics and business logic" 
                                fetchpriority="high"
                                loading="eager"
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
    <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full text-center ">
        <div className="mb-20">
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">Enterprise-Grade <span>Software Engineering Expertise</span></h2>
            <p className="text-white text-[16px] md:text-[20px]  mx-auto leading-relaxed font-medium">Harness cutting-edge technology stacks to build resilient, future-proof applications tailored to your specific business logic.</p>
        </div>

        {/* lg:grid-cols-2 করে দেওয়া হয়েছে যাতে বড় স্ক্রিনে ২ লাইনে ৪টি কার্ড ৫০% করে জায়গা নেয় */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
            {expertiseData.map((item, index) => (
                <div key={index} className="group relative bg-[#02050A] border border-white/10 p-10 rounded-[5px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full">

                    <div className="mb-8 w-16 h-16 flex items-center justify-start relative z-10">
                        <img loading="lazy" src={item.img} alt={`${item.title} icon - Campaignsquat expertise`} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 origin-left" style={{ filter: 'invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)' }} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-white text-[20px] md:text-[18px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">{item.title}</h3>
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
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full  ">
                    <div className="flex flex-col gap-24 md:gap-44">
                        {featureData.map((item, index) => (
                            <div key={index} className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}>
                                <div className="w-full md:w-1/2">
                                    {/* Main section titles use H2/H3 appropriately */}
                                    <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8">
                                        {item.title.map((line, i) => <span key={i} className="block leading-[1.3] mb-1 last:mb-0">{line}</span>)}
                                    </h2>
                                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light text-left max-w-[580px]">{item.desc}</p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="relative group overflow-hidden rounded-[5px]">
                                        <div className="absolute -inset-4 bg-[#F7A400]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img loading="lazy" src={item.img} alt={item.alt} className="relative z-10 w-full aspect-[16/10] object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] rounded-[5px]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="w-full bg-[#02050A] py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16  ">
                    <div className="flex flex-col items-center text-center mb-20 md:mb-28">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold tracking-tight mb-6"> Our Custom Software Development SDLC </h2>
                        <p className="text-white text-[16px] md:text-[20px] max-w-5xl mx-auto font-light">We follow a structured, transparent Agile process to deliver high-quality code on budget. </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
                        {processSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                                <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                                    <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>
                                    <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                                        <img loading="lazy" src={step.image} alt={step.alt} className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <h3 className="text-white text-[22px] md:text-[24px] lg:text-[26px] font-bold mb-4 group-hover:text-[#F7A400] transition-colors">{step.title}</h3>
                                    <p className="text-white text-[15px] md:text-[16px] leading-relaxed font-light max-w-[280px]">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Section */}
            <section className="py-12 md:py-20 lg:py-40 relative z-[1]">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full relative ">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/2 flex flex-col text-left order-2 lg:order-1 relative z-20">
                            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.2] mb-8">Why is Campaignsquat Ltd the best Softwer Devlopment service provider?</h2>
                            <p className="text-white text-[16px] md:text-[20px] leading-relaxed font-light mb-10 max-w-[580px]">At Campaignsquat, we combine technical excellence with business strategy to deliver software products that make an impact.</p>
                            <div className="flex flex-col gap-3 md:gap-4 mb-12">
                                {points.map((point, index) => (
                                    <div key={index} className="flex items-center gap-5 group">
                                        <div className="w-6 h-6 md:w-6 md:h-6 shrink-0 rounded-full border-2 border-[#F7A400] flex items-center justify-center">
                                            <Check className="text-[#F7A400] w-5 h-5 md:w-6 md:h-6 stroke-[3px]" />
                                        </div>
                                        <span className="text-white text-[16px] md:text-[18px] font-medium">{point}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-start">
                                <Link to="/home/contact" className="inline-block w-full sm:w-auto">
                                    <button aria-label="Start your software project" className=" bg-[#F7A400] text-black  hover:text-white border-2 border-[#F7A400] text-[14px] md:text-[15px] rounded-[5px]  px-8 md:px-10 py-2 font-semibold hover:bg-[#0a0a0a]  transition-all duration-500 shadow-lg shadow-[#F7A400]/10 active:scale-95 group">
                                     Get Started
                                     </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative z-10">
                            <div className="relative flex justify-center lg:justify-end">
                                <img loading="lazy" src={sideImg} alt="Campaignsquat engineering excellence in custom software development" className="w-full h-auto max-h-[650px] object-contain  shadow-2xl" />
                                <div className="absolute inset-0 bg-[#F7A400]/5 blur-[120px] rounded-full -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Industry Expertise (Running Border) */}
            <section className="py-12 md:py-20  relative z-10 overflow-hidden">
                <style>{`
                    @keyframes rotate-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    .border-run-container { position: relative; padding: 2px; overflow: hidden; background: rgba(255, 255, 255, 0.05); border-radius: 7px; }
                    .border-run-container:hover .running-border { opacity: 1; }
                    .running-border { position: absolute; width: 250%; height: 250%; top: -75%; left: -75%; background: conic-gradient(transparent, transparent, transparent, #F7A400); animation: rotate-border 3s linear infinite; opacity: 0; transition: opacity 0.3s; z-index: 0; }
                    .card-content { position: relative; background: #0a0a0a; border-radius: 5px; z-index: 1; height: 100%; }
                `}</style>
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full ">
                    <div className="text-center max-w-6xl mx-auto mb-16 md:mb-24">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">Our Industry-Specific Software Development Expertise for Success</h2>
                        <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-light">Campaignsquat Ltd. provides expert custom software development for diverse industries to solve unique business challenges. We build scalable, high-performance software solutions that ensure seamless user journeys and robust backend stability across all global business sectors.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
                        {industryData.map((item, index) => (
                            <div key={index} className="border-run-container group">
                                <div className="running-border"></div>
                                <div className="card-content flex flex-col">
                                    <div className="w-full aspect-[4/3] overflow-hidden border-b border-white/5 rounded-t-[5px]">
                                        <img loading="lazy" src={item.img} alt={item.alt} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 flex flex-col text-left">
                                        <h3 className="text-white text-xl md:text-[22px] font-bold mb-3 group-hover:text-[#F7A400] transition-colors">{item.title}</h3>
                                        <p className="text-white text-[14px] md:text-[15px] font-light ">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
       
            {/* Questions section is called here */}
            <Questions />
        </main>
        </>
    );
};

// Separated Questions Component
const Questions = () => {
    const [openIndex, setOpenIndex] = useState(0);

   const faqs = [
    {
        question: "How do you estimate the timeline and cost for a project?",
        answer: "We provide a detailed project breakdown after the discovery phase, utilizing fixed-price or time-and-materials models based on your specific scope and complexity. This ensures transparency and prevents budget overruns."
    },
    {
        question: "Can your team work with our existing internal developers?",
        answer: "Yes. We offer team augmentation and collaborative development models, ensuring our engineers integrate seamlessly with your internal workflows, tools, and CI/CD pipelines for a unified output."
    },
    {
        question: "How do you ensure the scalability of the software?",
        answer: "Scalability is baked into our architecture. We use microservices, containerization (Docker/Kubernetes), and cloud-native structures (AWS/Azure) to ensure your software can handle growing user bases and data loads without performance degradation."
    },
    {
        question: "Why is custom software better than off-the-shelf SaaS products?",
        answer: "Custom software is built specifically for your unique workflows, offering total control over security and scalability. Unlike off-the-shelf products, you own the code (100% IP ownership) and avoid recurring per-user licensing fees."
    },
    {
        question: "What is your approach to software security and data integrity?",
        answer: "We follow industry-standard security protocols, including OWASP guidelines, end-to-end encryption, and multi-factor authentication. From the initial architecture to final deployment, we prioritize protecting your intellectual property."
    }
];

    return (
        <section className="w-full bg-[#02050A] py-12 md:py-20 overflow-hidden font-poppins">
            <div className="max-w-[1445px] mx-auto px-5 sm:px-10 md:px-16">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-semibold text-white mb-4 md:mb-8 leading-[1.2]">
                        Just Ask Us Some Questions
                    </h2>
                    <p className="text-white text-[16px] md:text-[20px] max-w-2xl mx-auto font-light">
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

export default SoftwareDevelopment;