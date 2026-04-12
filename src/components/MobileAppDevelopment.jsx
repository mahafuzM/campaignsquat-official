import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Technical SEO

// ইমেজ ইমপোর্টসমূহ
import heroImage from '../assets/images/Expert Custom Mobile App Development Services.webp';
import researchIcon from '../assets/images/research.png';
import uxIcon from '../assets/images/ux-design (1).png';
import webIcon from '../assets/images/web-design.png';
import auditIcon from '../assets/images/3d-modeling.png'; 
import uxAuditImg from "../assets/images/High Performance Mobile App Interface.webp";
import accessibilityImg from "../assets/images/Secure Mobile App Architecture and Data Privacy.webp";
import businessImg from "../assets/images/Mobile App API Integration Ecosystem.webp";
import scalableImg from "../assets/images/Scalable Mobile App Development Solutions.webp";
import discoveryImg from '../assets/images/research.png';
import designImg from '../assets/images/ux-design (1).png';
import iterationImg from '../assets/images/web-design.png';
import handoffImg from '../assets/images/deployment.png';
import sideImg from '../assets/images/mobile app.webp';
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

const MobileAppDevelopment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

   const expertiseData = [
  {
    title: "Native App Development",
    desc: "We build high-performance native applications for iOS and Android that leverage the full potential of mobile hardware. Our team ensures a smooth and professional user experience with rapid response times and high-speed functional reliability.",
    img: uxIcon,
    alt: "Native iOS and Android Mobile App Development"
  },
  {
    title: "Cross-Platform Coding",
    desc: "Developing versatile cross-platform solutions that work seamlessly on multiple devices using a single codebase. We focus on technical agility and cost-effective building to help your brand reach a wider global audience with absolute precision.",
    img: researchIcon,
    alt: "Cross-Platform Mobile Coding and Technical Agility"
  },
  {
    title: "User-Centric App UI",
    desc: "Crafting intuitive and engaging mobile interfaces that prioritize user satisfaction and ease of navigation. Our experts ensure that every touchpoint is optimized for mobile interactions to drive high retention rates and brand loyalty today.",
    img: webIcon,
    alt: "User-Centric Mobile App UI UX Design"
  },
  {
    title: "Scalable Mobile Logic",
    desc: "Building robust backend architectures designed to support growing user bases and complex mobile data processing. We prioritize secure cloud integration and clean code to maintain a professional and stable digital environment for your app.",
    img: auditIcon,
    alt: "Scalable Mobile Logic and Backend Architecture"
  }
];

    const featureData = [
  {
    title: ["Custom iOS and Android App Development Pro"],
    desc: "A great app is about speed. Campaignsquat Ltd. provides custom iOS and Android app development using native iOS (Swift) and Android (Kotlin) development techniques. We focus on reducing mobile app load time for better UX, ensuring your application runs smoothly under heavy loads. By optimizing code, we deliver high-performance Flutter app development that keeps users engaged. Our professional approach ensures a lightning-fast experience today.",
    img: uxAuditImg,
    reverse: false,
    alt: "High performance native and cross-platform mobile app engineering"
  },
  {
    title: ["Enterprise-Grade Mobile App Solutions Tech"],
    desc: "Data privacy is non-negotiable. Our enterprise-grade mobile application solutions implement high-level encryption and secure authentication. We specialize in AI-integrated smart mobile applications that follow industry best practices to protect user data. From secure payments to biometrics, Campaignsquat Ltd. ensures your app is resilient against modern threats and compliant with global standards, providing a professional and secure digital environment.",
    img: accessibilityImg,
    reverse: true,
    alt: "Enterprise mobile security with biometrics and encryption"
  },
  {
    title: ["Seamless Backend and API Integration Pro"],
    desc: "Your app should work in harmony with your ecosystem. We specialize in seamless backend and API integration for mobile apps, connecting your platform with CRM and ERP systems. Our expertise includes IoT-connected mobile interfaces and progressive web app (PWA) development for a unified experience. Campaignsquat Ltd. ensures that your professional mobile platform acts as a synchronized extension of your business, driving total operational speed.",
    img: businessImg,
    reverse: false,
    alt: "Mobile app backend architecture and API ecosystem integration"
  },
  {
    title: ["Full-Cycle Mobile Product Development Hub"],
    desc: "We build for your future success. Our full-cycle mobile product development and custom React Native solutions for business utilize a modular architecture. This allows you to add features and handle increasing traffic without starting from scratch. Campaignsquat Ltd. uses cloud-native technologies to ensure that as your business grows, your platform scales with it. We provide professional, future-ready apps that protect your initial investment.",
    img: scalableImg,
    reverse: true,
    alt: "Full-cycle mobile product development and scalable architecture"
  }
];

    const processSteps = [
    { 
        // Step 1: Strategic Planning
        title: "Strategic Planning", 
        description: "Deep-diving into app architecture and feature sets to align your product with specific business goals.", 
        image: discoveryImg, 
        alt: "Mobile app architecture planning and strategic feature set alignment" 
    },
    { 
        // Step 2: Full-Stack Dev
        title: "Full-Stack Dev", 
        description: "Coding your application with modern frameworks and clean-room practices for a high-performance reality.", 
        image: designImg, 
        alt: "Full-stack mobile app development using modern frameworks and clean code" 
    },
    { 
        // Step 3: Rigorous QA Testing
        title: "Rigorous QA Testing", 
        description: "Multi-device testing and performance tuning to ensure a flawless, bug-free, and stable user experience.", 
        image: iterationImg, 
        alt: "Multi-device mobile app quality assurance and performance tuning" 
    },
    { 
        // Step 4: Launch and Support
        title: "Launch and Support", 
        description: "Deploying your app to Play Store and App Store with full technical support and real-time monitoring now.", 
        image: handoffImg, 
        alt: "App Store and Google Play deployment with real-time performance monitoring" 
    }
];

    const points = ["End-to-End Development", "Agile Methodology", "User-Centric Approach", "Cloud-Ready Infrastructure", "Seamless API Integration"];

    const industryData = [
    { 
        title: "Finance & Banking", 
        desc: "We build secure mobile banking and wallet solutions featuring multi-layer encryption for modern digital users.", 
        img: img1, 
        alt: "Fintech Mobile App Solution" 
    },
    { 
        title: "Retail & E-commerce", 
        desc: "Our experts develop feature-rich shopping apps with integrated payment gateways and real-time order tracking.", 
        img: img2, 
        alt: "E-commerce Mobile App Development" 
    },
    { 
        title: "Healthcare & Telemedicine", 
        desc: "We create patient management apps and health trackers focusing on data privacy and mobile-first vitals visualization.", 
        img: img3, 
        alt: "Healthcare and Telemedicine App" 
    },
    { 
        title: "Education & Learning", 
        desc: "Our team builds e-learning platforms featuring video streaming, interactive quizzes, and seamless student progress tracking.", 
        img: img4, 
        alt: "E-learning Mobile Platform" 
    },
    { 
        title: "Logistics & Delivery", 
        desc: "We develop efficient delivery tracking and fleet management applications with real-time GPS and intuitive order handling.", 
        img: img5, 
        alt: "Logistics and Fleet Management App" 
    },
    { 
        title: "Travel & Navigation", 
        desc: "Our developers craft offline-ready navigation and quick booking flows designed specifically for modern global travelers.", 
        img: img6, 
        alt: "Travel and Booking App" 
    },
    { 
        title: "Real Estate & Property", 
        desc: "We build property listing apps featuring AR/VR tours and location-based services to drive higher user engagement.", 
        img: img7, 
        alt: "Real Estate Mobile Application" 
    },
    { 
        title: "Gaming & Immersive UI", 
        desc: "Our team creates immersive and responsive controls with high-energy visuals for a superior mobile gaming experience.", 
        img: img8, 
        alt: "Mobile Gaming and Immersive UI Design" 
    },
];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Do you develop for both iOS and Android platforms?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we specialize in both native development (Swift for iOS, Kotlin for Android) and cross-platform solutions using Flutter. This ensures your app reaches the widest possible audience while maintaining top-tier performance."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it typically take to develop a custom mobile app?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A standard MVP (Minimum Viable Product) usually takes 8-12 weeks. However, the timeline depends on feature complexity, API integrations, and design requirements. We follow an agile process to deliver functional milestones regularly."
                }
            },
            {
                "@type": "Question",
                "name": "Will you help with the App Store and Google Play Store submission?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We handle the entire deployment process, including app store optimization (ASO) guidance, asset preparation, and navigating the review guidelines to ensure your app gets approved and launched successfully."
                }
            },
            {
                "@type": "Question",
                "name": "Can you integrate third-party APIs and hardware features?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We have extensive experience integrating complex APIs, payment gateways (Stripe, SSLCommerz), and hardware features like GPS, Biometrics (FaceID/Fingerprint), and Camera functionalities into your mobile experience."
                }
            },
            {
                "@type": "Question",
                "name": "How do you handle app updates and bug fixes after launch?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer dedicated maintenance packages. Since mobile OS versions (iOS/Android) update frequently, we ensure your app stays compatible, secure, and optimized with regular performance tuning and feature enhancements."
                }
            }
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Custom Mobile App Development",
        "provider": {
            "@type": "Organization",
            "name": "Campaignsquat"
        },
        "description": "Build high-performance iOS and Android apps with our expert custom mobile app development specializing in Flutter, Native, and cross-platform solutions.",
        "areaServed": "Global",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mobile Development Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "iOS Development" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Android Development" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flutter Development" } }
            ]
        }
    };

    return (
        <>
        <DynamicSchema  pageTitle="Mobile App Development" />
        <main className="overflow-hidden font-poppins bg-[#02050a]">
            <Helmet>
                <title>Custom Mobile App Development | iOS & Android Solutions</title>
                <meta name="description" content="Build high-performance iOS and Android apps with our expert custom mobile app development. We specialize in Flutter, Native, and cross-platform solutions designed to scale your business." />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content="Custom Mobile App Development | iOS & Android Solutions" />
                <meta property="og:description" content="Build high-performance iOS and Android apps with our expert custom mobile app development." />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
            </Helmet>

            {/* 1. Hero Section */}
            <section className="relative w-full flex items-center   mt-4 md:mt-20 overflow-hidden ">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F7A400]/10 blur-[120px] rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full opacity-30"></div>
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
                            <h1 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white leading-[1.2] md:leading-[1.4] lg:leading-[1.4]">Custom Mobile App Development for iOS and Android Global Platforms</h1>
                            <p className="text-white text-[16px] md:text-[20px] mx-auto lg:mx-0 leading-relaxed font-normal">
                                 Build high-performance iOS and Android apps with our expert custom development services. We specialize in Flutter, Native, and cross-platform solutions designed to scale your business and engage users effectively. Campaignsquat Ltd. provides robust tools for your digital success.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                                <Link to="/home/contact" className="block w-full sm:inline-block sm:w-auto" aria-label="Start Developing Your Mobile App">
                                    <button className="border-2 border-[#f7a400] bg-[#F7A400] text-black hover:text-white font-semibold py-2 px-8 md:px-10 text-[14px] md:text-[15px] rounded-[5px] transition-all duration-300 hover:bg-[#02050A] active:scale-95">
                                        Start Developing Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                            <div className="absolute w-[70%] h-[70%] bg-[#F7A400]/5 blur-[80px] rounded-full"></div>
                            <img 
                                src={heroImage} 
                                alt="Expert Custom Mobile App Development Services" 
                                className="relative z-10 w-full h-auto max-w-[550px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]" 
                                loading="eager" 
                                fetchpriority="high" 
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
        <div className="mb-20 ">
            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">Our Custom Mobile App Development Expertise Pro</h2>
            <p className="text-white text-[16px] md:text-[20px]  mx-auto leading-relaxed font-medium">We deploy a research-backed methodology to ensure your digital products are visually stunning and technically superior. Our approach as a custom UI/UX design agency ensures every pixel serves a specific and high-impact business purpose.</p>
        </div>

        {/* গ্রিড কলাম lg:grid-cols-2 করা হয়েছে এবং w-full নিশ্চিত করা হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
            {expertiseData.map((item, index) => (
                <div key={index} className="group relative bg-[#02050A] border border-white/10 p-10 rounded-[5px] transition-all duration-500 hover:border-[#F7A400]/40 flex flex-col items-start text-left overflow-hidden hover:-translate-y-2 w-full">
                    <span className="absolute -top-2 -right-2 text-white opacity-[0.03] text-7xl font-bold group-hover:opacity-10 transition-all">{item.id}</span>
                    <div className="mb-8 w-16 h-16 flex items-center justify-start relative z-10">
                        <img src={item.img} alt={item.alt} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 origin-left" style={{ filter: 'invert(71%) sepia(85%) saturate(945%) hue-rotate(354deg) brightness(102%) contrast(101%)' }} />
                    </div>
                    <div className="relative z-10">
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
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full ">
                    <div className="flex flex-col gap-24 md:gap-44">
                        {featureData.map((item, index) => (
                            <div key={index} className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 md:gap-24`}>
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-8">
                                        {item.title.map((line, i) => <span key={i} className="block leading-[1.3] mb-1 last:mb-0">{line}</span>)}
                                    </h3>
                                    <p className="text-white text-[16px] md:text-[18px] leading-relaxed font-light text-left max-w-[580px]">{item.desc}</p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="relative group overflow-hidden rounded-[5px]">
                                        <div className="absolute -inset-4 bg-[#F7A400]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img src={item.img} alt={item.alt} loading="lazy" className="relative z-10 w-full aspect-[16/10] object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] rounded-[5px]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="w-full bg-[#02050A] py-12 md:py-20">
                <div className="max-w-[1445px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 w-full relative z-10 ">
                    <div className="flex flex-col items-center text-center mb-20 md:mb-28">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold tracking-tight mb-6">Our Custom Mobile App Development </h2>
                        <p className="text-white text-[16px] md:text-[20px] max-w-5xl mx-auto font-light"> A disciplined, agile-based engineering approach to deliver high-quality mobile applications.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
                        {processSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                                <div className="relative mb-10 w-40 h-40 md:w-44 lg:w-48 md:h-44 lg:h-48 flex items-center justify-center">
                                    <div className="absolute top-0 left-[-15px] w-full h-full rounded-full border-[3px] border-[#F7A400] transition-all duration-700 ease-in-out group-hover:left-0 group-hover:rotate-[360deg] z-0"></div>
                                    <div className="relative w-full h-full rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-[#F7A400]/50 shadow-xl">
                                        <img src={step.image} alt={step.alt} loading="lazy" className="w-16 h-16 md:w-20 lg:w-24 object-contain brightness-0 invert transition-all duration-500 group-hover:scale-110 z-20" />
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
            <section className="py-12 md:py-20 relative z-[1]">
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                        <div className="w-full lg:w-1/2 flex flex-col text-left order-2 lg:order-1 relative z-20">
                            <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.2] mb-8">
                                Why is Campaignsquat Ltd the best Mobile App Devlopment service provider?
                                </h2>
                            <p className="text-white text-[16px] md:text-[20px] leading-relaxed font-light mb-10 max-w-[580px]">At Campaignsquat, we combine technical excellence with business strategy to deliver mobile products that make an impact.</p>
                            <div className="flex flex-col gap-3 md:gap-4 mb-12">
                                {points.map((point, index) => (
                                    <div key={index} className="flex items-center gap-5 group">
                                        <div className="w-6 h-6 shrink-0 rounded-full border-2 border-[#F7A400] flex items-center justify-center">
                                            <Check className="text-[#F7A400] w-5 h-5 md:w-6 md:h-6 stroke-[3px]" />
                                        </div>
                                        <span className="text-white text-[16px] md:text-[18px] font-medium">{point}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-start">
                                <Link to="/home/contact" className="inline-block w-full sm:w-auto" aria-label="Get Started with Campaignsquat">
                                    <button className=" bg-[#F7A400] text-black hover:text-white border-2 border-[#F7A400] text-[14px] md:text-[15px] rounded-[5px] px-8 md:px-10 py-2 font-semibold hover:bg-[#0a0a0a] transition-all duration-500 shadow-lg shadow-[#F7A400]/10 active:scale-95 group">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative z-10">
                            <div className="relative flex justify-center lg:justify-end">
                                <img src={sideImg} alt="Campaignsquat Mobile App Development Excellence" loading="lazy" className="w-full h-auto max-h-[650px] object-contain  shadow-2xl" />
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
                <div className="max-w-[1445px] mx-auto px-6 md:px-12 lg:px-20 w-full ">
                    <div className="text-center max-w-6xl mx-auto mb-16 md:mb-24">
                        <h2 className="text-white text-[26px] md:text-[32px] lg:text-[40px] font-bold mb-6">Our Industry-Specific Custom Mobile App Expertise for Global Success</h2>
                        <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-light">Campaignsquat Ltd. provides expert custom mobile app development for diverse industries to drive digital success. We build scalable, high-performance mobile solutions that ensure seamless user journeys and robust backend stability across all your global business sectors and platforms. </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
                        {industryData.map((item, index) => (
                            <div key={index} className="border-run-container group">
                                <div className="running-border"></div>
                                <div className="card-content flex flex-col">
                                    <div className="w-full aspect-[4/3] overflow-hidden border-b border-white/5 rounded-t-[5px]">
                                        <img src={item.img} alt={item.alt} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
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
            <Questions />
        </main>
        </>
    );
};

const Questions = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Do you develop for both iOS and Android platforms?",
            answer: "Yes, we specialize in both native development (Swift for iOS, Kotlin for Android) and cross-platform solutions using Flutter. This ensures your app reaches the widest possible audience while maintaining top-tier performance."
        },
        {
            question: "How long does it typically take to develop a custom mobile app?",
            answer: "A standard MVP (Minimum Viable Product) usually takes 8-12 weeks. However, the timeline depends on feature complexity, API integrations, and design requirements. We follow an agile process to deliver functional milestones regularly."
        },
        {
            question: "Will you help with the App Store and Google Play Store submission?",
            answer: "Absolutely. We handle the entire deployment process, including app store optimization (ASO) guidance, asset preparation, and navigating the review guidelines to ensure your app gets approved and launched successfully."
        },
        {
            question: "Can you integrate third-party APIs and hardware features?",
            answer: "Yes. We have extensive experience integrating complex APIs, payment gateways (Stripe, SSLCommerz), and hardware features like GPS, Biometrics (FaceID/Fingerprint), and Camera functionalities into your mobile experience."
        },
        {
            question: "How do you handle app updates and bug fixes after launch?",
            answer: "We offer dedicated maintenance packages. Since mobile OS versions (iOS/Android) update frequently, we ensure your app stays compatible, secure, and optimized with regular performance tuning and feature enhancements."
        }
    ];

    return (
        <section className="w-full bg-[#02050A] py-12 md:py-20 overflow-hidden font-poppins">
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
                                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                aria-expanded={openIndex === index}
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

export default MobileAppDevelopment;