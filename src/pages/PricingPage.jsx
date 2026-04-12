import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
/* Components Import */
import PricingPlans from '../components/PricingPlans'; 
import TechnicalEdge from '../components/TechnicalEdge'; 
import DynamicSchema from '../components/DynamicSchema';
import ServiceEcosystem from '../components/ServiceEcosystem';
import AgencyComparison from '../components/AgencyComparison';
import Contact from '../components/Contact';

const PricingPage = () => {
  
  // ১. পেজ লোড হলে একদম উপরে নিয়ে যাওয়ার জন্য
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#02050A]">
      <DynamicSchema />
      
      {/* ২. Pricing Page SEO Meta Tags */}
      <Helmet>
        <title>Strategic Pricing | Campaignsquat Ltd - Transparent Tech Investment</title>
        <meta name="description" content="Explore transparent and strategic pricing for UI/UX design, web development, and software engineering. Build your next high-performance ecosystem with Campaignsquat Ltd." />
        <meta name="keywords" content="Web Development Pricing, UI/UX Cost, Software Development Packages Bangladesh, Campaignsquat Pricing, Tech Solutions Cost" />
        <link rel="canonical" href="https://www.campaignsquat.com/pricing" />
      </Helmet>

     

      {/* ৪. প্রাইসিং প্ল্যান সেকশন (এরপর দামগুলো দেখাবে) */}
      <PricingPlans />
       {/* ৩. টেকনিক্যাল এজ সেকশন (আগে ক্লায়েন্টকে আপনার ভ্যালু বা সুবিধাগুলো দেখাবে) */}
      <TechnicalEdge />
      <ServiceEcosystem />

      <AgencyComparison />

      <Contact />
      
      {/* ৫. নিচে একটু গ্যাপ রাখার জন্য */}
      <div className="pb-20"></div>
    </main>
  );
};

export default PricingPage;